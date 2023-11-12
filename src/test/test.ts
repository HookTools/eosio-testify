import { utils } from '../utils/utils';
import { chainInit } from '../chain/chainInit' 
import { createWallet } from '../wallet/wallet';
import { expect } from 'chai'

describe('Wallet tests', function () {
    // const chain = new chainInit()
    // const wallet1 = new createWallet("5JmvsVfJ68S7EaCUAmwAnWwJZG1hh7P3THbGXwDe3q8jKExWssu",'active','hookbuilders',chain)

    // it('getBalance', async function () {
    //   console.log(await wallet1.getBalance())
    // });

    // it('check resources', async () => {
    //   console.log("RAM: ",await wallet1.getRam())
    //   console.log("CPU: ",await wallet1.getCPU())
    // });

    // it("transfer token", async () => {
    //   expect(console.log("Transfer: ", await wallet1.transfer(0.00000001,"eosio.token")))
    // }).timeout(5000)

    // it("buyRam", async () => {
    //   await wallet1.buyRAM(10000,wallet1.walletName)
    // }).timeout(5000)

    // it("buyRamWax", async () => {
    //   await wallet1.buyRamWax(0.01,wallet1.walletName)
    // }).timeout(5000)

    // it("sellRam", async () => {
    //   await wallet1.sellRAM(200)
    // }).timeout(5000)

    // it("stakeCPU", async () => {
    //   await wallet1.stakeCPUorNET(1,1)
    // }).timeout(5000)

    // it("unstakeCPU", async () => {
    //   await wallet1.unstakeCPUorNET(1,1)
    // }).timeout(5000)
    
    // it("clearContract", async () => {
    //   await wallet1.clearContract()
    // }).timeout(10000)

    it('Generate keys', async () => {
      console.log(await utils.generatePrivateKeys())
    })

    it("Generate wallet name", async () => {
      console.log(utils.generateWalletName())
    })
  });