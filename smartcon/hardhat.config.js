require("@nomiclabs/hardhat-waffle");


module.exports = {
  solidity: "0.8.20",
  networks: {
    sepolia: {
      url: "https://eth-sepolia.g.alchemy.com/v2/FXG5sRR-7RYDElflSz4i9PKts0qmPKDV",
      accounts: ['cbbe8a0b491c0ad90bec2be592fdfcb4f5c5f6b27ce23a63f9d1c556eb381389']
    }
  }
};
