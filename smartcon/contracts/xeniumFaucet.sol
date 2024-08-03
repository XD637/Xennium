// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/access/Ownable.sol";
import "./xennium.sol";  // Ensure this path is correct

contract XenniumFaucet is Ownable {
    Xennium private xenniumToken;
    uint256 public claimAmount = 10 * 10 ** 18; // 10 XENX, assuming 18 decimals
    mapping(address => bool) public hasClaimed;

    // Constructor with the initial owner address
    constructor(address _tokenAddress, address initialOwner) Ownable(initialOwner) {
        xenniumToken = Xennium(_tokenAddress);
    }

    function claimTokens() external {
        require(!hasClaimed[msg.sender], "You have already claimed your tokens.");
        require(xenniumToken.balanceOf(address(this)) >= claimAmount, "Faucet empty, please refill.");

        hasClaimed[msg.sender] = true;
        xenniumToken.transfer(msg.sender, claimAmount);
    }

    function refillFaucet(uint256 amount) external onlyOwner {
        xenniumToken.transferFrom(msg.sender, address(this), amount);
    }

    function setClaimAmount(uint256 amount) external onlyOwner {
        claimAmount = amount;
    }
}
