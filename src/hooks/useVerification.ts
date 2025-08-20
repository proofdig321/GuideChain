import { useState, useEffect } from "react";
import { useActiveAccount, useSendTransaction } from "thirdweb/react";
import { guideRegistryFunctions } from "@/lib/contracts";
import { ipfsService } from "@/lib/ipfs";
import { PLATFORM_CONFIG } from "@/constants";
import type { VerificationApplication, IPFSMetadata } from "@/types";
import { VerificationStatus } from "@/types";

export function useVerification() {
  const [applications, setApplications] = useState<VerificationApplication[]>([]);
  const [userApplication, setUserApplication] = useState<VerificationApplication | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const account = useActiveAccount();
  const { mutate: sendTransaction } = useSendTransaction();

  // Check if user is admin
  const isAdmin = account?.address?.toLowerCase() === PLATFORM_CONFIG.ADMIN_ADDRESS.toLowerCase();

  // Fetch pending applications (admin only)
  const fetchPendingApplications = async () => {
    if (!isAdmin) return;
    
    try {
      setLoading(true);
      setError(null);
      
      const pendingApps = await guideRegistryFunctions.getPendingApplications();
      
      // Enrich applications with IPFS metadata
      const enrichedApps = await Promise.all(
        pendingApps.map(async (app) => {
          try {
            const metadata = await ipfsService.getData<IPFSMetadata>(app.documentsHash);
            
            const location = metadata.attributes?.find(attr => attr.trait_type === "Location")?.value as string || "";
            const specialties = (metadata.attributes?.find(attr => attr.trait_type === "Specialties")?.value as string || "").split(", ").filter(Boolean);
            
            return {
              ...app,
              location,
              specialties,
              experience: metadata.description || "",
            };
          } catch (metadataError) {
            console.error(`Failed to fetch metadata for application ${app.id}:`, metadataError);
            return app;
          }
        })
      );
      
      setApplications(enrichedApps);
    } catch (err) {
      console.error("Failed to fetch pending applications:", err);
      setError("Failed to load applications");
    } finally {
      setLoading(false);
    }
  };

  // Fetch user's application status
  const fetchUserApplication = async () => {
    if (!account?.address) return;
    
    try {
      const application = await guideRegistryFunctions.getApplication(account.address);
      if (application) {
        // Enrich with metadata
        const metadata = await ipfsService.getData<IPFSMetadata>(application.documentsHash);
        const location = metadata.attributes?.find(attr => attr.trait_type === "Location")?.value as string || "";
        const specialties = (metadata.attributes?.find(attr => attr.trait_type === "Specialties")?.value as string || "").split(", ").filter(Boolean);
        
        setUserApplication({
          ...application,
          location,
          specialties,
          experience: metadata.description || "",
        });
      } else {
        setUserApplication(null);
      }
    } catch (err) {
      console.error("Failed to fetch user application:", err);
      setUserApplication(null);
    }
  };

  // Submit guide verification application
  const submitApplication = async (applicationData: {
    name: string;
    location: string;
    specialties: string[];
    experience: string;
    languages: string[];
    documents: File[];
  }) => {
    if (!account?.address) {
      throw new Error("Wallet not connected");
    }

    try {
      setLoading(true);
      setError(null);
      
      // Upload documents and metadata to IPFS
      const metadataHash = await ipfsService.uploadGuideDocuments(
        applicationData.documents,
        {
          name: applicationData.name,
          location: applicationData.location,
          specialties: applicationData.specialties,
          experience: applicationData.experience,
          languages: applicationData.languages,
        }
      );

      // Submit application transaction
      const transaction = guideRegistryFunctions.submitApplication(
        applicationData.name,
        metadataHash
      );

      await new Promise((resolve, reject) => {
        sendTransaction(transaction, {
          onSuccess: (result) => {
            console.log("Application submitted successfully:", result);
            resolve(result);
          },
          onError: (error) => {
            console.error("Application submission failed:", error);
            reject(error);
          },
        });
      });

      // Refresh user application
      await fetchUserApplication();
      
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "Failed to submit application";
      setError(errorMessage);
      throw new Error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  // Approve guide application (admin only)
  const approveApplication = async (applicantAddress: string) => {
    if (!isAdmin) {
      throw new Error("Only admin can approve applications");
    }

    try {
      setLoading(true);
      setError(null);
      
      const transaction = guideRegistryFunctions.approveGuide(applicantAddress);

      await new Promise((resolve, reject) => {
        sendTransaction(transaction, {
          onSuccess: (result) => {
            console.log("Application approved successfully:", result);
            resolve(result);
          },
          onError: (error) => {
            console.error("Application approval failed:", error);
            reject(error);
          },
        });
      });

      // Refresh applications
      await fetchPendingApplications();
      
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "Failed to approve application";
      setError(errorMessage);
      throw new Error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  // Reject guide application (admin only)
  const rejectApplication = async (applicantAddress: string, reason: string) => {
    if (!isAdmin) {
      throw new Error("Only admin can reject applications");
    }

    try {
      setLoading(true);
      setError(null);
      
      const transaction = guideRegistryFunctions.rejectGuide(applicantAddress, reason);

      await new Promise((resolve, reject) => {
        sendTransaction(transaction, {
          onSuccess: (result) => {
            console.log("Application rejected successfully:", result);
            resolve(result);
          },
          onError: (error) => {
            console.error("Application rejection failed:", error);
            reject(error);
          },
        });
      });

      // Refresh applications
      await fetchPendingApplications();
      
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "Failed to reject application";
      setError(errorMessage);
      throw new Error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  // Get application by address
  const getApplication = async (address: string): Promise<VerificationApplication | null> => {
    try {
      const application = await guideRegistryFunctions.getApplication(address);
      if (!application) return null;

      // Enrich with metadata
      const metadata = await ipfsService.getData<IPFSMetadata>(application.documentsHash);
      const location = metadata.attributes?.find(attr => attr.trait_type === "Location")?.value as string || "";
      const specialties = (metadata.attributes?.find(attr => attr.trait_type === "Specialties")?.value as string || "").split(", ").filter(Boolean);
      
      return {
        ...application,
        location,
        specialties,
        experience: metadata.description || "",
      };
    } catch (error) {
      console.error("Failed to fetch application:", error);
      return null;
    }
  };

  // Check if user can apply (not already applied or verified)
  const canUserApply = (): boolean => {
    return !userApplication && account?.address !== undefined;
  };

  // Check if user has pending application
  const hasPendingApplication = (): boolean => {
    return userApplication?.status === VerificationStatus.PENDING;
  };

  // Check if user application was approved
  const isApplicationApproved = (): boolean => {
    return userApplication?.status === VerificationStatus.APPROVED;
  };

  // Check if user application was rejected
  const isApplicationRejected = (): boolean => {
    return userApplication?.status === VerificationStatus.REJECTED;
  };

  // Get application status text
  const getApplicationStatusText = (): string => {
    if (!userApplication) return "Not Applied";
    
    switch (userApplication.status) {
      case VerificationStatus.PENDING:
        return "Under Review";
      case VerificationStatus.APPROVED:
        return "Approved";
      case VerificationStatus.REJECTED:
        return "Rejected";
      default:
        return "Unknown";
    }
  };

  // Get applications by status
  const getApplicationsByStatus = (status: VerificationStatus): VerificationApplication[] => {
    return applications.filter(app => app.status === status);
  };

  // Get application statistics
  const getApplicationStats = () => {
    const total = applications.length;
    const pending = getApplicationsByStatus(VerificationStatus.PENDING).length;
    const approved = getApplicationsByStatus(VerificationStatus.APPROVED).length;
    const rejected = getApplicationsByStatus(VerificationStatus.REJECTED).length;
    
    return {
      total,
      pending,
      approved,
      rejected,
      approvalRate: total > 0 ? (approved / total) * 100 : 0,
    };
  };

  // Clear error
  const clearError = () => setError(null);

  // Refresh data
  const refreshData = () => {
    if (isAdmin) {
      fetchPendingApplications();
    }
    if (account?.address) {
      fetchUserApplication();
    }
  };

  useEffect(() => {
    if (isAdmin) {
      fetchPendingApplications();
    }
  }, [isAdmin]);

  useEffect(() => {
    if (account?.address) {
      fetchUserApplication();
    }
  }, [account?.address]);

  return {
    applications,
    userApplication,
    loading,
    error,
    isAdmin,
    submitApplication,
    approveApplication,
    rejectApplication,
    getApplication,
    fetchPendingApplications,
    fetchUserApplication,
    canUserApply,
    hasPendingApplication,
    isApplicationApproved,
    isApplicationRejected,
    getApplicationStatusText,
    getApplicationsByStatus,
    getApplicationStats,
    clearError,
    refreshData,
  };
}