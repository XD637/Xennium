// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract Xennium is ERC20, Ownable {
    uint256 public constant INITIAL_COINS = 1_000_000 * 10 ** 18; // Increased supply to 1 million tokens
    uint256 public constant DEPRECIATION_THRESHOLD = 1 * 10 ** 18; // Threshold to prevent spending the last coin

    mapping(address => uint256) public spentCoins;
    mapping(address => uint256) public lastSpentTime;

    constructor(address owner) ERC20("Xennium", "XENX") Ownable(owner) {
        _mint(owner, INITIAL_COINS);
    }

    function spendCoins(uint256 amount) external {
        require(balanceOf(msg.sender) >= amount, "Not enough coins");
        
        uint256 remainingCoins = balanceOf(msg.sender) - amount;
        uint256 depreciation = calculateDepreciation(remainingCoins);
        require(depreciation < 100, "Cannot spend the last Xennium coin");

        _burn(msg.sender, amount);
        spentCoins[msg.sender] += amount;
        lastSpentTime[msg.sender] = block.timestamp;
    }

    function calculateDepreciation(uint256 remainingCoins) public pure returns (uint256) {
        if (remainingCoins <= DEPRECIATION_THRESHOLD) {
            return 100;
        } else {
            uint256 spentPercentage = (INITIAL_COINS - remainingCoins) * 100 / INITIAL_COINS;
            return spentPercentage;
        }
    }
}
