import axios, { AxiosError, AxiosInstance, AxiosResponse } from 'axios'
import { AbiBinToJson, AbiJsonToBin, GetAccountsByAuthorizers, GetActivatedProtocolFeatures, GetCode, GetCurrencyBalance, GetCurrencyStats, GetKvTableRows, GetProducers, GetRequiredKeys, GetScheduledTransaction, GetTableByScope, GetTableRows, PushTransaction, PushTransactions, SendTransaction } from './interfaces/chainInterface'

export class chainInit {
    chainId:string
    RPC:string
    instanse:AxiosInstance
    
    constructor(chainId = "f16b1833c747c43682f4386fca9cbb327929334a762755ebec17f6f23c9b8a12", RPC ="https://waxtestnet.greymass.com") {
        this.chainId = chainId
        this.RPC = RPC
        this.instanse = axios.create({
            baseURL: RPC,
            timeout: 5000,
            headers: {}          
        })
    }

    getAccount = async (account_name:string) => {
        try{
            const response = await this.instanse.post('/get_account',{
                account_name
            })
            return response.data 
        } catch(e) {
            if (e instanceof AxiosError) {
                return (e.response?.data)
            } else {
                return e
            }
        }
    }

    getBlock = async (block_num_or_id:string) => {
        const response = await this.instanse.post('/get_block',{
            "block_num_or_id": block_num_or_id
            })
        return response.data
    }

    getBlockInfo = async (block_num:number) => {
        const response = await this.instanse.post('/get_block_info',{
            block_num
        })
        return response.data
    }

    getInfo = async () => {
        const response = await this.instanse.post('/get_info')
        return response.data
    }

    pushTransaction = async (data:PushTransaction) => {
        const response = await this.instanse.post('/push_transaction',{...data})
        return response.data
    }

    sendTransaction = async (data:SendTransaction) => {
        const response = await this.instanse.post('/send_transaction',{...data})
        return response.data
    }

    pushTransactions = async (data:PushTransactions[]) => {
        const response = await this.instanse.post('/push_transactions',{...data})
        return response.data
    }

    getBlockHeaderState = async (block_num_or_id:string) => {
        const response = await this.instanse.post('/get_block_header_state',{block_num_or_id})
        return response.data
    }

    getAbi = async (account_name:string) => {
        const response = await this.instanse.post('/get_abi',{
            account_name
        })
        return response.data
    }

    getCurrencyBalance = async (data:GetCurrencyBalance) => {
        const response = await this.instanse.post('/get_currency_balance',{...data})
        return response.data
    }

    getCurrencyStats = async (data:GetCurrencyStats) => {
        const response = await this.instanse.post('/get_currency_stats',{...data})
        return response.data
    }

    getRequiredKeys = async (data:GetRequiredKeys) => {
        const response = await this.instanse.post('/get_required_keys',{...data})
        return response.data
    }

    getProducers = async (data:GetProducers) => {
        const response = await this.instanse.post('/get_producers',{...data})
        return response.data
    }

    getRawCodeAndAbi = async (account_name:string) => {
        const response = await this.instanse.post('/get_raw_code_and_abi',{
            account_name
        })
        return response.data
    }

    getScheduledTransaction = async (data:GetScheduledTransaction) => {
        const response = await this.instanse.post('/get_scheduled_transaction',{...data})
        return response.data
    }

    getTableByScope = async (data:GetTableByScope) => {
        const response = await this.instanse.post('/get_table_by_scope',{...data})
        return response.data
    }

    getTableRows = async (data:GetTableRows) => {
        const response = await this.instanse.post('/get_table_rows',{...data})
        return response.data
    }

    getKvTableRows = async (data:GetKvTableRows) => {
        const response = await this.instanse.post('/get_kv_table_rows',{...data})
        return response.data
    }

    abiJsonToBin = async (data:AbiJsonToBin) => {
        const response = await this.instanse.post('/abi_json_to_bin',{...data})
        return response.data
    }

    abiBinToJson = async (data:AbiBinToJson) => {
        const response = await this.instanse.post('/abi_bin_to_json',{...data})
        return response.data
    }

    getCode = async (data:GetCode) => {
        const response = await this.instanse.post('/get_code',{...data})
        return response.data
    }

    getRawAbi = async (account_name:string) => {
        const response = await this.instanse.post('/get_raw_abi',{
            account_name
        })
        return response.data
    }

    getActivatedProtocolFeatures = async (data:GetActivatedProtocolFeatures) => {
        const response = await this.instanse.post('/get_activated_protocol_features',{...data})
        return response.data
    }

    getAccountsByAuthorizers = async (data:GetAccountsByAuthorizers) => {
        const response = await this.instanse.post('/get_accounts_by_authorizers',{...data})
        return response.data
    }
  }