import { request, gql } from 'graphql-request';

const SUBGRAPH_URL = process.env.NEXT_PUBLIC_SUBGRAPH_URL || '';

export const GET_GUIDE_BOOKINGS = gql`
  query GetGuideBookings($guide: String!) {
    bookings(where: { guide: $guide }, orderBy: createdAt, orderDirection: desc) {
      id
      tourist
      guide
      amount
      status
      experienceId
      createdAt
      completedAt
    }
  }
`;

export const GET_TOURIST_BOOKINGS = gql`
  query GetTouristBookings($tourist: String!) {
    bookings(where: { tourist: $tourist }, orderBy: createdAt, orderDirection: desc) {
      id
      tourist
      guide
      amount
      status
      experienceId
      createdAt
      completedAt
    }
  }
`;

export const GET_GUIDE_REVIEWS = gql`
  query GetGuideReviews($guide: String!) {
    reviews(where: { guide: $guide }, orderBy: timestamp, orderDirection: desc) {
      id
      bookingId
      tourist
      guide
      rating
      ipfsHash
      timestamp
    }
  }
`;

export const GET_VERIFIED_GUIDES = gql`
  query GetVerifiedGuides {
    guides(where: { verified: true }) {
      id
      verified
      provincialReg
      firstAidCert
      satsaMembership
      verifiedAt
      expiresAt
    }
  }
`;

export const GET_BOOKING_DETAILS = gql`
  query GetBookingDetails($id: String!) {
    booking(id: $id) {
      id
      tourist
      guide
      amount
      status
      experienceId
      createdAt
      completedAt
    }
  }
`;

export class GraphService {
  async getGuideBookings(guide: string) {
    try {
      const data = await request(SUBGRAPH_URL, GET_GUIDE_BOOKINGS, { guide: guide.toLowerCase() }) as any;
      return data.bookings;
    } catch (error) {
      console.error('Failed to fetch guide bookings:', error);
      throw error;
    }
  }

  async getTouristBookings(tourist: string) {
    try {
      const data = await request(SUBGRAPH_URL, GET_TOURIST_BOOKINGS, { tourist: tourist.toLowerCase() }) as any;
      return data.bookings;
    } catch (error) {
      console.error('Failed to fetch tourist bookings:', error);
      throw error;
    }
  }

  async getGuideReviews(guide: string) {
    try {
      const data = await request(SUBGRAPH_URL, GET_GUIDE_REVIEWS, { guide: guide.toLowerCase() }) as any;
      return data.reviews;
    } catch (error) {
      console.error('Failed to fetch guide reviews:', error);
      throw error;
    }
  }

  async getVerifiedGuides() {
    try {
      const data = await request(SUBGRAPH_URL, GET_VERIFIED_GUIDES) as any;
      return data.guides;
    } catch (error) {
      console.error('Failed to fetch verified guides:', error);
      throw error;
    }
  }

  async getBookingDetails(id: string) {
    try {
      const data = await request(SUBGRAPH_URL, GET_BOOKING_DETAILS, { id }) as any;
      return data.booking;
    } catch (error) {
      console.error('Failed to fetch booking details:', error);
      throw error;
    }
  }
}

export const graphService = new GraphService();