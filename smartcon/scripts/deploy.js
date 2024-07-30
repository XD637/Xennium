const hre = require("hardhat");

async function main() {
  const [deployer] = await hre.ethers.getSigners();

  const balance = await deployer.getBalance();
  console.log("Deployer address:", deployer.address);
  console.log("Deployer balance:", hre.ethers.utils.formatEther(balance), "ETH");

  if (balance.eq(0)) {
    console.error("Error: Deployer account has 0 ETH. Please add funds and try again.");
    return;
  }

  const gasPrice = await hre.ethers.provider.getGasPrice();
  console.log("Current gas price:", hre.ethers.utils.formatUnits(gasPrice, "gwei"), "gwei");

  const Transactions = await hre.ethers.getContractFactory("Transactions");
  const transactions = await Transactions.deploy();

  await transactions.deployed();

  console.log("Transactions deployed to:", transactions.address);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
//0xde1531c4475DdfcEb6642077e9b5B6F312813627