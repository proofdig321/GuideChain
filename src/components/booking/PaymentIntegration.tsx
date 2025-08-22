"use client";

import { useState } from "react";
import { useActiveAccount, useSendTransaction } from "thirdweb/react";
import { createThirdwebClient, getContract, prepareContractCall } from "thirdweb";
import { polygon } from "thirdweb/chains";

const client = createThirdwebClient({
  clientId: process.env.NEXT_PUBLIC_THIRDWEB_CLIENT_ID || "",
});

// USDC contract on Polygon
const USDC_CONTRACT_ADDRESS = "0x2791Bca1f2de4661ED88A30C99A7a9449Aa84174";
const ADMIN_WALLET = "0xc84799A904EeB5C57aBBBc40176E7dB8be202C10";

interface PaymentIntegrationProps {
  guideId: string;
  guideName: string;
  totalAmount: number;
  platformFee: number;
  guideWallet: string;
  onSuccess: (txHash: string) => void;
  onError: (error: string) => void;
  onClose: () => void;
}

export function PaymentIntegration({
  guideId,
  guideName,
  totalAmount,
  platformFee,
  guideWallet,
  onSuccess,
  onError,
  onClose
}: PaymentIntegrationProps) {
  const account = useActiveAccount();
  const { mutate: sendTransaction, isPending } = useSendTransaction();
  const [step, setStep] = useState<"confirm" | "processing" | "success" | "error">("confirm");
  const [txHash, setTxHash] = useState<string>("");

  const usdcContract = getContract({
    client,
    chain: polygon,
    address: USDC_CONTRACT_ADDRESS,
  });

  const handlePayment = async () => {
    if (!account) {
      onError("Please connect your wallet");
      return;
    }

    try {
      setStep("processing");

      // Convert to USDC decimals (6 decimals)
      const totalAmountWei = BigInt(Math.round(totalAmount * 1000000));
      const platformFeeWei = BigInt(Math.round(platformFee * 1000000));
      const guideAmountWei = totalAmountWei - platformFeeWei;

      // First transfer platform fee to admin
      const platformFeeTransaction = prepareContractCall({
        contract: usdcContract,
        method: "transfer",
        params: [ADMIN_WALLET, platformFeeWei],
      });

      // Send platform fee transaction
      sendTransaction(platformFeeTransaction, {
        onSuccess: async (result) => {
          console.log("Platform fee transaction successful:", result.transactionHash);
          
          // Then transfer guide amount to guide wallet
          const guidePaymentTransaction = prepareContractCall({
            contract: usdcContract,
            method: "transfer",
            params: [guideWallet, guideAmountWei],
          });

          // Send guide payment transaction
          sendTransaction(guidePaymentTransaction, {
            onSuccess: (guideResult) => {
              console.log("Guide payment transaction successful:", guideResult.transactionHash);
              setTxHash(guideResult.transactionHash);
              setStep("success");
              onSuccess(guideResult.transactionHash);
            },
            onError: (error) => {
              console.error("Guide payment failed:", error);
              setStep("error");
              onError("Guide payment failed: " + error.message);
            }
          });
        },
        onError: (error) => {
          console.error("Platform fee payment failed:", error);
          setStep("error");
          onError("Platform fee payment failed: " + error.message);
        }
      });

    } catch (error: any) {
      console.error("Payment error:", error);
      setStep("error");
      onError(error.message || "Payment failed");
    }
  };

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      background: 'rgba(0, 0, 0, 0.5)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 1000,
      padding: '16px'
    }}>
      <div style={{
        background: 'white',
        borderRadius: '24px',
        padding: '32px',
        maxWidth: '500px',
        width: '100%',
        maxHeight: '90vh',
        overflow: 'auto'
      }}>
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          marginBottom: '24px'
        }}>
          <h2 style={{
            fontSize: 'clamp(20px, 5vw, 24px)',
            fontWeight: '700',
            color: '#1f2937'
          }}>
            💳 USDC Payment
          </h2>
          <button
            onClick={onClose}
            style={{
              background: 'none',
              border: 'none',
              fontSize: '24px',
              cursor: 'pointer',
              color: '#6b7280',
              minHeight: '44px',
              minWidth: '44px'
            }}
          >
            ✕
          </button>
        </div>

        {step === "confirm" && (
          <div>
            <div style={{
              background: '#f0f9ff',
              borderRadius: '16px',
              padding: '20px',
              marginBottom: '24px'
            }}>
              <h3 style={{
                fontSize: '16px',
                fontWeight: '600',
                color: '#1f2937',
                marginBottom: '12px'
              }}>Payment Breakdown</h3>
              <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                marginBottom: '8px'
              }}>
                <span style={{ fontSize: '14px', color: '#6b7280' }}>
                  Guide Payment ({guideName})
                </span>
                <span style={{ fontSize: '14px', color: '#1f2937' }}>
                  ${(totalAmount - platformFee).toFixed(2)} USDC
                </span>
              </div>
              <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                marginBottom: '8px'
              }}>
                <span style={{ fontSize: '14px', color: '#6b7280' }}>
                  Platform Fee (7.5%)
                </span>
                <span style={{ fontSize: '14px', color: '#1f2937' }}>
                  ${platformFee.toFixed(2)} USDC
                </span>
              </div>
              <div style={{
                borderTop: '1px solid #e0e7ff',
                paddingTop: '8px',
                display: 'flex',
                justifyContent: 'space-between'
              }}>
                <span style={{ fontSize: '16px', fontWeight: '600', color: '#1f2937' }}>
                  Total Payment
                </span>
                <span style={{ fontSize: '16px', fontWeight: '600', color: '#3b82f6' }}>
                  ${totalAmount.toFixed(2)} USDC
                </span>
              </div>
            </div>

            <div style={{
              background: '#fef3c7',
              borderRadius: '12px',
              padding: '16px',
              marginBottom: '24px'
            }}>
              <p style={{
                fontSize: '14px',
                color: '#92400e',
                margin: 0
              }}>
                ⚠️ This will initiate two USDC transactions: one for the platform fee and one for the guide payment.
              </p>
            </div>

            <button
              onClick={handlePayment}
              disabled={isPending}
              style={{
                width: '100%',
                background: 'linear-gradient(135deg, #3b82f6 0%, #2563eb 100%)',
                color: 'white',
                padding: '16px',
                borderRadius: '16px',
                fontWeight: '600',
                border: 'none',
                cursor: isPending ? 'not-allowed' : 'pointer',
                fontSize: '16px',
                minHeight: '44px',
                opacity: isPending ? 0.7 : 1
              }}
            >
              {isPending ? "Processing..." : `Pay ${totalAmount.toFixed(2)} USDC`}
            </button>
          </div>
        )}

        {step === "processing" && (
          <div style={{ textAlign: 'center', padding: '40px 0' }}>
            <div style={{
              width: '64px',
              height: '64px',
              background: 'linear-gradient(135deg, #3b82f6 0%, #8b5cf6 100%)',
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto 16px auto',
              animation: 'spin 1s linear infinite'
            }}>
              <span style={{ color: 'white', fontSize: '24px' }}>💳</span>
            </div>
            <h3 style={{
              fontSize: '18px',
              fontWeight: '600',
              color: '#1f2937',
              marginBottom: '8px'
            }}>
              Processing Payment
            </h3>
            <p style={{
              color: '#6b7280',
              fontSize: '14px'
            }}>
              Please confirm the transactions in your wallet...
            </p>
          </div>
        )}

        {step === "success" && (
          <div style={{ textAlign: 'center', padding: '40px 0' }}>
            <div style={{
              width: '64px',
              height: '64px',
              background: 'linear-gradient(135deg, #059669 0%, #047857 100%)',
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto 16px auto'
            }}>
              <span style={{ color: 'white', fontSize: '24px' }}>✅</span>
            </div>
            <h3 style={{
              fontSize: '18px',
              fontWeight: '600',
              color: '#1f2937',
              marginBottom: '8px'
            }}>
              Payment Successful!
            </h3>
            <p style={{
              color: '#6b7280',
              marginBottom: '16px',
              fontSize: '14px'
            }}>
              Your booking has been confirmed and payment processed.
            </p>
            {txHash && (
              <div style={{
                background: '#f9fafb',
                borderRadius: '12px',
                padding: '12px',
                marginBottom: '24px'
              }}>
                <p style={{
                  fontSize: '12px',
                  color: '#6b7280',
                  wordBreak: 'break-all'
                }}>
                  Transaction: {txHash}
                </p>
              </div>
            )}
            <button
              onClick={onClose}
              style={{
                background: 'linear-gradient(135deg, #059669 0%, #047857 100%)',
                color: 'white',
                padding: '12px 24px',
                borderRadius: '16px',
                fontWeight: '500',
                border: 'none',
                cursor: 'pointer',
                fontSize: '14px'
              }}
            >
              Close
            </button>
          </div>
        )}

        {step === "error" && (
          <div style={{ textAlign: 'center', padding: '40px 0' }}>
            <div style={{
              width: '64px',
              height: '64px',
              background: 'linear-gradient(135deg, #dc2626 0%, #b91c1c 100%)',
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto 16px auto'
            }}>
              <span style={{ color: 'white', fontSize: '24px' }}>❌</span>
            </div>
            <h3 style={{
              fontSize: '18px',
              fontWeight: '600',
              color: '#1f2937',
              marginBottom: '8px'
            }}>
              Payment Failed
            </h3>
            <p style={{
              color: '#6b7280',
              marginBottom: '24px',
              fontSize: '14px'
            }}>
              There was an issue processing your payment. Please try again.
            </p>
            <div style={{
              display: 'flex',
              gap: '12px',
              justifyContent: 'center'
            }}>
              <button
                onClick={() => setStep("confirm")}
                style={{
                  background: 'linear-gradient(135deg, #3b82f6 0%, #2563eb 100%)',
                  color: 'white',
                  padding: '12px 24px',
                  borderRadius: '16px',
                  fontWeight: '500',
                  border: 'none',
                  cursor: 'pointer',
                  fontSize: '14px'
                }}
              >
                Try Again
              </button>
              <button
                onClick={onClose}
                style={{
                  background: 'linear-gradient(135deg, #6b7280 0%, #4b5563 100%)',
                  color: 'white',
                  padding: '12px 24px',
                  borderRadius: '16px',
                  fontWeight: '500',
                  border: 'none',
                  cursor: 'pointer',
                  fontSize: '14px'
                }}
              >
                Close
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}