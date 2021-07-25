import chai, { expect } from 'chai';
import { Contract } from 'ethers';
import { solidity, MockProvider, deployContract } from 'ethereum-waffle';

import {advanceBlockTo} from '../shared/utilities';

import TestContract from '../../build/TestContract.json';
import MockToken from '../../build/ERC20Mock.json';

chai.use(solidity);

describe('TestContract', () => {
  const provider = new MockProvider({
    hardfork: 'istanbul',
    mnemonic: 'horn horn horn horn horn horn horn horn horn horn horn horn',
    gasLimit: 9999999
  });
  const [alice, bob, carol, contractOwner, minter] = provider.getWallets();

  let mockToken: Contract;
  let testContract: Contract;

  beforeEach(async () => {
    // Deploy token
    mockToken = await deployContract(minter, MockToken, ['LpToken', 'LPTOK', 1000000]);

    // give users some tokens to trade
    await mockToken.connect(minter).transfer(alice.address, "1000");
  });

  // Sanity Checks
  it('should be deployed', async () => {
    // Deploy contract
    testContract = await deployContract(contractOwner, TestContract);
  
    expect(await testContract.address).to.be.a('string');
    expect(await testContract.address).to.be.properAddress;
  });
})
