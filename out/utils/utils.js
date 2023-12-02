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
exports.utils = void 0;
const ecc = require('eosjs-ecc');
exports.utils = {
    generatePrivateKeys: () => __awaiter(void 0, void 0, void 0, function* () {
        // @ts-ignore
        const privateKey = yield ecc.randomKey();
        const publicKey = ecc.privateToPublic(privateKey);
        return {
            privateKey, publicKey
        };
    }),
    generateWalletName: () => {
        let result = '';
        const characters = 'abcdefghijklmnopqrstuvwxyz12345';
        const charactersLength = characters.length;
        let counter = 0;
        while (counter < 12) {
            result += characters.charAt(Math.floor(Math.random() * charactersLength));
            counter += 1;
        }
        return result;
    },
    toDecimal: (amount, num) => {
        return Number(amount.toFixed(num));
    }
};
