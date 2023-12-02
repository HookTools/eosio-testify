import { chainInit } from '../chain/chainInit';
export declare class walletInit {
    privateKey: string;
    publicKey: string;
    walletName: string;
    walletPermission: string;
    chain: chainInit;
    constructor(privateKey: string, walletPermission: string, name: string, chain: chainInit);
    /**
   * Sends transactions to the blockchain network.
   * @param data An array of objects containing information about actions to be executed in the transaction.
   *             Each object in the array defines the account, action name, authorization, and action data.
   *             Example: [{ to: 'accountName', action: 'actionName', data: { key: 'value' } }]
   * @returns A Promise resolved with the ID of the sent transaction, or rejected with an error.
   */
    private sendTransaction;
    /**
     * Retrieves the balance of a specific currency associated with the wallet account.
     * @returns A Promise that resolves to the balance information for the specified currency.
     */
    getBalance: () => Promise<string[]>;
    /**
   * Retrieves the total allocated RAM resources for the wallet account.
   * @returns A Promise that resolves to the total allocated RAM in bytes for the account.
   */
    getRam: () => Promise<number | undefined>;
    /**
   * Retrieves the CPU resources allocated to the wallet account.
   * @returns A Promise that resolves to the CPU resources allocated to the account.
   */
    getCPU: () => Promise<string | undefined>;
    /**
     * Initiates the process of pushing transactions to the blockchain network.
     * @param data An array of objects containing information about actions to be executed in the transaction.
     *             Each object in the array defines the recipient, action name, and associated data.
     * @returns A Promise that resolves to the response received after attempting to push the transaction.
     */
    pushTransaction: (data: {
        to: string;
        action: string;
        data: any;
    }[]) => Promise<string>;
    /**
     * Initiates a transfer of a specified amount of tokens to another account.
     * @param amount The amount of tokens to be transferred.
     * @param to The recipient account for the transfer.
     * @param memo An optional memo/message to be included with the transfer (default: '')
     * @returns A Promise that resolves to true if the transfer is successful, false otherwise.
     */
    transfer: (amount: number, to: string, memo?: string) => Promise<boolean>;
    /**
   * Initiates a transaction to purchase RAM in bytes for a specified recipient.
   * @param bytes The amount of RAM to be purchased in bytes.
   * @param receiver The account that will receive the purchased RAM.
   */
    buyRAM: (bytes: number, receiver: string) => Promise<void>;
    /**
     * Initiates a transaction to purchase RAM using a specified amount of WAX tokens for a given recipient.
     * @param amount The amount of WAX tokens to be used for purchasing RAM.
     * @param receiver The account that will receive the purchased RAM.
     */
    buyRamWax: (amount: number, receiver: string) => Promise<void>;
    /**
     * Initiates a transaction to stake CPU and NET resources in the EOSIO network.
     * @param CPU The amount of WAX tokens to be staked for CPU resources.
     * @param NET The amount of WAX tokens to be staked for NET resources.
     */
    stakeCPUorNET: (CPU: number, NET: number) => Promise<void>;
    /**
     * Initiates a transaction to sell or deallocate a specified amount of RAM in bytes.
     * @param bytes The amount of RAM in bytes to be deallocated or sold.
     */
    sellRAM: (bytes: number) => Promise<void>;
    /**
     * Initiates a transaction to unstake previously delegated CPU and NET resources in the EOSIO network.
     * @param CPU The amount of previously staked WAX tokens for CPU resources to be unstaked.
     * @param NET The amount of previously staked WAX tokens for NET resources to be unstaked.
     */
    unstakeCPUorNET: (CPU: number, NET: number) => Promise<void>;
    /**
     * Deploys a smart contract on the EOSIO blockchain.
     * @param abiPath The file path to the ABI (Application Binary Interface) JSON file of the smart contract.
     * @param wasmPath The file path to the compiled WebAssembly (WASM) file of the smart contract.
     * @returns A Promise that resolves after deploying the contract with the provided ABI and WASM files.
     */
    deployContract: (abiPath: string, wasmPath: string) => Promise<string>;
    /**
     * Clears the existing code and ABI for a smart contract on the EOSIO blockchain.
     * This effectively removes the contract code and ABI associated with the specified account.
     */
    cleanContract: () => Promise<void>;
    createNewWallet: (publicKey: string, name: string) => Promise<void>;
}
