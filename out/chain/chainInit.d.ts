import { AxiosInstance } from 'axios';
import { AbiBinToJson, AbiJsonToBin, GetAccountsByAuthorizers, GetActivatedProtocolFeatures, GetCode, GetCurrencyBalance, GetCurrencyStats, GetKvTableRows, GetProducers, GetRequiredKeys, GetScheduledTransaction, GetTableByScope, GetTableRows, PushTransaction, PushTransactions, SendTransaction } from './interfaces/chainInterface';
import { AbiBinToJsonResult, AbiJsonToBinResult, GetAbiResult, GetAccountResult, GetAccountsByAuthorizersResult, GetActivatedProtocolFeaturesResult, GetBlockHeaderStateResult, GetBlockInfoResult, GetBlockResult, GetCurrencyStatsResult, GetInfoResult, GetProducersResult, GetRawAbiResult, GetRawCodeAndAbiResult, GetScheduledTransactionsResult, GetTableByScopeResult, GetTableRowsResult } from 'eosjs/dist/eosjs-rpc-interfaces';
export declare class chainInit {
    chainId: string;
    RPC: string;
    instanse: AxiosInstance;
    constructor(chainId?: string, RPC?: string);
    build: (path_: string, buildCode: string) => Promise<void>;
    getAccount: (account_name: string) => Promise<GetAccountResult>;
    getBlock: (block_num_or_id: string) => Promise<GetBlockResult>;
    getBlockInfo: (block_num: number) => Promise<GetBlockInfoResult>;
    getInfo: () => Promise<GetInfoResult>;
    pushTransaction: (data: PushTransaction) => Promise<any>;
    sendTransaction: (data: SendTransaction) => Promise<any>;
    pushTransactions: (data: PushTransactions[]) => Promise<any>;
    getBlockHeaderState: (block_num_or_id: string) => Promise<GetBlockHeaderStateResult>;
    getAbi: (account_name: string) => Promise<GetAbiResult>;
    getCurrencyBalance: (data: GetCurrencyBalance) => Promise<string[]>;
    getCurrencyStats: (data: GetCurrencyStats) => Promise<GetCurrencyStatsResult>;
    getRequiredKeys: (data: GetRequiredKeys) => Promise<any>;
    getProducers: (data: GetProducers) => Promise<GetProducersResult>;
    getRawCodeAndAbi: (account_name: string) => Promise<GetRawCodeAndAbiResult>;
    getScheduledTransaction: (data: GetScheduledTransaction) => Promise<GetScheduledTransactionsResult>;
    getTableByScope: (data: GetTableByScope) => Promise<GetTableByScopeResult>;
    getTableRows: (data: GetTableRows) => Promise<GetTableRowsResult>;
    getKvTableRows: (data: GetKvTableRows) => Promise<any>;
    abiJsonToBin: (data: AbiJsonToBin) => Promise<AbiJsonToBinResult>;
    abiBinToJson: (data: AbiBinToJson) => Promise<AbiBinToJsonResult>;
    getCode: (data: GetCode) => Promise<any>;
    getRawAbi: (account_name: string) => Promise<GetRawAbiResult>;
    getActivatedProtocolFeatures: (data: GetActivatedProtocolFeatures) => Promise<GetActivatedProtocolFeaturesResult>;
    getAccountsByAuthorizers: (data: GetAccountsByAuthorizers) => Promise<GetAccountsByAuthorizersResult>;
}
