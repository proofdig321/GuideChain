/**
 * Mock Data for Development - Until Contracts are Deployed
 * Provides realistic data for testing and development
 */

import type { Guide, Booking, Review, VerificationApplication, PlatformStats } from "@/types";
import { SA_LOCATIONS, TOURISM_SPECIALTIES, LANGUAGES } from "@/constants";

// Mock Guides Data
export const mockGuides: Guide[] = [
  {
    id: "0x1234567890123456789012345678901234567890",
    address: "0x1234567890123456789012345678901234567890",
    name: "Sarah Johnson",
    location: "Cape Town",
    specialties: ["Wine Tours", "City Tours", "Table Mountain"],
    pricePerHour: 85,
    rating: 4.9,
    verified: true,
    verificationDate: "2024-01-15T10:00:00Z",
    totalBookings: 127,
    profileImageHash: "QmSarahProfile123",
    documentsHash: "QmSarahDocs123",
    languages: ["English", "Afrikaans", "German"],
    experience: "Professional wine sommelier with 8 years of experience guiding tourists through Cape Town's wine regions and iconic landmarks.",
    availability: true,
  },
  {
    id: "0x2345678901234567890123456789012345678901",
    address: "0x2345678901234567890123456789012345678901",
    name: "Thabo Mthembu",
    location: "Johannesburg",
    specialties: ["Historical Sites", "Township Tours", "Cultural Experiences"],
    pricePerHour: 65,
    rating: 4.8,
    verified: true,
    verificationDate: "2024-02-20T14:30:00Z",
    totalBookings: 89,
    profileImageHash: "QmThaboProfile456",
    documentsHash: "QmThaboDocs456",
    languages: ["English", "Zulu", "Sotho"],
    experience: "Local historian specializing in South African heritage and cultural tours. Born and raised in Soweto.",
    availability: true,
  },
  {
    id: "0x3456789012345678901234567890123456789012",
    address: "0x3456789012345678901234567890123456789012",
    name: "Emma van der Merwe",
    location: "Stellenbosch",
    specialties: ["Wine Tours", "Food & Culinary", "Photography Tours"],
    pricePerHour: 95,
    rating: 5.0,
    verified: true,
    verificationDate: "2024-01-10T09:15:00Z",
    totalBookings: 156,
    profileImageHash: "QmEmmaProfile789",
    documentsHash: "QmEmmaDocs789",
    languages: ["English", "Afrikaans", "French"],
    experience: "Award-winning photographer and wine expert offering immersive experiences in the Cape Winelands.",
    availability: false,
  },
  {
    id: "0x4567890123456789012345678901234567890123",
    address: "0x4567890123456789012345678901234567890123",
    name: "Mandla Ndlovu",
    location: "Durban",
    specialties: ["Safari & Wildlife", "Beach Activities", "Adventure Sports"],
    pricePerHour: 75,
    rating: 4.7,
    verified: true,
    verificationDate: "2024-03-05T11:45:00Z",
    totalBookings: 73,
    profileImageHash: "QmMandlaProfile012",
    documentsHash: "QmMandlaDocs012",
    languages: ["English", "Zulu", "Portuguese"],
    experience: "Marine biologist and adventure guide specializing in coastal and wildlife experiences along the KwaZulu-Natal coast.",
    availability: true,
  },
  {
    id: "0x5678901234567890123456789012345678901234",
    address: "0x5678901234567890123456789012345678901234",
    name: "Lisa Thompson",
    location: "Hermanus",
    specialties: ["Whale Watching", "Nature & Hiking", "Marine Life"],
    pricePerHour: 80,
    rating: 4.9,
    verified: true,
    verificationDate: "2024-02-28T16:20:00Z",
    totalBookings: 94,
    profileImageHash: "QmLisaProfile345",
    documentsHash: "QmLisaDocs345",
    languages: ["English", "German", "Spanish"],
    experience: "Marine conservationist with expertise in whale behavior and coastal ecosystems. 6 years of guiding experience.",
    availability: true,
  }
];

// Generate additional mock guides for comprehensive testing
const generateMockGuides = (): Guide[] => {
  const additionalGuides: Guide[] = [];
  const names = [
    "David Smith", "Nomsa Khumalo", "Pierre Dubois", "Zanele Mthethwa", "James Wilson",
    "Fatima Hassan", "Chris van Niekerk", "Sipho Dlamini", "Maria Santos", "Ahmed Ali",
    "Lerato Molefe", "John Anderson", "Priya Patel", "Kobus Steyn", "Grace Mbeki",
    "Michael Brown", "Thandiwe Nkomo", "Jean-Luc Martin", "Nomthandazo Zulu"
  ];

  names.forEach((name, index) => {
    const id = `0x${(index + 6).toString().padStart(40, '0')}`;
    additionalGuides.push({
      id,
      address: id,
      name,
      location: SA_LOCATIONS[index % SA_LOCATIONS.length],
      specialties: [
        TOURISM_SPECIALTIES[index % TOURISM_SPECIALTIES.length],
        TOURISM_SPECIALTIES[(index + 1) % TOURISM_SPECIALTIES.length],
      ],
      pricePerHour: 45 + Math.floor(Math.random() * 100),
      rating: 3.5 + Math.random() * 1.5,
      verified: Math.random() > 0.1, // 90% verified
      verificationDate: new Date(2024, Math.floor(Math.random() * 12), Math.floor(Math.random() * 28)).toISOString(),
      totalBookings: Math.floor(Math.random() * 200),
      profileImageHash: `QmProfile${index + 6}`,
      documentsHash: `QmDocs${index + 6}`,
      languages: [
        LANGUAGES[0], // English
        LANGUAGES[1 + (index % (LANGUAGES.length - 1))],
      ],
      experience: `Experienced guide with ${2 + Math.floor(Math.random() * 8)} years in the tourism industry.`,
      availability: Math.random() > 0.2, // 80% available
    });
  });

  return additionalGuides;
};

export const allMockGuides = [...mockGuides, ...generateMockGuides()];

// Mock Platform Stats
export const mockPlatformStats: PlatformStats = {
  totalGuides: allMockGuides.length,
  totalBookings: 1247,
  totalRevenue: "89750.50",
  platformFees: "6731.29",
  activeUsers: 3456,
  averageRating: 4.7,
};

// Mock Bookings
export const mockBookings: Booking[] = [
  {
    id: "1",
    guideAddress: mockGuides[0].address,
    touristAddress: "0xTourist1234567890123456789012345678901234",
    experienceId: "wine-tour-stellenbosch",
    amount: "170000000000000000000", // 170 USDC
    status: 1, // ACCEPTED
    createdAt: "2024-08-20T10:00:00Z",
    scheduledDate: "2024-08-25T09:00:00Z",
    participants: 2,
  },
  {
    id: "2",
    guideAddress: mockGuides[1].address,
    touristAddress: "0xTourist2345678901234567890123456789012345",
    experienceId: "township-tour-soweto",
    amount: "130000000000000000000", // 130 USDC
    status: 2, // COMPLETED
    createdAt: "2024-08-18T14:30:00Z",
    scheduledDate: "2024-08-22T11:00:00Z",
    completedAt: "2024-08-22T16:00:00Z",
    participants: 4,
  },
];

// Mock Reviews
export const mockReviews: Review[] = [
  {
    id: "1",
    bookingId: "2",
    reviewerAddress: "0xTourist2345678901234567890123456789012345",
    guideAddress: mockGuides[1].address,
    rating: 5,
    comment: "Incredible experience! Thabo's knowledge of South African history is amazing. Highly recommended!",
    createdAt: "2024-08-22T18:00:00Z",
    metadataHash: "QmReview1Hash",
    verified: true,
  },
];

// Mock Verification Applications
export const mockApplications: VerificationApplication[] = [
  {
    id: "0xPending1234567890123456789012345678901234",
    applicantAddress: "0xPending1234567890123456789012345678901234",
    name: "Jennifer Adams",
    location: "Port Elizabeth",
    specialties: ["Beach Activities", "Adventure Sports"],
    experience: "Surf instructor and adventure guide with 5 years experience along the Garden Route.",
    documentsHash: "QmPendingDocs123",
    status: 0, // PENDING
    submittedAt: "2024-08-21T12:00:00Z",
  },
  {
    id: "0xPending2345678901234567890123456789012345",
    applicantAddress: "0xPending2345678901234567890123456789012345",
    name: "Sipho Mahlangu",
    location: "Kruger National Park",
    specialties: ["Safari & Wildlife", "Photography Tours"],
    experience: "Wildlife photographer and safari guide with extensive knowledge of Big Five behavior.",
    documentsHash: "QmPendingDocs456",
    status: 0, // PENDING
    submittedAt: "2024-08-20T15:30:00Z",
  },
];

// Mock IPFS Metadata
export const mockIPFSMetadata = {
  "QmSarahDocs123": {
    name: "Sarah Johnson",
    description: "Professional wine sommelier with 8 years of experience guiding tourists through Cape Town's wine regions and iconic landmarks.",
    attributes: [
      { trait_type: "Location", value: "Cape Town" },
      { trait_type: "Specialties", value: "Wine Tours, City Tours, Table Mountain" },
      { trait_type: "Languages", value: "English, Afrikaans, German" },
    ],
    documents: ["QmDoc1", "QmDoc2", "QmDoc3"],
    timestamp: 1705320000000,
  },
  // Add more metadata as needed
};