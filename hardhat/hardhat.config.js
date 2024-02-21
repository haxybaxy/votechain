require("@nomicfoundation/hardhat-toolbox");
require("dotenv").config();

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.24",
  networks: {
    mumbai: {
      url: process.env.RPC_URL,
      accounts: [process.env.PRIVATE_KEY]
    },
  },
  etherscan: {
    apiKey: process.env.API_KEY,
  }
};

// Contract deployed at: Voting contract deployed to: 0xfbDfA54287f757EB7F376F765Ef64447f39ca8f0
// https://mumbai.polygonscan.com/address/0xfbDfA54287f757EB7F376F765Ef64447f39ca8f0#code
