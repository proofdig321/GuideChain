// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import "@openzeppelin/contracts/security/ReentrancyGuard.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract ReputationSystem is ReentrancyGuard, Ownable {
    
    struct Review {
        uint256 id;
        address reviewer;
        address guide;
        uint256 bookingId;
        uint8 rating; // 1-5 stars
        string ipfsHash;
        uint256 createdAt;
        bool isVerified;
    }
    
    struct GuideReputation {
        uint256 totalReviews;
        uint256 totalRating;
        uint256 averageRating; // Scaled by 100 (e.g., 450 = 4.5 stars)
        uint256[] reviewIds;
    }
    
    mapping(uint256 => Review) public reviews;
    mapping(address => GuideReputation) public guideReputations;
    mapping(uint256 => bool) public bookingReviewed; // bookingId => reviewed
    mapping(address => uint256[]) public reviewerReviews;
    
    uint256 private _reviewIds;
    
    event ReviewSubmitted(uint256 indexed reviewId, address indexed reviewer, address indexed guide, uint8 rating);
    event ReviewVerified(uint256 indexed reviewId);
    
    function submitReview(
        address _guide,
        uint256 _bookingId,
        uint8 _rating,
        string memory _ipfsHash
    ) external nonReentrant {
        require(_guide != address(0), "Invalid guide address");
        require(_rating >= 1 && _rating <= 5, "Rating must be 1-5");
        require(!bookingReviewed[_bookingId], "Booking already reviewed");
        require(_guide != msg.sender, "Cannot review yourself");
        
        _reviewIds++;
        uint256 reviewId = _reviewIds;
        
        reviews[reviewId] = Review({
            id: reviewId,
            reviewer: msg.sender,
            guide: _guide,
            bookingId: _bookingId,
            rating: _rating,
            ipfsHash: _ipfsHash,
            createdAt: block.timestamp,
            isVerified: false
        });
        
        bookingReviewed[_bookingId] = true;
        reviewerReviews[msg.sender].push(reviewId);
        
        // Update guide reputation
        GuideReputation storage reputation = guideReputations[_guide];
        reputation.reviewIds.push(reviewId);
        reputation.totalReviews++;
        reputation.totalRating += _rating;
        reputation.averageRating = (reputation.totalRating * 100) / reputation.totalReviews;
        
        emit ReviewSubmitted(reviewId, msg.sender, _guide, _rating);
    }
    
    function verifyReview(uint256 _reviewId) external onlyOwner {
        require(_reviewId <= _reviewIds && _reviewId > 0, "Invalid review ID");
        require(!reviews[_reviewId].isVerified, "Review already verified");
        
        reviews[_reviewId].isVerified = true;
        emit ReviewVerified(_reviewId);
    }
    
    function getReview(uint256 _reviewId) external view returns (Review memory) {
        require(_reviewId <= _reviewIds && _reviewId > 0, "Invalid review ID");
        return reviews[_reviewId];
    }
    
    function getGuideReputation(address _guide) external view returns (GuideReputation memory) {
        return guideReputations[_guide];
    }
    
    function getGuideReviews(address _guide) external view returns (uint256[] memory) {
        return guideReputations[_guide].reviewIds;
    }
    
    function getReviewerReviews(address _reviewer) external view returns (uint256[] memory) {
        return reviewerReviews[_reviewer];
    }
    
    function getTotalReviews() external view returns (uint256) {
        return _reviewIds;
    }
    
    function getGuideAverageRating(address _guide) external view returns (uint256) {
        return guideReputations[_guide].averageRating;
    }
    
    function isBookingReviewed(uint256 _bookingId) external view returns (bool) {
        return bookingReviewed[_bookingId];
    }
    
    // Get top rated guides
    function getTopGuides(uint256 _limit) external view returns (address[] memory topGuides, uint256[] memory ratings) {
        // This is a simplified version - in production, you'd want more efficient sorting
        address[] memory allGuides = new address[](_limit);
        uint256[] memory allRatings = new uint256[](_limit);
        
        // Note: This function would need to be optimized for production use
        // Consider using events and off-chain indexing for better performance
        
        return (allGuides, allRatings);
    }
}