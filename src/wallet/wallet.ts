
// import fetch from 'node-fetch'
import { TextDecoder, TextEncoder } from 'util'
import { chainInit } from '../chain/chainInit'
import { Api, JsonRpc, RpcError } from 'eosjs'
import { JsSignatureProvider } from 'eosjs/dist/eosjs-jssig'

const ecc = require('eosjs-ecc')


export class createWallet {
    privateKey: string
    publicKey: string
    walletName:string
    walletPermission:string
    chain: chainInit
    constructor(privateKey:string,walletPermission:string,name:string, chain:chainInit) {
        this.privateKey = privateKey
        this.publicKey = ecc.privateToPublic(privateKey);
        this.walletName = name
        this.chain = chain
        this.walletPermission = walletPermission
    }  

    private sendTransaction = async (data:{to:string, action:string, data:any}[]) => {
        const rpc = new JsonRpc(this.chain.RPC, { fetch })
        const signatureProvider = new JsSignatureProvider([this.privateKey])
      
        const api = new Api({
          rpc,
          signatureProvider,
          // textEncoder: new TextEncoder(),
          // textDecoder: new TextDecoder(),
        })

        const actions: any[] = data.map(action => ({
            account: action.to,
            name: action.action,
            authorization: [
              {
                actor: this.walletName,
                permission: this.walletPermission,
              },
            ],
            data: action.data,
          }))

          try {
            const result = await api.transact(
              { actions },
              {
                blocksBehind: 3,
                expireSeconds: 30,
              }
            )
        
            return `'Transaction ID:', ${result}`
          } catch (error) {
            if (error instanceof RpcError) {
              // throw new Error(error?.json.error.what)
            } else {
              throw new Error(`'An error occurred' ${error}`)
            }
          }
          
    }

    getBalance = async () => {
      const response = await this.chain.getCurrencyBalance({code: "eosio.token", account: this.walletName,symbol: "WAX"})
      return response
    }

    getRam = async () => {
      const response = await this.chain.getAccount(this.walletName)
      return response.total_resources?.ram_bytes
    }

    getCPU = async () => {
      const response = await this.chain.getAccount(this.walletName)
      return response.total_resources?.cpu_weight
    }

    pushTransaction = async (data:{to:string,action:string, data:any}[]) => {
      const response = await this.sendTransaction(data)
      return response
    }

    transfer = async (amount:number,to:string, memo:string = '') => {
     try{
      await this.sendTransaction([{to: 'eosio.token',action: 'transfer', data: {
        from: this.walletName,
        to,
        quantity: amount.toFixed(8) + " WAX",
        memo
      }}])

      return true
    } catch(e) {
      console.log(e)
      return false
    }
     }


    buyRAM = async (bytes:number,receiver:string) => {
      try{
        await this.sendTransaction([{to: 'eosio',action: 'buyrambytes', data: {
          payer: this.walletName,
          bytes,
          receiver
        }}])
      } catch(e) {
        console.log(e)
      }
    }

    buyRamWax = async (amount:number,receiver:string) => {
      await this.sendTransaction([{to: 'eosio',action: 'buyram', data: {
        payer: this.walletName,
        quant: amount.toFixed(8) + " WAX",
        receiver
      }}])
    }

    stakeCPUorNET = async (CPU:number, NET:number) => {
      await this.sendTransaction([{to: 'eosio',action: 'delegatebw', data: {
        from: this.walletName,
        receiver: this.walletName,
        stake_net_quantity: NET.toFixed(8) + " WAX",
        stake_cpu_quantity: CPU.toFixed(8) + " WAX",
        transfer: false
      }}])
    }

    sellRAM = async (bytes:number) => {
      await this.sendTransaction([{to: 'eosio',action: 'sellram', data: {
        account: this.walletName,
        bytes
      }}])
    }

    unstakeCPUorNET = async (CPU:number,NET:number) => {
      await this.sendTransaction([{to: 'eosio',action: 'undelegatebw', data: {
        from: this.walletName,
        receiver: this.walletName,
        unstake_net_quantity: NET.toFixed(8) + " WAX",
        unstake_cpu_quantity: CPU.toFixed(8) + " WAX",
        transfer: false
      }}])
    }

    deployContract = (path_:string, buildCode:string) => {
      //build(path_,buildCode);
      //this.sendTransaction()
    }

    clearContract = async () => {
      await this.sendTransaction([{to: 'eosio',action: 'setcode', data:{
        account: this.walletName,
        vmtype: 0,
        vmversion: 0,
        code: "",
        memo: ''
      }},{to: 'eosio',action: 'setabi', data:{
        account: this.walletName,
        abi: "",
        memo: ''
      }}])

    }

    createNewWallet = async(keys:any[]) => {
      
    }
}