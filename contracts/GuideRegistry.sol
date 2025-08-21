// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";
import "@openzeppelin/contracts/utils/Counters.sol";

contract GuideRegistry is ERC721, Ownable, ReentrancyGuard {
    using Counters for Counters.Counter;
    
    Counters.Counter private _tokenIds;
    
    struct Guide {
        address guideAddress;
        string name;
        string location;
        string[] specialties;
        string ipfsHash;
        bool isVerified;
        uint256 createdAt;
    }
    
    mapping(uint256 => Guide) public guides;
    mapping(address => uint256) public guideTokens;
    mapping(address => bool) public verifiers;
    
    event GuideRegistered(uint256 indexed tokenId, address indexed guide, string name);
    event GuideVerified(uint256 indexed tokenId, address indexed verifier);
    event VerifierAdded(address indexed verifier);
    
    constructor() ERC721("GuidesChain SBT", "GUIDES") {
        verifiers[0xc84799A904EeB5C57aBBBc40176E7dB8be202C10] = true; // Super Admin
    }
    
    modifier onlyVerifier() {
        require(verifiers[msg.sender] || msg.sender == owner(), "Not authorized verifier");
        _;
    }
    
    function registerGuide(
        string memory _name,
        string memory _location,
        string[] memory _specialties,
        string memory _ipfsHash
    ) external nonReentrant {
        require(guideTokens[msg.sender] == 0, "Guide already registered");
        
        _tokenIds.increment();
        uint256 newTokenId = _tokenIds.current();
        
        guides[newTokenId] = Guide({
            guideAddress: msg.sender,
            name: _name,
            location: _location,
            specialties: _specialties,
            ipfsHash: _ipfsHash,
            isVerified: false,
            createdAt: block.timestamp
        });
        
        guideTokens[msg.sender] = newTokenId;
        _safeMint(msg.sender, newTokenId);
        
        emit GuideRegistered(newTokenId, msg.sender, _name);
    }
    
    function verifyGuide(uint256 _tokenId) external onlyVerifier {
        require(_exists(_tokenId), "Guide does not exist");
        require(!guides[_tokenId].isVerified, "Guide already verified");
        
        guides[_tokenId].isVerified = true;
        emit GuideVerified(_tokenId, msg.sender);
    }
    
    function addVerifier(address _verifier) external onlyOwner {
        verifiers[_verifier] = true;
        emit VerifierAdded(_verifier);
    }
    
    function getGuide(uint256 _tokenId) external view returns (Guide memory) {
        require(_exists(_tokenId), "Guide does not exist");
        return guides[_tokenId];
    }
    
    function getGuideByAddress(address _guide) external view returns (Guide memory) {
        uint256 tokenId = guideTokens[_guide];
        require(tokenId != 0, "Guide not registered");
        return guides[tokenId];
    }
    
    function getTotalGuides() external view returns (uint256) {
        return _tokenIds.current();
    }
    
    // Soulbound: prevent transfers
    function _beforeTokenTransfer(
        address from,
        address to,
        uint256 tokenId,
        uint256 batchSize
    ) internal override {
        require(from == address(0) || to == address(0), "Soulbound: transfers not allowed");
        super._beforeTokenTransfer(from, to, tokenId, batchSize);
    }
}