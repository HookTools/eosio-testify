
const ecc = require('eosjs-ecc');


export const utils = {
    generatePrivateKeys: async () => {
        // @ts-ignore
        const privateKey = await ecc.randomKey()
        const publicKey = ecc.privateToPublic(privateKey);

        return {
            privateKey, publicKey
        } 
    },

    generateWalletName: () => {
        let result = ''
        const characters = 'abcdefghijklmnopqrstuvwxyz12345'
        const charactersLength = characters.length
        let counter = 0
        while (counter < 12) {
          result += characters.charAt(Math.floor(Math.random() * charactersLength))
          counter += 1
        }
        return result
    },

    toDecimal: (amount:number ,num:number) => {
        return Number(amount.toFixed(num))
    }
}