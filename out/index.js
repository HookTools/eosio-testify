"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const chainInit_1 = require("./chain/chainInit");
const ecc = require('eosjs-ecc');
const { TextEncoder, TextDecoder } = require('text-encoding');
const { JsSignatureProvider } = require('eosjs/dist/eosjs-jssig');
const fetch = (...args) => Promise.resolve().then(() => __importStar(require('node-fetch'))).then(({ default: fetch }) => fetch(...args));
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
const chain = new chainInit_1.chainInit();
chain.getAccount("eosio").then((data) => console.log(data));
