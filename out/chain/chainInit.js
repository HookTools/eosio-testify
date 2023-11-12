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
exports.chainInit = void 0;
const axios_1 = __importStar(require("axios"));
class chainInit {
    constructor(chainId = "f16b1833c747c43682f4386fca9cbb327929334a762755ebec17f6f23c9b8a12", RPC = "https://waxtestnet.greymass.com") {
        this.build = (path_, buildCode) => __awaiter(this, void 0, void 0, function* () {
        });
        this.getAccount = (account_name) => __awaiter(this, void 0, void 0, function* () {
            var _a;
            try {
                const response = yield this.instanse.post('/v1/chain/get_account', {
                    account_name
                });
                console.log(response.data);
                return response.data;
            }
            catch (e) {
                console.log(e);
                if (e instanceof axios_1.AxiosError) {
                    return ((_a = e.response) === null || _a === void 0 ? void 0 : _a.data);
                }
                else {
                    return e;
                }
            }
        });
        this.getBlock = (block_num_or_id) => __awaiter(this, void 0, void 0, function* () {
            const response = yield this.instanse.post('/get_block', {
                "block_num_or_id": block_num_or_id
            });
            return response.data;
        });
        this.getBlockInfo = (block_num) => __awaiter(this, void 0, void 0, function* () {
            const response = yield this.instanse.post('/get_block_info', {
                block_num
            });
            return response.data;
        });
        this.getInfo = () => __awaiter(this, void 0, void 0, function* () {
            const response = yield this.instanse.post('/get_info');
            return response.data;
        });
        this.pushTransaction = (data) => __awaiter(this, void 0, void 0, function* () {
            const response = yield this.instanse.post('/push_transaction', Object.assign({}, data));
            return response.data;
        });
        this.sendTransaction = (data) => __awaiter(this, void 0, void 0, function* () {
            const response = yield this.instanse.post('/send_transaction', Object.assign({}, data));
            return response.data;
        });
        this.pushTransactions = (data) => __awaiter(this, void 0, void 0, function* () {
            const response = yield this.instanse.post('/push_transactions', Object.assign({}, data));
            return response.data;
        });
        this.getBlockHeaderState = (block_num_or_id) => __awaiter(this, void 0, void 0, function* () {
            const response = yield this.instanse.post('/get_block_header_state', { block_num_or_id });
            return response.data;
        });
        this.getAbi = (account_name) => __awaiter(this, void 0, void 0, function* () {
            const response = yield this.instanse.post('/get_abi', {
                account_name
            });
            return response.data;
        });
        this.getCurrencyBalance = (data) => __awaiter(this, void 0, void 0, function* () {
            const response = yield this.instanse.post('/v1/chain/get_currency_balance', Object.assign({}, data));
            return response.data;
        });
        this.getCurrencyStats = (data) => __awaiter(this, void 0, void 0, function* () {
            const response = yield this.instanse.post('/get_currency_stats', Object.assign({}, data));
            return response.data;
        });
        this.getRequiredKeys = (data) => __awaiter(this, void 0, void 0, function* () {
            const response = yield this.instanse.post('/get_required_keys', Object.assign({}, data));
            return response.data;
        });
        this.getProducers = (data) => __awaiter(this, void 0, void 0, function* () {
            const response = yield this.instanse.post('/get_producers', Object.assign({}, data));
            return response.data;
        });
        this.getRawCodeAndAbi = (account_name) => __awaiter(this, void 0, void 0, function* () {
            const response = yield this.instanse.post('/get_raw_code_and_abi', {
                account_name
            });
            return response.data;
        });
        this.getScheduledTransaction = (data) => __awaiter(this, void 0, void 0, function* () {
            const response = yield this.instanse.post('/get_scheduled_transaction', Object.assign({}, data));
            return response.data;
        });
        this.getTableByScope = (data) => __awaiter(this, void 0, void 0, function* () {
            const response = yield this.instanse.post('/get_table_by_scope', Object.assign({}, data));
            return response.data;
        });
        this.getTableRows = (data) => __awaiter(this, void 0, void 0, function* () {
            const response = yield this.instanse.post('/get_table_rows', Object.assign({}, data));
            return response.data;
        });
        this.getKvTableRows = (data) => __awaiter(this, void 0, void 0, function* () {
            const response = yield this.instanse.post('/get_kv_table_rows', Object.assign({}, data));
            return response.data;
        });
        this.abiJsonToBin = (data) => __awaiter(this, void 0, void 0, function* () {
            const response = yield this.instanse.post('/abi_json_to_bin', Object.assign({}, data));
            return response.data;
        });
        this.abiBinToJson = (data) => __awaiter(this, void 0, void 0, function* () {
            const response = yield this.instanse.post('/abi_bin_to_json', Object.assign({}, data));
            return response.data;
        });
        this.getCode = (data) => __awaiter(this, void 0, void 0, function* () {
            const response = yield this.instanse.post('/get_code', Object.assign({}, data));
            return response.data;
        });
        this.getRawAbi = (account_name) => __awaiter(this, void 0, void 0, function* () {
            const response = yield this.instanse.post('/get_raw_abi', {
                account_name
            });
            return response.data;
        });
        this.getActivatedProtocolFeatures = (data) => __awaiter(this, void 0, void 0, function* () {
            const response = yield this.instanse.post('/get_activated_protocol_features', Object.assign({}, data));
            return response.data;
        });
        this.getAccountsByAuthorizers = (data) => __awaiter(this, void 0, void 0, function* () {
            const response = yield this.instanse.post('/get_accounts_by_authorizers', Object.assign({}, data));
            return response.data;
        });
        this.chainId = chainId;
        this.RPC = RPC;
        this.instanse = axios_1.default.create({
            baseURL: RPC,
            timeout: 5000,
            headers: {}
        });
    }
}
exports.chainInit = chainInit;
