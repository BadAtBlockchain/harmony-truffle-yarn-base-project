const fs = require('fs');

const TestContract = artifacts.require("TestContract");
const MockToken = artifacts.require("ERC20Mock");

module.exports = async function (deployer, network, addresses) {
    const [admin, _] = addresses;

    let lpTokenAddress, offeredTokenAddress;
    if (network == "testnet") {
      // deploy the mock tokens here to testnet as they don't exist yet
      await deployer.deploy(MockToken, "LP Test Token", "LPTT", 1000000);
    
      lpTokenAddress = MockToken.address;

      if (!lpTokenAddress) {
          console.log(`Deployment failed, no lp/offered token address`)
          return;
      }

      // Deploy contract
      await deployer.deploy(
        TestContract
      );
    }
};