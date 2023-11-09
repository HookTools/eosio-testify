
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
    constructor(privateKey:string,walletPermission:string,name:string, chain:chainInit) {
        this.privateKey = privateKey
        this.publicKey = ecc.privateToPublic(privateKey);
        this.walletName = name
        this.chain = chain
        this.walletPermission = walletPermission
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

    getRam = async () => {
      await this.chain.getTableRows({
        code: 'eosio',
        index_position: "1",
        json: true,
        key_type: 'i64',
        limit: 1,
        lower_bound: "",
        reverse: false,
        scope: 'eosio',
        show_payer: false,
        table: 'rammarket',
        upper_bound: ''
      })
    }

    getCPU = async (account:string) => {
      await this.chain.getAccount(account)
    }

    pushTransaction = async (data:{to:string,action:string, data:any}[]) => {
      const response = await this.sendTransaction(data)
      return response
    }

    transfer = (amount:number,to:string, memo:string = '') => {
      this.sendTransaction([{to: 'eosio.token',action: 'transfer', data: {
        from: this.walletName,
        to,
        amount: amount.toFixed(8) + " WAX",
        memo
      }}])
    }

    buyRAM = (bytes:number,receiver:string) => {
      this.sendTransaction([{to: 'eosio',action: 'buyrambytes', data: {
        payer: this.walletName,
        bytes,
        receiver
      }}])
    }

    buyRamWax = (amount:number,receiver:string) => {
      this.sendTransaction([{to: 'eosio',action: 'buyram', data: {
        payer: this.walletName,
        quant: amount.toFixed(8) + " WAX",
        receiver
      }}])
    }

    stakeCPU = () => {
      this.sendTransaction([{to: 'eosio',action: 'buyram', data: {
        payer: this.walletName,
        quant: amount.toFixed(8) + " WAX",
        receiver
      }}])
    }

    sellRAM = () => {
      this.sendTransaction([{to: 'eosio',action: 'buyram', data: {
        payer: this.walletName,
        quant: amount.toFixed(8) + " WAX",
        receiver
      }}])
    }

    sellCPU = () => {
      this.sendTransaction([{to: 'eosio',action: 'buyram', data: {
        payer: this.walletName,
        quant: amount.toFixed(8) + " WAX",
        receiver
      }}])
    }

    deployContract = (path_:string, buildCode:string) => {
      this.sendTransaction(to)
    }

    clearContract = () => {
        this.sendTransaction(to)
    }
}