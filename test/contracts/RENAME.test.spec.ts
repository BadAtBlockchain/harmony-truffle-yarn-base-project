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

  beforeEach(async () => {
    // Deploy token
    mockToken = await deployContract(minter, MockToken, ['LpToken', 'LPTOK', 1000000]);

    // give users some tokens to trade
    await mockToken.connect(minter).transfer(alice.address, "1000");
  });

  // Sanity Checks
  it('should be deployed', async () => {
    // Deploy contract
    // args: lp token, offering token, start block, end block, offering amount, raising amount, admin address
    // ifo = await deployContract(contractOwner, IFO, [lpToken.address, offeredToken.address, 100, 150, 100, 100, minter.address]);
  
    // expect(await ifo.address).to.be.a('string');
    // expect(await ifo.address).to.be.properAddress;
  });

  it('should be admin == minter', async () => {
    // Deploy contract
    // args: lp token, offering token, start block, end block, offering amount, raising amount, admin address
    //ifo = await deployContract(contractOwner, IFO, [lpToken.address, offeredToken.address, 100, 150, 100, 100, minter.address]);
  
    //expect(await ifo.adminAddress(), "minter should be admin of ifo").to.equal(minter.address);
  });

  it('Should allow logic when is IFO time (not enough raised)', async() => {
    /*
    // Deploy contract
    // args: lp token, offering token, start block, end block, offering amount, raising amount, admin address
    ifo = await deployContract(contractOwner, IFO, [lpToken.address, offeredToken.address, 100, 150, 100, 100, minter.address]);
    // PreReq fund deployed contract (admin)
    await offeredToken.connect(minter).transfer(ifo.address, '100');
    // PreReq approval for IFO (user)
    await lpToken.connect(alice).approve(ifo.address, '1000');

    // still not IFO time
    expect((await ifo.connect(alice).isIFOTime()), "IFO Time should be false right now").to.equal(false);
  
    // advance block to what should be the start time block
    await advanceBlockTo(provider, 101); // NOTE: we are in the IFO the block AFTER the start block. Could change logic if we want to be inclusive of start and end block time

    // should now be IFO time
    expect((await ifo.connect(alice).isIFOTime()), "IFO Time should be true right now").to.equal(true);
    
    // deposit 1 (raising target is 100)
    await ifo.connect(alice).deposit(1);
    expect((await ifo.connect(alice).totalAmount()), "Amount should be 1").to.equal(1);

    expect((await ifo.connect(alice).getUserAllocation(alice.address)), "Alice user allocation should be 1000000").to.equal(1000000);
    expect((await ifo.connect(alice).getOfferingAmount(alice.address)), "Alice offering amount should be 1").to.equal(1); // (1 * 100) / 100
    expect((await ifo.connect(alice).getRefundingAmount(alice.address)), "Alice refund amount should be 0").to.equal(0); // when below target raised amount, always returns 0 
    
    // should fail as we cannot harvest before IFO ends
    await expect(ifo.connect(alice).harvest()).to.be.revertedWith("not harvest time");

    // advance to 1 block after our end time (constructor param was 150)
    await advanceBlockTo(provider, 151);

    // check if our 3 users have harvest
    expect((await ifo.connect(alice).hasClaimedHarvest(alice.address)), "Alice should not have harvested").to.equal(false);
    expect((await ifo.connect(alice).hasClaimedHarvest(bob.address)), "Bob should not have harvested").to.equal(false);
    expect((await ifo.connect(alice).hasClaimedHarvest(carol.address)), "Carol should not have harvested").to.equal(false);
  
    // won't have any balance until we harvest
    expect((await offeredToken.connect(alice).balanceOf(alice.address)), "Alice offered token balance should be 0").to.equal(0);
    // now we actually harvest for Alice
    await ifo.connect(alice).harvest();
    expect((await offeredToken.connect(alice).balanceOf(alice.address)), "Alice offered token balance should be 1").to.equal(1);
    expect((await ifo.connect(alice).hasClaimedHarvest(alice.address)), "Alice should have harvested").to.equal(true);
    */
  });
})