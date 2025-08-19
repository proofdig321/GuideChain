// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import "@thirdweb-dev/contracts/extension/ContractMetadata.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";

interface IGuideRegistry {
    function isVerified(address guide) external view returns (bool);
}

contract BookingEscrow is ContractMetadata, ReentrancyGuard {
    enum BookingStatus { PENDING, ACCEPTED, COMPLETED, CANCELLED, DISPUTED }

    struct Booking {
        address tourist;
        address guide;
        uint256 amount;
        BookingStatus status;
        string experienceId;
        uint256 createdAt;
        uint256 completedAt;
    }

    IERC20 public immutable USDC;
    IGuideRegistry public immutable guideRegistry;
    
    uint256 public constant PLATFORM_FEE = 750; // 7.5%
    uint256 public constant FEE_DENOMINATOR = 10000;
    
    address public treasury;
    uint256 public bookingCounter;
    
    mapping(uint256 => Booking) public bookings;
    mapping(address => uint256[]) public touristBookings;
    mapping(address => uint256[]) public guideBookings;

    event BookingCreated(uint256 indexed bookingId, address indexed tourist, address indexed guide, uint256 amount, string experienceId);
    event BookingAccepted(uint256 indexed bookingId, address indexed guide);
    event BookingCompleted(uint256 indexed bookingId, address indexed guide, uint256 amount);
    event BookingCancelled(uint256 indexed bookingId, address indexed canceller);

    constructor(address _usdc, address _guideRegistry) {
        USDC = IERC20(_usdc);
        guideRegistry = IGuideRegistry(_guideRegistry);
        treasury = 0x25E1303E503Dc60B5Eee353183A002a645439328;
    }

    function createBooking(
        address guide,
        uint256 amount,
        string memory experienceId
    ) external nonReentrant returns (uint256) {
        require(guideRegistry.isVerified(guide), "Guide not verified");
        require(amount > 0, "Amount must be positive");
        
        uint256 bookingId = ++bookingCounter;
        
        bookings[bookingId] = Booking({
            tourist: msg.sender,
            guide: guide,
            amount: amount,
            status: BookingStatus.PENDING,
            experienceId: experienceId,
            createdAt: block.timestamp,
            completedAt: 0
        });

        touristBookings[msg.sender].push(bookingId);
        guideBookings[guide].push(bookingId);

        require(USDC.transferFrom(msg.sender, address(this), amount), "Transfer failed");

        emit BookingCreated(bookingId, msg.sender, guide, amount, experienceId);
        return bookingId;
    }

    function acceptBooking(uint256 bookingId) external {
        Booking storage booking = bookings[bookingId];
        require(booking.guide == msg.sender, "Not your booking");
        require(booking.status == BookingStatus.PENDING, "Invalid status");

        booking.status = BookingStatus.ACCEPTED;
        emit BookingAccepted(bookingId, msg.sender);
    }

    function completeBooking(uint256 bookingId) external nonReentrant {
        Booking storage booking = bookings[bookingId];
        require(booking.guide == msg.sender, "Not your booking");
        require(booking.status == BookingStatus.ACCEPTED, "Invalid status");

        booking.status = BookingStatus.COMPLETED;
        booking.completedAt = block.timestamp;

        uint256 platformFee = (booking.amount * PLATFORM_FEE) / FEE_DENOMINATOR;
        uint256 guideAmount = booking.amount - platformFee;

        require(USDC.transfer(treasury, platformFee), "Fee transfer failed");
        require(USDC.transfer(booking.guide, guideAmount), "Guide payment failed");

        emit BookingCompleted(bookingId, msg.sender, guideAmount);
    }

    function cancelBooking(uint256 bookingId) external nonReentrant {
        Booking storage booking = bookings[bookingId];
        require(
            booking.tourist == msg.sender || booking.guide == msg.sender,
            "Not authorized"
        );
        require(booking.status == BookingStatus.PENDING, "Cannot cancel");

        booking.status = BookingStatus.CANCELLED;
        require(USDC.transfer(booking.tourist, booking.amount), "Refund failed");

        emit BookingCancelled(bookingId, msg.sender);
    }

    function getBooking(uint256 bookingId) external view returns (Booking memory) {
        return bookings[bookingId];
    }

    function getTouristBookings(address tourist) external view returns (uint256[] memory) {
        return touristBookings[tourist];
    }

    function getGuideBookings(address guide) external view returns (uint256[] memory) {
        return guideBookings[guide];
    }

    function _canSetContractURI() internal pure override returns (bool) {
        return false;
    }
}