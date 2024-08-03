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
  const xennium = await Xennium.deploy(deployer.address);

  await xennium.deployed();

  console.log("Xennium deployed to:", xennium.address);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });


  //0xAb114351697f1f563D6AcA9CF076e88E79546097
