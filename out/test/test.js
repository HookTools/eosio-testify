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
const chainInit_1 = require("../chain/chainInit");
const wallet_1 = require("../wallet/wallet");
describe('Wallet tests', function () {
    const chain = new chainInit_1.chainInit();
    const wallet1 = new wallet_1.createWallet("5JmvsVfJ68S7EaCUAmwAnWwJZG1hh7P3THbGXwDe3q8jKExWssu", 'active', 'eosio', chain);
    it('getBalance', function () {
        return __awaiter(this, void 0, void 0, function* () {
            console.log(yield wallet1.getBalance());
        });
    });
    it('check resources', function () {
        return __awaiter(this, void 0, void 0, function* () {
            console.log(yield wallet1.getRam());
            console.log(yield wallet1.getCPU());
        });
    });
});
