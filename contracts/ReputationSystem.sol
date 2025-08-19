// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import "@thirdweb-dev/contracts/extension/ContractMetadata.sol";

interface IBookingEscrow {
    function getBooking(uint256 bookingId) external view returns (
        address tourist,
        address guide,
        uint256 amount,
        uint8 status,
        string memory experienceId,
        uint256 createdAt,
        uint256 completedAt
    );
}

contract ReputationSystem is ContractMetadata {
    struct Review {
        uint256 bookingId;
        address tourist;
        address guide;
        uint8 rating;
        string ipfsHash;
        uint256 timestamp;
    }

    struct GuideReputation {
        uint256 totalRating;
        uint256 reviewCount;
        uint256 averageRating;
    }

    IBookingEscrow public immutable bookingEscrow;
    
    uint256 public reviewCounter;
    mapping(uint256 => Review) public reviews;
    mapping(address => GuideReputation) public guideReputations;
    mapping(uint256 => bool) public bookingReviewed;
    mapping(address => uint256[]) public guideReviews;

    event ReviewSubmitted(
        uint256 indexed reviewId,
        uint256 indexed bookingId,
        address indexed tourist,
        address guide,
        uint8 rating,
        string ipfsHash
    );

    constructor(address _bookingEscrow) {
        bookingEscrow = IBookingEscrow(_bookingEscrow);
    }

    function submitReview(
        uint256 bookingId,
        uint8 rating,
        string memory ipfsHash
    ) external returns (uint256) {
        require(rating >= 1 && rating <= 5, "Rating must be 1-5");
        require(!bookingReviewed[bookingId], "Already reviewed");

        (
            address tourist,
            address guide,
            ,
            uint8 status,
            ,
            ,
            uint256 completedAt
        ) = bookingEscrow.getBooking(bookingId);

        require(tourist == msg.sender, "Not your booking");
        require(status == 2, "Booking not completed"); // COMPLETED = 2
        require(completedAt > 0, "Booking not completed");

        uint256 reviewId = ++reviewCounter;
        
        reviews[reviewId] = Review({
            bookingId: bookingId,
            tourist: tourist,
            guide: guide,
            rating: rating,
            ipfsHash: ipfsHash,
            timestamp: block.timestamp
        });

        bookingReviewed[bookingId] = true;
        guideReviews[guide].push(reviewId);

        GuideReputation storage reputation = guideReputations[guide];
        reputation.totalRating += rating;
        reputation.reviewCount += 1;
        reputation.averageRating = (reputation.totalRating * 100) / reputation.reviewCount;

        emit ReviewSubmitted(reviewId, bookingId, tourist, guide, rating, ipfsHash);
        return reviewId;
    }

    function getGuideRating(address guide) external view returns (
        uint256 totalRating,
        uint256 reviewCount,
        uint256 averageRating
    ) {
        GuideReputation memory reputation = guideReputations[guide];
        return (reputation.totalRating, reputation.reviewCount, reputation.averageRating);
    }

    function getReview(uint256 reviewId) external view returns (Review memory) {
        return reviews[reviewId];
    }

    function getGuideReviews(address guide) external view returns (uint256[] memory) {
        return guideReviews[guide];
    }

    function canReview(uint256 bookingId, address tourist) external view returns (bool) {
        if (bookingReviewed[bookingId]) return false;

        (
            address bookingTourist,
            ,
            ,
            uint8 status,
            ,
            ,
            uint256 completedAt
        ) = bookingEscrow.getBooking(bookingId);

        return (
            bookingTourist == tourist &&
            status == 2 && // COMPLETED
            completedAt > 0
        );
    }

    function _canSetContractURI() internal pure override returns (bool) {
        return false;
    }
}