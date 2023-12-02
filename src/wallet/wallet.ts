
// import fetch from 'node-fetch'
// import { TextDecoder, TextEncoder } from 'util'
import { chainInit } from '../chain/chainInit'
import { Api, JsonRpc, RpcError, Serialize } from 'eosjs'
import { JsSignatureProvider } from 'eosjs/dist/eosjs-jssig'
import fs from 'fs'


const { TextDecoder, TextEncoder } = require('util') //node only
const ecc = require('eosjs-ecc')

export class walletInit {
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

    /**
   * Sends transactions to the blockchain network.
   * @param data An array of objects containing information about actions to be executed in the transaction.
   *             Each object in the array defines the account, action name, authorization, and action data.
   *             Example: [{ to: 'accountName', action: 'actionName', data: { key: 'value' } }]
   * @returns A Promise resolved with the ID of the sent transaction, or rejected with an error.
   */

    private sendTransaction = async (data:{to:string, action:string, data:any}[]) => {
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
        
            return `'Transaction ID:', ${result}`
          } catch (error) {
            if (error instanceof RpcError) {
              throw new Error(String(error))
            } else {
              throw new Error(`'An error occurred' ${error}`)
            }
          }
          
    }
    /**
     * Retrieves the balance of a specific currency associated with the wallet account.
     * @returns A Promise that resolves to the balance information for the specified currency.
     */
    getBalance = async () => {
      const response = await this.chain.getCurrencyBalance({code: "eosio.token", account: this.walletName,symbol: "WAX"})
      return response
    }

    /**
   * Retrieves the total allocated RAM resources for the wallet account.
   * @returns A Promise that resolves to the total allocated RAM in bytes for the account.
   */
    getRam = async () => {
      const response = await this.chain.getAccount(this.walletName)
      return response.total_resources?.ram_bytes
    }

    /**
   * Retrieves the CPU resources allocated to the wallet account.
   * @returns A Promise that resolves to the CPU resources allocated to the account.
   */

    getCPU = async () => {
      const response = await this.chain.getAccount(this.walletName)
      return response.total_resources?.cpu_weight
    }

    /**
     * Initiates the process of pushing transactions to the blockchain network.
     * @param data An array of objects containing information about actions to be executed in the transaction.
     *             Each object in the array defines the recipient, action name, and associated data.
     * @returns A Promise that resolves to the response received after attempting to push the transaction.
     */

    pushTransaction = async (data:{to:string,action:string, data:any}[]) => {
      const response = await this.sendTransaction(data)
      return response
    }

    /**
     * Initiates a transfer of a specified amount of tokens to another account.
     * @param amount The amount of tokens to be transferred.
     * @param to The recipient account for the transfer.
     * @param memo An optional memo/message to be included with the transfer (default: '')
     * @returns A Promise that resolves to true if the transfer is successful, false otherwise.
     */

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


      /**
     * Initiates a transaction to purchase RAM in bytes for a specified recipient.
     * @param bytes The amount of RAM to be purchased in bytes.
     * @param receiver The account that will receive the purchased RAM.
     */
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

    /**
     * Initiates a transaction to purchase RAM using a specified amount of WAX tokens for a given recipient.
     * @param amount The amount of WAX tokens to be used for purchasing RAM.
     * @param receiver The account that will receive the purchased RAM.
     */

    buyRamWax = async (amount:number,receiver:string) => {
      await this.sendTransaction([{to: 'eosio',action: 'buyram', data: {
        payer: this.walletName,
        quant: amount.toFixed(8) + " WAX",
        receiver
      }}])
    }
    /**
     * Initiates a transaction to stake CPU and NET resources in the EOSIO network.
     * @param CPU The amount of WAX tokens to be staked for CPU resources.
     * @param NET The amount of WAX tokens to be staked for NET resources.
     */
    stakeCPUorNET = async (CPU:number, NET:number) => {
      await this.sendTransaction([{to: 'eosio',action: 'delegatebw', data: {
        from: this.walletName,
        receiver: this.walletName,
        stake_net_quantity: NET.toFixed(8) + " WAX",
        stake_cpu_quantity: CPU.toFixed(8) + " WAX",
        transfer: false
      }}])
    }

    /**
     * Initiates a transaction to sell or deallocate a specified amount of RAM in bytes.
     * @param bytes The amount of RAM in bytes to be deallocated or sold.
     */
    sellRAM = async (bytes:number) => {
      await this.sendTransaction([{to: 'eosio',action: 'sellram', data: {
        account: this.walletName,
        bytes
      }}])
    }

    /**
     * Initiates a transaction to unstake previously delegated CPU and NET resources in the EOSIO network.
     * @param CPU The amount of previously staked WAX tokens for CPU resources to be unstaked.
     * @param NET The amount of previously staked WAX tokens for NET resources to be unstaked.
     */
    unstakeCPUorNET = async (CPU:number,NET:number) => {
      await this.sendTransaction([{to: 'eosio',action: 'undelegatebw', data: {
        from: this.walletName,
        receiver: this.walletName,
        unstake_net_quantity: NET.toFixed(8) + " WAX",
        unstake_cpu_quantity: CPU.toFixed(8) + " WAX",
        transfer: false
      }}])
    }

    /**
     * Deploys a smart contract on the EOSIO blockchain.
     * @param abiPath The file path to the ABI (Application Binary Interface) JSON file of the smart contract.
     * @param wasmPath The file path to the compiled WebAssembly (WASM) file of the smart contract.
     * @returns A Promise that resolves after deploying the contract with the provided ABI and WASM files.
     */

    deployContract = async (abiPath:string, wasmPath:string) => {
        const privateKeys = [this.privateKey]
        const signatureProvider = new JsSignatureProvider(privateKeys)
      
        const rpc = new JsonRpc(this.chain.RPC, { fetch })
      
        const api = new Api({
          rpc,
          signatureProvider,
          textDecoder: new TextDecoder(),
          textEncoder: new TextEncoder(),
        })
      
        let wasmHexString: any = await new Promise((resolve, reject) => {
          fs.readFile(wasmPath, (err, data) => {
            if (err) reject(err)
            resolve(data)
          })
        })
      
        wasmHexString = wasmHexString.toString('hex')
        const buffer = new Serialize.SerialBuffer({
          textEncoder: api.textEncoder,
          textDecoder: api.textDecoder,
        })
      
        let abiJSON: any = await new Promise((resolve, reject) => {
          fs.readFile(abiPath, 'utf8', (err, data) => {
            if (err) reject(err)
            resolve(data)
          })
        })
        abiJSON = JSON.parse(abiJSON)
        const abiDefinitions = api.abiTypes.get('abi_def')
      
        abiJSON = abiDefinitions!.fields.reduce(
          (acc, { name: fieldName }) =>
            Object.assign(acc, { [fieldName]: acc[fieldName] || [] }),
          abiJSON
        )
        abiDefinitions!.serialize(buffer, abiJSON)
        let serializedAbiHexString = Buffer.from(buffer.asUint8Array()).toString(
          'hex'
        )

        const data = await this.sendTransaction([{to: 'eosio',action: 'setcode', data:{
          account: this.walletName,
          vmtype: 0,
          vmversion: 0,
          code: wasmHexString,
          memo: ''
        }},{to: 'eosio',action: 'setabi', data:{
          account: this.walletName,
          abi: serializedAbiHexString,
          memo: ''
        }}])
        return data
    }

    /**
     * Clears the existing code and ABI for a smart contract on the EOSIO blockchain.
     * This effectively removes the contract code and ABI associated with the specified account.
     */

    cleanContract = async () => {
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

    createNewWallet = async(publicKey:string,name:string) => {
      // await this.sendTransaction({
      //   to: '',
      //   action: 'lol',
      //   data: {

      //   }
      // })
    }
}