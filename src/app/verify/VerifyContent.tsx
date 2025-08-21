"use client";

import { useState, useCallback } from "react";
import { ConnectButton, useActiveAccount } from "thirdweb/react";
import { createThirdwebClient } from "thirdweb";
import { Header } from "@/components/ui/Header";
import { Footer } from "@/components/ui/Footer";

const client = createThirdwebClient({
  clientId: process.env.NEXT_PUBLIC_THIRDWEB_CLIENT_ID || "",
});

interface FormData {
  name: string;
  location: string;
  specialties: string[];
  experience: string;
  languages: string[];
  pricePerHour: string;
  documents: File[];
  profileImage: File | null;
  certifications: File[];
  portfolio: File[];
}

interface DocumentPreview {
  file: File;
  url: string;
  type: 'image' | 'document';
}

export default function VerifyContent() {
  const account = useActiveAccount();
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState<FormData>({
    name: "",
    location: "",
    specialties: [],
    experience: "",
    languages: [],
    pricePerHour: "",
    documents: [],
    profileImage: null,
    certifications: [],
    portfolio: []
  });
  const [documentPreviews, setDocumentPreviews] = useState<DocumentPreview[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleFileUpload = useCallback((files: FileList | null, type: keyof FormData) => {
    if (!files) return;

    const fileArray = Array.from(files);
    const previews: DocumentPreview[] = [];

    fileArray.forEach(file => {
      const url = URL.createObjectURL(file);
      const fileType = file.type.startsWith('image/') ? 'image' : 'document';
      previews.push({ file, url, type: fileType });
    });

    setFormData(prev => ({
      ...prev,
      [type]: type === 'profileImage' ? fileArray[0] : [...(prev[type] as File[]), ...fileArray]
    }));

    setDocumentPreviews(prev => [...prev, ...previews]);
  }, []);

  const removeDocument = useCallback((index: number) => {
    setDocumentPreviews(prev => {
      const newPreviews = [...prev];
      URL.revokeObjectURL(newPreviews[index].url);
      newPreviews.splice(index, 1);
      return newPreviews;
    });
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      alert("🎉 Guide application submitted successfully! You'll receive verification status within 24-48 hours.");
      
      // Reset form
      setFormData({
        name: "",
        location: "",
        specialties: [],
        experience: "",
        languages: [],
        pricePerHour: "",
        documents: [],
        profileImage: null,
        certifications: [],
        portfolio: []
      });
      setCurrentStep(1);
      setDocumentPreviews([]);
    } catch (error) {
      alert("❌ Submission failed. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!account) {
    return (
      <div style={{ minHeight: '100vh', background: '#f9fafb' }}>
        <Header />
        <div style={{
          minHeight: 'calc(100vh - 64px)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '0 16px'
        }}>
          <div style={{ textAlign: 'center', maxWidth: '500px' }}>
            <div style={{
              width: '80px',
              height: '80px',
              background: 'linear-gradient(135deg, #8b5cf6 0%, #3b82f6 100%)',
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto 24px auto',
              boxShadow: '0 10px 30px rgba(139, 92, 246, 0.3)'
            }}>
              <svg style={{ width: '40px', height: '40px', color: 'white' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
            </div>
            <h1 className="hero-title" style={{ marginBottom: '16px' }}>
              🔐 Connect Wallet
            </h1>
            <p style={{ fontSize: '18px', color: '#6b7280', marginBottom: '32px', lineHeight: '1.6' }}>
              Connect your Web3 wallet to start your journey as a verified South African guide
            </p>
            <ConnectButton
              client={client}
              appMetadata={{
                name: "GuidesChain",
                url: "https://guideschain.vercel.app",
              }}
            />
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div style={{ minHeight: '100vh', background: '#f9fafb' }}>
      <Header />
      
      {/* Hero Section */}
      <section style={{
        background: 'linear-gradient(135deg, #f0f9ff 0%, #e0e7ff 50%, #fdf4ff 100%)',
        padding: '60px 0',
        position: 'relative',
        overflow: 'hidden'
      }}>
        <div style={{
          position: 'absolute',
          top: '20px',
          right: '20px',
          width: '100px',
          height: '100px',
          background: 'rgba(139, 92, 246, 0.1)',
          borderRadius: '50%',
          filter: 'blur(30px)'
        }}></div>
        
        <div className="container" style={{ textAlign: 'center' }}>
          <h1 className="hero-title" style={{ marginBottom: '16px' }}>
            ⭐ Become a Verified Guide
          </h1>
          <p className="hero-subtitle">
            Join South Africa's premier tourism platform and share your local expertise with travelers worldwide
          </p>
          
          {/* Progress Steps */}
          <div style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            gap: '16px',
            marginTop: '40px',
            flexWrap: 'wrap'
          }}>
            {[
              { step: 1, title: 'Personal Info', icon: '👤' },
              { step: 2, title: 'Experience', icon: '🎯' },
              { step: 3, title: 'Documents', icon: '📄' },
              { step: 4, title: 'Review', icon: '✅' }
            ].map((item, i) => (
              <div key={i} style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px'
              }}>
                <div style={{
                  width: '40px',
                  height: '40px',
                  borderRadius: '50%',
                  background: currentStep >= item.step 
                    ? 'linear-gradient(135deg, #10b981 0%, #059669 100%)'
                    : '#e5e7eb',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: currentStep >= item.step ? 'white' : '#6b7280',
                  fontWeight: '600',
                  fontSize: '14px',
                  transition: 'all 0.3s'
                }}>
                  {currentStep > item.step ? '✓' : item.step}
                </div>
                <span style={{
                  fontSize: '14px',
                  fontWeight: '500',
                  color: currentStep >= item.step ? '#1f2937' : '#6b7280'
                }}>
                  {item.icon} {item.title}
                </span>
                {i < 3 && (
                  <div style={{
                    width: '20px',
                    height: '2px',
                    background: currentStep > item.step ? '#10b981' : '#e5e7eb',
                    margin: '0 8px'
                  }}></div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Form Section */}
      <section className="section-padding">
        <div className="container">
          <div style={{ maxWidth: '800px', margin: '0 auto' }}>
            <div className="card">
              <form onSubmit={handleSubmit}>
                {/* Step 1: Personal Information */}
                {currentStep === 1 && (
                  <div>
                    <h2 style={{ fontSize: '24px', fontWeight: '700', marginBottom: '24px', color: '#1f2937' }}>
                      👤 Personal Information
                    </h2>
                    
                    <div className="responsive-grid-2" style={{ marginBottom: '24px' }}>
                      <div>
                        <label style={{
                          display: 'block',
                          fontSize: '14px',
                          fontWeight: '500',
                          color: '#374151',
                          marginBottom: '8px'
                        }}>
                          📝 Full Name *
                        </label>
                        <input
                          type="text"
                          required
                          value={formData.name}
                          onChange={(e) => setFormData({...formData, name: e.target.value})}
                          placeholder="Your full legal name"
                          style={{
                            width: '100%',
                            padding: '12px 16px',
                            border: '1px solid #d1d5db',
                            borderRadius: '12px',
                            fontSize: '16px',
                            outline: 'none',
                            transition: 'border-color 0.2s'
                          }}
                          onFocus={(e) => e.currentTarget.style.borderColor = '#3b82f6'}
                          onBlur={(e) => e.currentTarget.style.borderColor = '#d1d5db'}
                        />
                      </div>

                      <div>
                        <label style={{
                          display: 'block',
                          fontSize: '14px',
                          fontWeight: '500',
                          color: '#374151',
                          marginBottom: '8px'
                        }}>
                          📍 Location *
                        </label>
                        <select
                          required
                          value={formData.location}
                          onChange={(e) => setFormData({...formData, location: e.target.value})}
                          style={{
                            width: '100%',
                            padding: '12px 16px',
                            border: '1px solid #d1d5db',
                            borderRadius: '12px',
                            fontSize: '16px',
                            outline: 'none',
                            background: 'white'
                          }}
                        >
                          <option value="">Select your province</option>
                          <option value="Western Cape">Western Cape</option>
                          <option value="Gauteng">Gauteng</option>
                          <option value="KwaZulu-Natal">KwaZulu-Natal</option>
                          <option value="Eastern Cape">Eastern Cape</option>
                          <option value="Limpopo">Limpopo</option>
                          <option value="Mpumalanga">Mpumalanga</option>
                          <option value="North West">North West</option>
                          <option value="Northern Cape">Northern Cape</option>
                          <option value="Free State">Free State</option>
                        </select>
                      </div>
                    </div>

                    <div style={{ marginBottom: '24px' }}>
                      <label style={{
                        display: 'block',
                        fontSize: '14px',
                        fontWeight: '500',
                        color: '#374151',
                        marginBottom: '8px'
                      }}>
                        💰 Hourly Rate (USD) *
                      </label>
                      <input
                        type="number"
                        required
                        min="10"
                        max="500"
                        value={formData.pricePerHour}
                        onChange={(e) => setFormData({...formData, pricePerHour: e.target.value})}
                        placeholder="25"
                        style={{
                          width: '100%',
                          padding: '12px 16px',
                          border: '1px solid #d1d5db',
                          borderRadius: '12px',
                          fontSize: '16px',
                          outline: 'none',
                          transition: 'border-color 0.2s'
                        }}
                        onFocus={(e) => e.currentTarget.style.borderColor = '#3b82f6'}
                        onBlur={(e) => e.currentTarget.style.borderColor = '#d1d5db'}
                      />
                      <p style={{ fontSize: '12px', color: '#6b7280', marginTop: '4px' }}>
                        Recommended: $15-50 per hour for most tours
                      </p>
                    </div>

                    <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                      <button
                        type="button"
                        onClick={() => setCurrentStep(2)}
                        className="btn-primary"
                        disabled={!formData.name || !formData.location || !formData.pricePerHour}
                      >
                        Next: Experience 🎯
                      </button>
                    </div>
                  </div>
                )}

                {/* Step 2: Experience & Specialties */}
                {currentStep === 2 && (
                  <div>
                    <h2 style={{ fontSize: '24px', fontWeight: '700', marginBottom: '24px', color: '#1f2937' }}>
                      🎯 Experience & Specialties
                    </h2>

                    <div style={{ marginBottom: '24px' }}>
                      <label style={{
                        display: 'block',
                        fontSize: '14px',
                        fontWeight: '500',
                        color: '#374151',
                        marginBottom: '8px'
                      }}>
                        🌟 Tour Specialties *
                      </label>
                      <div style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
                        gap: '12px',
                        marginBottom: '16px'
                      }}>
                        {[
                          'Wine Tours', 'Safari Adventures', 'City History', 'Cultural Tours',
                          'Adventure Sports', 'Food & Cuisine', 'Photography Tours', 'Nature Walks',
                          'Beach Activities', 'Mountain Hiking', 'Art & Museums', 'Township Tours'
                        ].map((specialty) => (
                          <label key={specialty} style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '8px',
                            padding: '8px 12px',
                            border: '1px solid #d1d5db',
                            borderRadius: '8px',
                            cursor: 'pointer',
                            transition: 'all 0.2s',
                            background: formData.specialties.includes(specialty) ? '#eff6ff' : 'white'
                          }}>
                            <input
                              type="checkbox"
                              checked={formData.specialties.includes(specialty)}
                              onChange={(e) => {
                                if (e.target.checked) {
                                  setFormData({...formData, specialties: [...formData.specialties, specialty]});
                                } else {
                                  setFormData({...formData, specialties: formData.specialties.filter(s => s !== specialty)});
                                }
                              }}
                              style={{ margin: 0 }}
                            />
                            <span style={{ fontSize: '14px', fontWeight: '500' }}>{specialty}</span>
                          </label>
                        ))}
                      </div>
                    </div>

                    <div style={{ marginBottom: '24px' }}>
                      <label style={{
                        display: 'block',
                        fontSize: '14px',
                        fontWeight: '500',
                        color: '#374151',
                        marginBottom: '8px'
                      }}>
                        📖 Experience Description *
                      </label>
                      <textarea
                        required
                        value={formData.experience}
                        onChange={(e) => setFormData({...formData, experience: e.target.value})}
                        rows={6}
                        placeholder="Tell us about your guiding experience, qualifications, and what makes you unique..."
                        style={{
                          width: '100%',
                          padding: '12px 16px',
                          border: '1px solid #d1d5db',
                          borderRadius: '12px',
                          fontSize: '16px',
                          outline: 'none',
                          resize: 'vertical',
                          fontFamily: 'inherit'
                        }}
                        onFocus={(e) => e.currentTarget.style.borderColor = '#3b82f6'}
                        onBlur={(e) => e.currentTarget.style.borderColor = '#d1d5db'}
                      />
                    </div>

                    <div style={{ display: 'flex', justifyContent: 'space-between', gap: '16px' }}>
                      <button
                        type="button"
                        onClick={() => setCurrentStep(1)}
                        style={{
                          padding: '12px 24px',
                          border: '1px solid #d1d5db',
                          background: 'white',
                          color: '#374151',
                          borderRadius: '12px',
                          fontWeight: '500',
                          cursor: 'pointer'
                        }}
                      >
                        ← Back
                      </button>
                      <button
                        type="button"
                        onClick={() => setCurrentStep(3)}
                        className="btn-primary"
                        disabled={formData.specialties.length === 0 || !formData.experience}
                      >
                        Next: Documents 📄
                      </button>
                    </div>
                  </div>
                )}

                {/* Step 3: Documents */}
                {currentStep === 3 && (
                  <div>
                    <h2 style={{ fontSize: '24px', fontWeight: '700', marginBottom: '24px', color: '#1f2937' }}>
                      📄 Verification Documents
                    </h2>

                    <div style={{ marginBottom: '24px' }}>
                      <label style={{
                        display: 'block',
                        fontSize: '14px',
                        fontWeight: '500',
                        color: '#374151',
                        marginBottom: '8px'
                      }}>
                        🆔 Profile Photo *
                      </label>
                      <div style={{
                        border: '2px dashed #d1d5db',
                        borderRadius: '12px',
                        padding: '24px',
                        textAlign: 'center',
                        cursor: 'pointer',
                        transition: 'border-color 0.2s'
                      }} onDragOver={(e) => {
                        e.preventDefault();
                        e.currentTarget.style.borderColor = '#3b82f6';
                      }} onDragLeave={(e) => {
                        e.currentTarget.style.borderColor = '#d1d5db';
                      }}>
                        <input
                          type="file"
                          accept="image/*"
                          onChange={(e) => handleFileUpload(e.target.files, 'profileImage')}
                          style={{ display: 'none' }}
                          id="profile-upload"
                        />
                        <label htmlFor="profile-upload" style={{ cursor: 'pointer' }}>
                          <div style={{ fontSize: '48px', marginBottom: '8px' }}>📸</div>
                          <p style={{ fontSize: '16px', fontWeight: '500', marginBottom: '4px' }}>
                            Upload your profile photo
                          </p>
                          <p style={{ fontSize: '14px', color: '#6b7280' }}>
                            Professional headshot recommended
                          </p>
                        </label>
                      </div>
                    </div>

                    <div style={{ marginBottom: '24px' }}>
                      <label style={{
                        display: 'block',
                        fontSize: '14px',
                        fontWeight: '500',
                        color: '#374151',
                        marginBottom: '8px'
                      }}>
                        📜 Certifications & Licenses *
                      </label>
                      <div style={{
                        border: '2px dashed #d1d5db',
                        borderRadius: '12px',
                        padding: '24px',
                        textAlign: 'center',
                        cursor: 'pointer'
                      }}>
                        <input
                          type="file"
                          multiple
                          accept=".pdf,.jpg,.jpeg,.png"
                          onChange={(e) => handleFileUpload(e.target.files, 'certifications')}
                          style={{ display: 'none' }}
                          id="cert-upload"
                        />
                        <label htmlFor="cert-upload" style={{ cursor: 'pointer' }}>
                          <div style={{ fontSize: '48px', marginBottom: '8px' }}>🏆</div>
                          <p style={{ fontSize: '16px', fontWeight: '500', marginBottom: '4px' }}>
                            Upload certifications
                          </p>
                          <p style={{ fontSize: '14px', color: '#6b7280' }}>
                            Tourism guide license, first aid, language certificates
                          </p>
                        </label>
                      </div>
                    </div>

                    {/* Document Previews */}
                    {documentPreviews.length > 0 && (
                      <div style={{ marginBottom: '24px' }}>
                        <h3 style={{ fontSize: '16px', fontWeight: '600', marginBottom: '12px' }}>
                          📎 Uploaded Documents
                        </h3>
                        <div style={{
                          display: 'grid',
                          gridTemplateColumns: 'repeat(auto-fill, minmax(120px, 1fr))',
                          gap: '12px'
                        }}>
                          {documentPreviews.map((preview, index) => (
                            <div key={index} style={{
                              position: 'relative',
                              border: '1px solid #e5e7eb',
                              borderRadius: '8px',
                              overflow: 'hidden'
                            }}>
                              {preview.type === 'image' ? (
                                <img
                                  src={preview.url}
                                  alt="Preview"
                                  style={{
                                    width: '100%',
                                    height: '80px',
                                    objectFit: 'cover'
                                  }}
                                />
                              ) : (
                                <div style={{
                                  width: '100%',
                                  height: '80px',
                                  background: '#f3f4f6',
                                  display: 'flex',
                                  alignItems: 'center',
                                  justifyContent: 'center',
                                  fontSize: '24px'
                                }}>
                                  📄
                                </div>
                              )}
                              <button
                                type="button"
                                onClick={() => removeDocument(index)}
                                style={{
                                  position: 'absolute',
                                  top: '4px',
                                  right: '4px',
                                  width: '20px',
                                  height: '20px',
                                  background: '#ef4444',
                                  color: 'white',
                                  border: 'none',
                                  borderRadius: '50%',
                                  cursor: 'pointer',
                                  fontSize: '12px'
                                }}
                              >
                                ×
                              </button>
                              <div style={{
                                padding: '4px 8px',
                                fontSize: '10px',
                                background: '#f9fafb',
                                borderTop: '1px solid #e5e7eb',
                                textOverflow: 'ellipsis',
                                overflow: 'hidden',
                                whiteSpace: 'nowrap'
                              }}>
                                {preview.file.name}
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    <div style={{ display: 'flex', justifyContent: 'space-between', gap: '16px' }}>
                      <button
                        type="button"
                        onClick={() => setCurrentStep(2)}
                        style={{
                          padding: '12px 24px',
                          border: '1px solid #d1d5db',
                          background: 'white',
                          color: '#374151',
                          borderRadius: '12px',
                          fontWeight: '500',
                          cursor: 'pointer'
                        }}
                      >
                        ← Back
                      </button>
                      <button
                        type="button"
                        onClick={() => setCurrentStep(4)}
                        className="btn-primary"
                        disabled={!formData.profileImage || formData.certifications.length === 0}
                      >
                        Review Application ✅
                      </button>
                    </div>
                  </div>
                )}

                {/* Step 4: Review */}
                {currentStep === 4 && (
                  <div>
                    <h2 style={{ fontSize: '24px', fontWeight: '700', marginBottom: '24px', color: '#1f2937' }}>
                      ✅ Review Your Application
                    </h2>

                    <div style={{
                      background: '#f0f9ff',
                      border: '1px solid #bae6fd',
                      borderRadius: '12px',
                      padding: '20px',
                      marginBottom: '24px'
                    }}>
                      <h3 style={{ fontSize: '18px', fontWeight: '600', marginBottom: '16px', color: '#0369a1' }}>
                        📋 Application Summary
                      </h3>
                      
                      <div style={{ display: 'grid', gap: '12px' }}>
                        <div><strong>Name:</strong> {formData.name}</div>
                        <div><strong>Location:</strong> {formData.location}</div>
                        <div><strong>Hourly Rate:</strong> ${formData.pricePerHour} USD</div>
                        <div><strong>Specialties:</strong> {formData.specialties.join(', ')}</div>
                        <div><strong>Documents:</strong> {documentPreviews.length} files uploaded</div>
                      </div>
                    </div>

                    <div style={{
                      background: '#fef3c7',
                      border: '1px solid #fcd34d',
                      borderRadius: '12px',
                      padding: '16px',
                      marginBottom: '24px'
                    }}>
                      <p style={{ fontSize: '14px', color: '#92400e', margin: 0 }}>
                        ⚠️ <strong>Review Process:</strong> Your application will be reviewed within 24-48 hours. 
                        You'll receive an email notification once verification is complete.
                      </p>
                    </div>

                    <div style={{ display: 'flex', justifyContent: 'space-between', gap: '16px' }}>
                      <button
                        type="button"
                        onClick={() => setCurrentStep(3)}
                        style={{
                          padding: '12px 24px',
                          border: '1px solid #d1d5db',
                          background: 'white',
                          color: '#374151',
                          borderRadius: '12px',
                          fontWeight: '500',
                          cursor: 'pointer'
                        }}
                      >
                        ← Back
                      </button>
                      <button
                        type="submit"
                        className="btn-primary"
                        disabled={isSubmitting}
                        style={{
                          opacity: isSubmitting ? 0.7 : 1,
                          cursor: isSubmitting ? 'not-allowed' : 'pointer'
                        }}
                      >
                        {isSubmitting ? '🔄 Submitting...' : '🚀 Submit Application'}
                      </button>
                    </div>
                  </div>
                )}
              </form>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}