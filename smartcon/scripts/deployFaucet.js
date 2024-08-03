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

  // Deploy Xennium contract
  const Xennium = await hre.ethers.getContractFactory("Xennium");
  const xennium = await Xennium.deploy(deployer.address); // Pass deployer address as owner
  await xennium.deployed();
  console.log("Xennium deployed to:", xennium.address);

  // Deploy Xennium Faucet contract
  const XenniumFaucet = await hre.ethers.getContractFactory("XenniumFaucet");
  const faucet = await XenniumFaucet.deploy(xennium.address, deployer.address); // Pass both arguments
  await faucet.deployed();
  console.log("Xennium Faucet deployed to:", faucet.address);

  // Optionally, you can fund the faucet with some initial tokens
  const initialFaucetFunding = hre.ethers.utils.parseEther("100000"); 
  await xennium.transfer(faucet.address, initialFaucetFunding);
  console.log(`Faucet funded with ${hre.ethers.utils.formatEther(initialFaucetFunding)} XENX`);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
