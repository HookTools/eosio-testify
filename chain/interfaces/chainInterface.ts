export interface PushTransaction {
    signatures?: string[]
    compression?: boolean
    packed_context_free_data?: string
    packed_trx?: string
}

export interface SendTransaction {
    signatures?: string[]
    compression?: boolean
    packed_context_free_data?: string
    packed_trx?: string
}

export interface PushTransactions {
    expiration:string
    ref_block_num: number
    ref_block_prefix: number
    max_net_usage_words:string | number
    max_cpu_usage_ms: string
    delay_sec: number
    context_free_actions:any[]
    actions:any[]
    transaction_extensions?:any[]
}

export interface GetCurrencyBalance {
    code: string
    account: string
    symbol: string
}

export interface GetCurrencyStats {
    code?: string
    symbol?: string
}

export interface GetRequiredKeys {
    transaction: PushTransactions[]
    available_keys: string[]
}

export interface GetProducers {
    limit: string
    lower_bound: string
    json?: boolean
}

export interface GetScheduledTransaction{
    limit?: number
    lower_bound?: string
    json?: boolean
}

export interface GetTableByScope{
    code: string
    table?: string
    lower_bound?:string
    upper_bound?:string
    limit?: number
    reverse?: boolean
    show_payer?: boolean
}

export interface GetTableRows {
    code: string
    table: string
    scope: string
    index_position?: string
    key_type?: string
    encode_type?: string
    lower_bound?:string
    upper_bound?:string
    limit?: number
    reverse?: boolean
    show_payer?: boolean
}

export interface GetKvTableRows{
    code:string
    table: string
    index_name: string

    encode_type?:string
    index_value?:string
    lower_bound?:string
    upper_bound?:string
    limit?: number
    reverse?:boolean
}

export interface AbiJsonToBin {
    code?: string
    action?:string
    args?:any
}

export interface AbiBinToJson {
    code: string
    action:string
    args:any
}

export interface GetCode {
    account_name: string
    code_as_wasm: number
}

export interface GetActivatedProtocolFeatures {
    params: {
        lower_bound?: number
        upper_bound?: number
        limit?: number
        search_by_block_num: boolean
        reverse: boolean
    }
}

export interface GetAccountsByAuthorizers {
    accounts: string[]
    keys: string[]
}