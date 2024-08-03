const { ethers } = require("hardhat");

async function distributeTokens(userAddress) {
  const [deployer] = await ethers.getSigners();

  const xenniumAddress = "0x2697856528a5b24E0781BA4454D7e6C04bDF5718"; // Xennium contract address
  const Xennium = await ethers.getContractFactory("Xennium");
  const xennium = Xennium.attach(xenniumAddress);

  const initialCoins = ethers.utils.parseUnits("10", 18); // 10 XENX tokens
  await xennium.transfer(userAddress, initialCoins);

  console.log(`Distributed ${ethers.utils.formatUnits(initialCoins, 18)} XENX tokens to ${userAddress}`);
}

// Example usage
const newUserAddress = "0xUserAddressHere";
distributeTokens(newUserAddress)
  .then(() => console.log("Tokens distributed successfully"))
  .catch((error) => console.error("Error distributing tokens:", error));
