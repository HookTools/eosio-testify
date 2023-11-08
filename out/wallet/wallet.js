"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createWallet = void 0;
const node_fetch_1 = __importDefault(require("node-fetch"));
const util_1 = require("util");
const { Api, JsonRpc, RpcError } = require('eosjs');
const { JsSignatureProvider } = require('eosjs/dist/eosjs-jssig');
const ecc = require('eosjs-ecc');
class createWallet {
    constructor(privateKey, name, chain) {
        this.sendTransaction = (data) => __awaiter(this, void 0, void 0, function* () {
            const rpc = new JsonRpc(this.chain.RPC, { fetch: node_fetch_1.default });
            const signatureProvider = new JsSignatureProvider([this.privateKey]);
            const api = new Api({
                rpc,
                signatureProvider,
                textEncoder: new util_1.TextEncoder(),
                textDecoder: new util_1.TextDecoder(),
            });
            const actions = data.map(action => ({
                account: action.to,
                name: action.action,
                authorization: [
                    {
                        actor: this.walletName,
                        permission: this.walletPermission,
                    },
                ],
                data: action.data,
            }));
            try {
                const result = yield api.transact({ actions }, {
                    blocksBehind: 3,
                    expireSeconds: 30,
                });
                return `'Transaction ID:', ${result.transaction_id}`;
            }
            catch (error) {
                if (error instanceof RpcError) {
                    throw new Error(error.json.error.what);
                }
                else {
                    throw new Error(`'An error occurred' ${error}`);
                }
            }
        });
        this.getBalance = () => {
            this.chain.get;
        };
        this.getRam = () => {
            awa;
        };
        this.getCPU = () => {
        };
        this.pushTransaction = (to, action, data) => {
            this.sendTransaction();
        };
        this.transfer = (amount, to, memo = '') => {
            this.sendTransaction([{ to: 'eosio.token', action: 'transfer', data: {
                        from: this.walletName,
                        to,
                        amount: amount.toFixed(8) + " WAX",
                        memo
                    } }]);
        };
        this.buyRam = (amount) => {
        };
        this.buyRamWax = (amount) => {
        };
        this.stakeCPU = () => {
        };
        this.sellRam = () => {
        };
        this.sellCPI = () => {
        };
        this.deployContract = () => {
            this.sendTransaction(to);
        };
        this.clearContract = () => {
            this.sendTransaction(to);
        };
        this.privateKey = privateKey;
        this.publicKey = ecc.privateToPublic(privateKey);
        this.walletName = name;
        this.chain = chain;
    }
}
exports.createWallet = createWallet;
