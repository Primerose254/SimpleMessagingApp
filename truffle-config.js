const HDWalletProvider = require('@truffle/hdwallet-provider');
const fs = require('fs');
const mnemonic = fs.readFileSync(".secret").toString().trim();

module.exports = {
  networks: {
    development: {
      host: "127.0.0.1",
      port: 8545,
      network_id: "*" // Match any network ID
    },
    sepolia: {
      provider: () => new HDWalletProvider(mnemonic, `https://sepolia.infura.io/v3/ffce9e9e527a423e97baa836039486cf`),
      network_id: 11155111, // Correct network ID for Sepolia
      gas: 5500000, // Adjust if necessary
      confirmations: 2, // Wait for 2 confirmations
      timeoutBlocks: 200, // Timeout for the deployment
      skipDryRun: true // Skip dry run before migrations
    }
  },
  compilers: {
    solc: {
      version: "0.8.0" // Specify the Solidity compiler version
    }
  }
};
