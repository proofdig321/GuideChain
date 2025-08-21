import { IPFS_CONFIG } from "@/constants";
import type { IPFSMetadata } from "@/types";

// IPFS Service for file and metadata management
export class IPFSService {
  private apiKey: string;
  private apiSecret: string;

  constructor() {
    this.apiKey = process.env.NEXT_PUBLIC_PINATA_API_KEY || "";
    this.apiSecret = process.env.NEXT_PUBLIC_PINATA_SECRET_KEY || "";
  }

  // Upload file to IPFS via Pinata
  async uploadFile(file: File): Promise<string> {
    if (!this.validateFile(file)) {
      throw new Error("Invalid file type or size");
    }

    const formData = new FormData();
    formData.append("file", file);
    formData.append("pinataMetadata", JSON.stringify({
      name: file.name,
      keyvalues: {
        uploadedAt: new Date().toISOString(),
        platform: "GuidesChain"
      }
    }));

    try {
      const response = await fetch(`${IPFS_CONFIG.API_URL}/pinning/pinFileToIPFS`, {
        method: "POST",
        headers: {
          "pinata_api_key": this.apiKey,
          "pinata_secret_api_key": this.apiSecret,
        },
        body: formData,
      });

      if (!response.ok) {
        throw new Error(`IPFS upload failed: ${response.statusText}`);
      }

      const result = await response.json();
      return result.IpfsHash;
    } catch (error) {
      console.error("IPFS file upload error:", error);
      throw new Error("Failed to upload file to IPFS");
    }
  }

  // Upload JSON metadata to IPFS
  async uploadMetadata(metadata: IPFSMetadata): Promise<string> {
    const jsonData = {
      ...metadata,
      timestamp: Date.now(),
      platform: "GuidesChain",
      version: "1.0"
    };

    try {
      const response = await fetch(`${IPFS_CONFIG.API_URL}/pinning/pinJSONToIPFS`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "pinata_api_key": this.apiKey,
          "pinata_secret_api_key": this.apiSecret,
        },
        body: JSON.stringify({
          pinataContent: jsonData,
          pinataMetadata: {
            name: `${metadata.name}-metadata`,
            keyvalues: {
              type: "metadata",
              uploadedAt: new Date().toISOString(),
            }
          }
        }),
      });

      if (!response.ok) {
        throw new Error(`IPFS metadata upload failed: ${response.statusText}`);
      }

      const result = await response.json();
      return result.IpfsHash;
    } catch (error) {
      console.error("IPFS metadata upload error:", error);
      throw new Error("Failed to upload metadata to IPFS");
    }
  }

  // Retrieve data from IPFS
  async getData<T = any>(hash: string): Promise<T> {
    try {
      const response = await fetch(`${IPFS_CONFIG.GATEWAY_URL}${hash}`);
      
      if (!response.ok) {
        throw new Error(`IPFS fetch failed: ${response.statusText}`);
      }

      const contentType = response.headers.get("content-type");
      
      if (contentType?.includes("application/json")) {
        return await response.json();
      } else {
        return await response.text() as T;
      }
    } catch (error) {
      console.error("IPFS data retrieval error:", error);
      throw new Error("Failed to retrieve data from IPFS");
    }
  }

  // Get IPFS URL for a hash
  getIPFSUrl(hash: string): string {
    return `${IPFS_CONFIG.GATEWAY_URL}${hash}`;
  }

  // Validate file before upload
  private validateFile(file: File): boolean {
    // Check file size
    if (file.size > IPFS_CONFIG.MAX_FILE_SIZE) {
      return false;
    }

    // Check file type
    if (!IPFS_CONFIG.ALLOWED_FILE_TYPES.includes(file.type as any)) {
      return false;
    }

    return true;
  }

  // Upload guide verification documents
  async uploadGuideDocuments(
    documents: File[],
    guideInfo: {
      name: string;
      location: string;
      specialties: string[];
      experience: string;
      languages: string[];
    }
  ): Promise<string> {
    try {
      // Upload all document files
      const documentHashes = await Promise.all(
        documents.map(doc => this.uploadFile(doc))
      );

      // Create metadata with document references
      const metadata: IPFSMetadata = {
        name: guideInfo.name,
        description: guideInfo.experience,
        attributes: [
          { trait_type: "Location", value: guideInfo.location },
          { trait_type: "Specialties", value: guideInfo.specialties.join(", ") },
          { trait_type: "Languages", value: guideInfo.languages.join(", ") },
          { trait_type: "Document Count", value: documentHashes.length },
        ],
        documents: documentHashes,
        timestamp: Date.now(),
      };

      // Upload metadata
      return await this.uploadMetadata(metadata);
    } catch (error) {
      console.error("Guide documents upload error:", error);
      throw new Error("Failed to upload guide documents");
    }
  }

  // Upload booking metadata
  async uploadBookingMetadata(bookingData: {
    guideAddress: string;
    touristAddress: string;
    experienceTitle: string;
    scheduledDate: string;
    participants: number;
    specialRequests?: string;
  }): Promise<string> {
    const metadata: IPFSMetadata = {
      name: `Booking: ${bookingData.experienceTitle}`,
      description: `Booking between ${bookingData.touristAddress} and ${bookingData.guideAddress}`,
      attributes: [
        { trait_type: "Guide", value: bookingData.guideAddress },
        { trait_type: "Tourist", value: bookingData.touristAddress },
        { trait_type: "Scheduled Date", value: bookingData.scheduledDate },
        { trait_type: "Participants", value: bookingData.participants },
        { trait_type: "Special Requests", value: bookingData.specialRequests || "None" },
      ],
      timestamp: Date.now(),
    };

    return await this.uploadMetadata(metadata);
  }

  // Upload review metadata
  async uploadReviewMetadata(reviewData: {
    bookingId: string;
    guideAddress: string;
    reviewerAddress: string;
    rating: number;
    comment: string;
    photos?: File[];
  }): Promise<string> {
    try {
      // Upload photos if provided
      let photoHashes: string[] = [];
      if (reviewData.photos && reviewData.photos.length > 0) {
        photoHashes = await Promise.all(
          reviewData.photos.map(photo => this.uploadFile(photo))
        );
      }

      const metadata: IPFSMetadata = {
        name: `Review for Booking ${reviewData.bookingId}`,
        description: reviewData.comment,
        attributes: [
          { trait_type: "Booking ID", value: reviewData.bookingId },
          { trait_type: "Guide", value: reviewData.guideAddress },
          { trait_type: "Reviewer", value: reviewData.reviewerAddress },
          { trait_type: "Rating", value: reviewData.rating },
          { trait_type: "Photo Count", value: photoHashes.length },
        ],
        documents: photoHashes,
        timestamp: Date.now(),
      };

      return await this.uploadMetadata(metadata);
    } catch (error) {
      console.error("Review metadata upload error:", error);
      throw new Error("Failed to upload review metadata");
    }
  }

  // Batch upload multiple files
  async uploadMultipleFiles(files: File[]): Promise<string[]> {
    const uploadPromises = files.map(file => this.uploadFile(file));
    return await Promise.all(uploadPromises);
  }

  // Pin existing content (ensure it stays on IPFS)
  async pinContent(hash: string, name: string): Promise<void> {
    try {
      await fetch(`${IPFS_CONFIG.API_URL}/pinning/pinByHash`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "pinata_api_key": this.apiKey,
          "pinata_secret_api_key": this.apiSecret,
        },
        body: JSON.stringify({
          hashToPin: hash,
          pinataMetadata: {
            name: name,
            keyvalues: {
              pinnedAt: new Date().toISOString(),
              platform: "GuidesChain"
            }
          }
        }),
      });
    } catch (error) {
      console.error("IPFS pin error:", error);
      // Non-critical error, don't throw
    }
  }
}

// Export singleton instance
export const ipfsService = new IPFSService();