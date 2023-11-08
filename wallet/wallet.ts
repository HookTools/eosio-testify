const ecc = require('eosjs-ecc')


export class createWallet {
    privateKey: string
    publicKey: string
    walletName:string
    constructor(privateKey:string,name:string) {
        this.privateKey = privateKey
        this.publicKey = ecc.privateToPublic(privateKey);
        this.walletName = name
    }  
}