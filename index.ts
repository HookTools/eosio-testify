import { Api, JsonRpc, RpcError, Serialize } from 'eosjs'
import { chainInit } from './chain/chainInit'
const ecc = require('eosjs-ecc')

const { TextEncoder, TextDecoder } = require('text-encoding')
const { JsSignatureProvider } = require('eosjs/dist/eosjs-jssig')

const fetch = (...args: any[]) =>
  import('node-fetch').then(({ default: fetch }:any) => fetch(...args))

// class newWallet {
//     privateKey:string
//     publicKey:string
//     chain:any
//     rpc:any
//     api:any
//     signatureProvider:any
    
//     constructor(privateKey:string,chain:any) {
//         this.privateKey = privateKey
//         this.publicKey = ecc.privateToPublic(privateKey);
//         console.log(this.publicKey)
//         this.chain = chain
//         const rpc = new JsonRpc(chain.rpc, { fetch });
//         const signatureProvider = new JsSignatureProvider([privateKey]);
//         this.signatureProvider = signatureProvider
//         this.api = new Api({
//             rpc,
//             signatureProvider,
//             textEncoder: new TextEncoder(),
//             textDecoder: new TextDecoder(),
//         });
//     }

//     pushTransaction = (from,to,action, data) => {
//         const transaction = {
//             actions: [
//               {
//                 account: to,
//                 name: action,
//                 authorization: [
//                   {
//                     actor: 'your_sender_account',
//                     permission: 'active',
//                   },
//                 ],
//                 data: { ...data },
//               },
//             ],
//           };

//           (async () => {
//             try {
//               const result = await this.api.transact(transaction, {
//                 blocksBehind: 3,
//                 expireSeconds: 30,
//               });
          
//               console.log('Transaction successful:', result);
//             } catch (error) {
//               if (error instanceof RpcError) {
//                 console.error('Error in RPC call:', error.json);
//               } else {
//                 console.error('An error occurred:', error);
//               }
//             }
//           })();
          
          

//     }
// }


// module.exports = {isWds, newWallet,chainInit}

const chain = new chainInit()
chain.getAccount("eosio").then((data) => console.log(data))