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
exports.walletInit = void 0;
const eosjs_1 = require("eosjs");
const eosjs_jssig_1 = require("eosjs/dist/eosjs-jssig");
const fs_1 = __importDefault(require("fs"));
const { TextDecoder, TextEncoder } = require('util'); //node only
const ecc = require('eosjs-ecc');
class walletInit {
    constructor(privateKey, walletPermission, name, chain) {
        /**
       * Sends transactions to the blockchain network.
       * @param data An array of objects containing information about actions to be executed in the transaction.
       *             Each object in the array defines the account, action name, authorization, and action data.
       *             Example: [{ to: 'accountName', action: 'actionName', data: { key: 'value' } }]
       * @returns A Promise resolved with the ID of the sent transaction, or rejected with an error.
       */
        this.sendTransaction = (data) => __awaiter(this, void 0, void 0, function* () {
            const rpc = new eosjs_1.JsonRpc(this.chain.RPC, { fetch });
            const signatureProvider = new eosjs_jssig_1.JsSignatureProvider([this.privateKey]);
            const api = new eosjs_1.Api({
                rpc,
                signatureProvider,
                textEncoder: new TextEncoder(),
                textDecoder: new TextDecoder(),
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
                    throw new Error(String(error));
                }
                else {
                    throw new Error(`'An error occurred' ${error}`);
                }
            }
        });
        /**
         * Retrieves the balance of a specific currency associated with the wallet account.
         * @returns A Promise that resolves to the balance information for the specified currency.
         */
        this.getBalance = () => __awaiter(this, void 0, void 0, function* () {
            const response = yield this.chain.getCurrencyBalance({ code: "eosio.token", account: this.walletName, symbol: "WAX" });
            return response;
        });
        /**
       * Retrieves the total allocated RAM resources for the wallet account.
       * @returns A Promise that resolves to the total allocated RAM in bytes for the account.
       */
        this.getRam = () => __awaiter(this, void 0, void 0, function* () {
            var _a;
            const response = yield this.chain.getAccount(this.walletName);
            return (_a = response.total_resources) === null || _a === void 0 ? void 0 : _a.ram_bytes;
        });
        /**
       * Retrieves the CPU resources allocated to the wallet account.
       * @returns A Promise that resolves to the CPU resources allocated to the account.
       */
        this.getCPU = () => __awaiter(this, void 0, void 0, function* () {
            var _b;
            const response = yield this.chain.getAccount(this.walletName);
            return (_b = response.total_resources) === null || _b === void 0 ? void 0 : _b.cpu_weight;
        });
        /**
         * Initiates the process of pushing transactions to the blockchain network.
         * @param data An array of objects containing information about actions to be executed in the transaction.
         *             Each object in the array defines the recipient, action name, and associated data.
         * @returns A Promise that resolves to the response received after attempting to push the transaction.
         */
        this.pushTransaction = (data) => __awaiter(this, void 0, void 0, function* () {
            const response = yield this.sendTransaction(data);
            return response;
        });
        /**
         * Initiates a transfer of a specified amount of tokens to another account.
         * @param amount The amount of tokens to be transferred.
         * @param to The recipient account for the transfer.
         * @param memo An optional memo/message to be included with the transfer (default: '')
         * @returns A Promise that resolves to true if the transfer is successful, false otherwise.
         */
        this.transfer = (amount, to, memo = '') => __awaiter(this, void 0, void 0, function* () {
            try {
                yield this.sendTransaction([{ to: 'eosio.token', action: 'transfer', data: {
                            from: this.walletName,
                            to,
                            quantity: amount.toFixed(8) + " WAX",
                            memo
                        } }]);
                return true;
            }
            catch (e) {
                console.log(e);
                return false;
            }
        });
        /**
       * Initiates a transaction to purchase RAM in bytes for a specified recipient.
       * @param bytes The amount of RAM to be purchased in bytes.
       * @param receiver The account that will receive the purchased RAM.
       */
        this.buyRAM = (bytes, receiver) => __awaiter(this, void 0, void 0, function* () {
            try {
                yield this.sendTransaction([{ to: 'eosio', action: 'buyrambytes', data: {
                            payer: this.walletName,
                            bytes,
                            receiver
                        } }]);
            }
            catch (e) {
                console.log(e);
            }
        });
        /**
         * Initiates a transaction to purchase RAM using a specified amount of WAX tokens for a given recipient.
         * @param amount The amount of WAX tokens to be used for purchasing RAM.
         * @param receiver The account that will receive the purchased RAM.
         */
        this.buyRamWax = (amount, receiver) => __awaiter(this, void 0, void 0, function* () {
            yield this.sendTransaction([{ to: 'eosio', action: 'buyram', data: {
                        payer: this.walletName,
                        quant: amount.toFixed(8) + " WAX",
                        receiver
                    } }]);
        });
        /**
         * Initiates a transaction to stake CPU and NET resources in the EOSIO network.
         * @param CPU The amount of WAX tokens to be staked for CPU resources.
         * @param NET The amount of WAX tokens to be staked for NET resources.
         */
        this.stakeCPUorNET = (CPU, NET) => __awaiter(this, void 0, void 0, function* () {
            yield this.sendTransaction([{ to: 'eosio', action: 'delegatebw', data: {
                        from: this.walletName,
                        receiver: this.walletName,
                        stake_net_quantity: NET.toFixed(8) + " WAX",
                        stake_cpu_quantity: CPU.toFixed(8) + " WAX",
                        transfer: false
                    } }]);
        });
        /**
         * Initiates a transaction to sell or deallocate a specified amount of RAM in bytes.
         * @param bytes The amount of RAM in bytes to be deallocated or sold.
         */
        this.sellRAM = (bytes) => __awaiter(this, void 0, void 0, function* () {
            yield this.sendTransaction([{ to: 'eosio', action: 'sellram', data: {
                        account: this.walletName,
                        bytes
                    } }]);
        });
        /**
         * Initiates a transaction to unstake previously delegated CPU and NET resources in the EOSIO network.
         * @param CPU The amount of previously staked WAX tokens for CPU resources to be unstaked.
         * @param NET The amount of previously staked WAX tokens for NET resources to be unstaked.
         */
        this.unstakeCPUorNET = (CPU, NET) => __awaiter(this, void 0, void 0, function* () {
            yield this.sendTransaction([{ to: 'eosio', action: 'undelegatebw', data: {
                        from: this.walletName,
                        receiver: this.walletName,
                        unstake_net_quantity: NET.toFixed(8) + " WAX",
                        unstake_cpu_quantity: CPU.toFixed(8) + " WAX",
                        transfer: false
                    } }]);
        });
        /**
         * Deploys a smart contract on the EOSIO blockchain.
         * @param abiPath The file path to the ABI (Application Binary Interface) JSON file of the smart contract.
         * @param wasmPath The file path to the compiled WebAssembly (WASM) file of the smart contract.
         * @returns A Promise that resolves after deploying the contract with the provided ABI and WASM files.
         */
        this.deployContract = (abiPath, wasmPath) => __awaiter(this, void 0, void 0, function* () {
            const privateKeys = [this.privateKey];
            const signatureProvider = new eosjs_jssig_1.JsSignatureProvider(privateKeys);
            const rpc = new eosjs_1.JsonRpc(this.chain.RPC, { fetch });
            const api = new eosjs_1.Api({
                rpc,
                signatureProvider,
                textDecoder: new TextDecoder(),
                textEncoder: new TextEncoder(),
            });
            let wasmHexString = yield new Promise((resolve, reject) => {
                fs_1.default.readFile(wasmPath, (err, data) => {
                    if (err)
                        reject(err);
                    resolve(data);
                });
            });
            wasmHexString = wasmHexString.toString('hex');
            const buffer = new eosjs_1.Serialize.SerialBuffer({
                textEncoder: api.textEncoder,
                textDecoder: api.textDecoder,
            });
            let abiJSON = yield new Promise((resolve, reject) => {
                fs_1.default.readFile(abiPath, 'utf8', (err, data) => {
                    if (err)
                        reject(err);
                    resolve(data);
                });
            });
            abiJSON = JSON.parse(abiJSON);
            const abiDefinitions = api.abiTypes.get('abi_def');
            abiJSON = abiDefinitions.fields.reduce((acc, { name: fieldName }) => Object.assign(acc, { [fieldName]: acc[fieldName] || [] }), abiJSON);
            abiDefinitions.serialize(buffer, abiJSON);
            let serializedAbiHexString = Buffer.from(buffer.asUint8Array()).toString('hex');
            const data = yield this.sendTransaction([{ to: 'eosio', action: 'setcode', data: {
                        account: this.walletName,
                        vmtype: 0,
                        vmversion: 0,
                        code: wasmHexString,
                        memo: ''
                    } }, { to: 'eosio', action: 'setabi', data: {
                        account: this.walletName,
                        abi: serializedAbiHexString,
                        memo: ''
                    } }]);
            return data;
        });
        /**
         * Clears the existing code and ABI for a smart contract on the EOSIO blockchain.
         * This effectively removes the contract code and ABI associated with the specified account.
         */
        this.cleanContract = () => __awaiter(this, void 0, void 0, function* () {
            yield this.sendTransaction([{ to: 'eosio', action: 'setcode', data: {
                        account: this.walletName,
                        vmtype: 0,
                        vmversion: 0,
                        code: "",
                        memo: ''
                    } }, { to: 'eosio', action: 'setabi', data: {
                        account: this.walletName,
                        abi: "",
                        memo: ''
                    } }]);
        });
        this.createNewWallet = (publicKey, name) => __awaiter(this, void 0, void 0, function* () {
            // await this.sendTransaction({
            //   to: '',
            //   action: 'lol',
            //   data: {
            //   }
            // })
        });
        this.privateKey = privateKey;
        this.publicKey = ecc.privateToPublic(privateKey);
        this.walletName = name;
        this.chain = chain;
        this.walletPermission = walletPermission;
    }
}
exports.walletInit = walletInit;
