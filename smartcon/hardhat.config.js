require("@nomiclabs/hardhat-waffle");


module.exports = {
  solidity: "0.8.0",
  networks: {
    sepolia: {
      url: "https://site1.moralis-nodes.com/sepolia/6782ca79d51f4b93bfa6e91177be49c1",
      accounts: [`0x${PRIVATE_KEY}`]
    }
  }
};
