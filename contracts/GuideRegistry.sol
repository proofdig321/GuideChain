// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import "@thirdweb-dev/contracts/extension/ContractMetadata.sol";
import "@thirdweb-dev/contracts/extension/Ownable.sol";

contract GuideRegistry is ContractMetadata, Ownable {
    struct GuideInfo {
        bool verified;
        string provincialReg;
        string firstAidCert;
        string satsaMembership;
        uint256 verifiedAt;
        uint256 expiresAt;
    }

    mapping(address => GuideInfo) public guides;
    mapping(address => bool) public verifiers;
    
    event GuideVerified(address indexed guide, string provincialReg, string firstAidCert, uint256 timestamp);
    event GuideExpired(address indexed guide, uint256 timestamp);
    event VerifierAdded(address indexed verifier);

    modifier onlyVerifier() {
        require(verifiers[msg.sender] || msg.sender == owner(), "Not authorized");
        _;
    }

    constructor() {
        _setupOwner(0x25E1303E503Dc60B5Eee353183A002a645439328);
        verifiers[0x25E1303E503Dc60B5Eee353183A002a645439328] = true;
    }

    function verifyGuide(
        address guide,
        string memory provincialReg,
        string memory firstAidCert,
        string memory satsaMembership
    ) external onlyVerifier {
        guides[guide] = GuideInfo({
            verified: true,
            provincialReg: provincialReg,
            firstAidCert: firstAidCert,
            satsaMembership: satsaMembership,
            verifiedAt: block.timestamp,
            expiresAt: block.timestamp + 730 days // 2 years
        });

        emit GuideVerified(guide, provincialReg, firstAidCert, block.timestamp);
    }

    function isVerified(address guide) external view returns (bool) {
        return guides[guide].verified && guides[guide].expiresAt > block.timestamp;
    }

    function getGuideInfo(address guide) external view returns (GuideInfo memory) {
        return guides[guide];
    }

    function addVerifier(address verifier) external onlyOwner {
        verifiers[verifier] = true;
        emit VerifierAdded(verifier);
    }

    function _canSetContractURI() internal view virtual override returns (bool) {
        return msg.sender == owner();
    }
}