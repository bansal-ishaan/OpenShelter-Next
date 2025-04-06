// SPDX-License-Identifier: MIT
pragma solidity ^0.8.22;

import {ERC721} from "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import {ERC721URIStorage} from "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import {Ownable} from "@openzeppelin/contracts/access/Ownable.sol";

contract RefugeeFinance is ERC721, ERC721URIStorage, Ownable {
    // Packed user data structure
    struct UserInfo {
        uint248 tokenId;  // Uses 248 bits to allow boolean packing
        bool isVerified;
    }
    
    // SBT state
    uint256 private _tokenIdCounter;
    mapping(address => UserInfo) public userInfo;

    // Microloan state
    uint256 public constant MAX_LOAN = 0.5 ether;
    mapping(address => uint256) public loanAmount;
    mapping(address => uint256) public loanDueDate;
    mapping(address => uint256) public loanRepaid;

    // Credit system
    mapping(address => int256) public creditScore;
    
    event LoanIssued(address indexed borrower, uint256 amount);
    event LoanRepaid(address indexed borrower, uint256 amount);
    event CreditUpdated(address indexed user, int256 newScore);

    constructor(address initialOwner)
        ERC721("RefugeeID", "RID")
        Ownable(initialOwner)
    {}

    // Mint SBT with IPFS hash (uses cheaper _mint instead of _safeMint)
    function registerRefugee(address to, string memory ipfsHash) public onlyOwner {
        uint256 tokenId = _tokenIdCounter++;
        _mint(to, tokenId);
        _setTokenURI(tokenId, string(abi.encodePacked("ipfs://", ipfsHash)));
        userInfo[to] = UserInfo(uint248(tokenId), false);
    }

    // Document verification
    function verifyDocuments(address user) public onlyOwner {
        userInfo[user].isVerified = true;
    }

    // Loan management functions
    function requestLoan(uint256 amount) public {
        UserInfo memory info = userInfo[msg.sender];
        require(info.isVerified, "Unverified documents");
        require(amount <= MAX_LOAN, "Exceeds maximum loan");
        require(address(this).balance >= amount, "Insufficient funds");
        require(creditScore[msg.sender] >= -50, "Poor credit history");
        
        // Check for existing active loan
        require(
            loanRepaid[msg.sender] >= loanAmount[msg.sender] || 
            block.timestamp > loanDueDate[msg.sender],
            "Existing active loan"
        );

        loanAmount[msg.sender] = amount;
        loanDueDate[msg.sender] = block.timestamp + 30 days;
        loanRepaid[msg.sender] = 0;

        payable(msg.sender).transfer(amount);
        emit LoanIssued(msg.sender, amount);
    }

    function repayLoan() public payable {
        uint256 total = loanAmount[msg.sender];
        uint256 repaid = loanRepaid[msg.sender];
        require(repaid < total, "No active loan");

        uint256 remaining = total - repaid;
        require(msg.value <= remaining, "Overpayment");

        loanRepaid[msg.sender] += msg.value;
        
        if (loanRepaid[msg.sender] >= total) {
            // Update credit score based on repayment time
            if (block.timestamp <= loanDueDate[msg.sender]) {
                creditScore[msg.sender] += 40;
            } else {
                creditScore[msg.sender] -= 50;
            }
            emit CreditUpdated(msg.sender, creditScore[msg.sender]);
        }

        emit LoanRepaid(msg.sender, msg.value);
    }

    // View functions
    function getUserDocument(address user) public view returns (string memory) {
        return tokenURI(userInfo[user].tokenId);
    }

    // Overrides
    function tokenURI(uint256 tokenId)
        public view override(ERC721, ERC721URIStorage) returns (string memory)
    {
        return super.tokenURI(tokenId);
    }

    function supportsInterface(bytes4 interfaceId)
        public view override(ERC721, ERC721URIStorage) returns (bool)
    {
        return super.supportsInterface(interfaceId);
    }

    receive() external payable {}
}