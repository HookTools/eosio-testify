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
Object.defineProperty(exports, "__esModule", { value: true });
exports.createWallet = void 0;
// import fetch from 'node-fetch'
const util_1 = require("util");
const eosjs_1 = require("eosjs");
const eosjs_jssig_1 = require("eosjs/dist/eosjs-jssig");
const ecc = require('eosjs-ecc');
class createWallet {
    constructor(privateKey, walletPermission, name, chain) {
        this.sendTransaction = (data) => __awaiter(this, void 0, void 0, function* () {
            const rpc = new eosjs_1.JsonRpc(this.chain.RPC, { fetch });
            const signatureProvider = new eosjs_jssig_1.JsSignatureProvider([this.privateKey]);
            const api = new eosjs_1.Api({
                rpc,
                signatureProvider,
                textEncoder: new util_1.TextEncoder(),
                // textDecoder: new TextDecoder(),
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
                return `'Transaction ID:', ${result}`;
            }
            catch (error) {
                if (error instanceof eosjs_1.RpcError) {
                    // throw new Error(error?.json.error.what)
                }
                else {
                    throw new Error(`'An error occurred' ${error}`);
                }
            }
        });
        this.getBalance = () => __awaiter(this, void 0, void 0, function* () {
            const response = yield this.chain.getCurrencyBalance({ code: "eosio.token", account: this.walletName, symbol: "WAX" });
            return response[0];
        });
        this.getRam = () => __awaiter(this, void 0, void 0, function* () {
            const response = yield this.chain.getTableRows({
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
            });
            console.log(response);
            return response.data;
        });
        this.getCPU = () => __awaiter(this, void 0, void 0, function* () {
            const response = yield this.chain.getAccount(this.walletName);
            console.log(response);
        });
        this.pushTransaction = (data) => __awaiter(this, void 0, void 0, function* () {
            const response = yield this.sendTransaction(data);
            return response;
        });
        this.transfer = (amount, to, memo = '') => {
            this.sendTransaction([{ to: 'eosio.token', action: 'transfer', data: {
                        from: this.walletName,
                        to,
                        amount: amount.toFixed(8) + " WAX",
                        memo
                    } }]);
        };
        this.buyRAM = (bytes, receiver) => {
            this.sendTransaction([{ to: 'eosio', action: 'buyrambytes', data: {
                        payer: this.walletName,
                        bytes,
                        receiver
                    } }]);
        };
        this.buyRamWax = (amount, receiver) => {
            this.sendTransaction([{ to: 'eosio', action: 'buyram', data: {
                        payer: this.walletName,
                        quant: amount.toFixed(8) + " WAX",
                        receiver
                    } }]);
        };
        this.stakeCPU = () => {
            console.log(123);
            // this.sendTransaction([{to: 'eosio',action: 'buyram', data: {
            //   payer: this.walletName,
            //   quant: amount.toFixed(8) + " WAX",
            //   receiver
            // }}])
        };
        this.sellRAM = () => {
            console.log(123);
            // this.sendTransaction([{to: 'eosio',action: 'buyram', data: {
            //   payer: this.walletName,
            //   quant: amount.toFixed(8) + " WAX",
            //   receiver
            // }}])
        };
        this.sellCPU = () => {
            console.log(123);
            // this.sendTransaction([{to: 'eosio',action: 'buyram', data: {
            //   payer: this.walletName,
            //   quant: amount.toFixed(8) + " WAX",
            //   receiver
            // }}])
        };
        this.deployContract = (path_, buildCode) => {
            console.log(123);
            // this.sendTransaction(to)
        };
        this.clearContract = () => {
            console.log(123);
            // this.sendTransaction(to)
        };
        this.privateKey = privateKey;
        this.publicKey = ecc.privateToPublic(privateKey);
        this.walletName = name;
        this.chain = chain;
        this.walletPermission = walletPermission;
    }
}
exports.createWallet = createWallet;
