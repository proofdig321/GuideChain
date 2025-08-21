// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract BookingEscrow is ReentrancyGuard, Ownable {
    IERC20 public immutable usdc;
    
    uint256 public constant PLATFORM_FEE_PERCENT = 750; // 7.5%
    uint256 public constant FEE_DENOMINATOR = 10000;
    
    address public platformWallet = 0xc84799A904EeB5C57aBBBc40176E7dB8be202C10;
    
    enum BookingStatus { Created, Confirmed, Completed, Cancelled, Disputed }
    
    struct Booking {
        uint256 id;
        address tourist;
        address guide;
        uint256 amount;
        uint256 platformFee;
        uint256 guideAmount;
        BookingStatus status;
        uint256 createdAt;
        uint256 scheduledAt;
        string ipfsHash;
    }
    
    mapping(uint256 => Booking) public bookings;
    mapping(address => uint256[]) public touristBookings;
    mapping(address => uint256[]) public guideBookings;
    
    uint256 private _bookingIds;
    
    event BookingCreated(uint256 indexed bookingId, address indexed tourist, address indexed guide, uint256 amount);
    event BookingConfirmed(uint256 indexed bookingId);
    event BookingCompleted(uint256 indexed bookingId);
    event BookingCancelled(uint256 indexed bookingId);
    event PlatformWalletUpdated(address indexed newWallet);
    
    constructor(address _usdc) {
        usdc = IERC20(_usdc);
    }
    
    function createBooking(
        address _guide,
        uint256 _amount,
        uint256 _scheduledAt,
        string memory _ipfsHash
    ) external nonReentrant {
        require(_guide != address(0), "Invalid guide address");
        require(_amount > 0, "Amount must be greater than 0");
        require(_scheduledAt > block.timestamp, "Invalid scheduled time");
        
        uint256 platformFee = (_amount * PLATFORM_FEE_PERCENT) / FEE_DENOMINATOR;
        uint256 guideAmount = _amount - platformFee;
        
        require(usdc.transferFrom(msg.sender, address(this), _amount), "USDC transfer failed");
        
        _bookingIds++;
        uint256 bookingId = _bookingIds;
        
        bookings[bookingId] = Booking({
            id: bookingId,
            tourist: msg.sender,
            guide: _guide,
            amount: _amount,
            platformFee: platformFee,
            guideAmount: guideAmount,
            status: BookingStatus.Created,
            createdAt: block.timestamp,
            scheduledAt: _scheduledAt,
            ipfsHash: _ipfsHash
        });
        
        touristBookings[msg.sender].push(bookingId);
        guideBookings[_guide].push(bookingId);
        
        emit BookingCreated(bookingId, msg.sender, _guide, _amount);
    }
    
    function confirmBooking(uint256 _bookingId) external {
        Booking storage booking = bookings[_bookingId];
        require(booking.guide == msg.sender, "Only guide can confirm");
        require(booking.status == BookingStatus.Created, "Invalid booking status");
        
        booking.status = BookingStatus.Confirmed;
        emit BookingConfirmed(_bookingId);
    }
    
    function completeBooking(uint256 _bookingId) external nonReentrant {
        Booking storage booking = bookings[_bookingId];
        require(booking.tourist == msg.sender, "Only tourist can complete");
        require(booking.status == BookingStatus.Confirmed, "Booking not confirmed");
        require(block.timestamp >= booking.scheduledAt, "Booking not yet due");
        
        booking.status = BookingStatus.Completed;
        
        require(usdc.transfer(booking.guide, booking.guideAmount), "Guide payment failed");
        require(usdc.transfer(platformWallet, booking.platformFee), "Platform fee transfer failed");
        
        emit BookingCompleted(_bookingId);
    }
    
    function cancelBooking(uint256 _bookingId) external nonReentrant {
        Booking storage booking = bookings[_bookingId];
        require(booking.tourist == msg.sender || booking.guide == msg.sender, "Not authorized");
        require(booking.status == BookingStatus.Created || booking.status == BookingStatus.Confirmed, "Cannot cancel");
        
        booking.status = BookingStatus.Cancelled;
        
        // Refund tourist (minus small cancellation fee if guide confirmed)
        uint256 refundAmount = booking.amount;
        if (booking.status == BookingStatus.Confirmed) {
            refundAmount = booking.amount - (booking.platformFee / 2); // 50% platform fee as cancellation penalty
        }
        
        require(usdc.transfer(booking.tourist, refundAmount), "Refund failed");
        
        emit BookingCancelled(_bookingId);
    }
    
    function getBooking(uint256 _bookingId) external view returns (Booking memory) {
        return bookings[_bookingId];
    }
    
    function getTouristBookings(address _tourist) external view returns (uint256[] memory) {
        return touristBookings[_tourist];
    }
    
    function getGuideBookings(address _guide) external view returns (uint256[] memory) {
        return guideBookings[_guide];
    }
    
    function getTotalBookings() external view returns (uint256) {
        return _bookingIds;
    }
    
    function updatePlatformWallet(address _newWallet) external onlyOwner {
        require(_newWallet != address(0), "Invalid wallet address");
        platformWallet = _newWallet;
        emit PlatformWalletUpdated(_newWallet);
    }
    
    // Emergency functions
    function emergencyWithdraw() external onlyOwner {
        uint256 balance = usdc.balanceOf(address(this));
        require(usdc.transfer(owner(), balance), "Emergency withdraw failed");
    }
}