
import fetch from 'node-fetch'
import { TextDecoder, TextEncoder } from 'util'
import { chainInit } from '../chain/chainInit'
const { Api, JsonRpc, RpcError } = require('eosjs')
const { JsSignatureProvider } = require('eosjs/dist/eosjs-jssig')

const ecc = require('eosjs-ecc')


export class createWallet {
    privateKey: string
    publicKey: string
    walletName:string
    walletPermission:string
    chain: chainInit
    constructor(privateKey:string,name:string, chain:chainInit) {
        this.privateKey = privateKey
        this.publicKey = ecc.privateToPublic(privateKey);
        this.walletName = name
        this.chain = chain
    }  

    private sendTransaction = async (data:any[]) => {
        const rpc = new JsonRpc(this.chain.RPC, { fetch })
        const signatureProvider = new JsSignatureProvider([this.privateKey])
      
        const api = new Api({
          rpc,
          signatureProvider,
          textEncoder: new TextEncoder(),
          textDecoder: new TextDecoder(),
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
        
            return `'Transaction ID:', ${result.transaction_id}`
          } catch (error) {
            if (error instanceof RpcError) {
              throw new Error(error!.json.error.what)
            } else {
              throw new Error(`'An error occurred' ${error}`)
            }
          }
          
    }

    getBalance = () => {
      this.chain.get
    }

    getRam = () => {
      awa
    }

    getCPU = () => {

    }

    pushTransaction = (to:string, action:string, data:any) => {
      this.sendTransaction()
    }

    transfer = (amount:number,to:string, memo:string = '') => {
      this.sendTransaction([{to: 'eosio.token',action: 'transfer', data: {
        from: this.walletName,
        to,
        amount: amount.toFixed(8) + " WAX",
        memo
      }}])
    }

    buyRam = (amount:number) => {

    }

    buyRamWax = (amount:number) => {

    }

    stakeCPU = () => {

    }

    sellRam = () => {

    }

    sellCPI = () => {

    }

    deployContract = () => {
      this.sendTransaction(to)
    }

    clearContract = () => {
        this.sendTransaction(to)
    }
}