export declare const utils: {
    generatePrivateKeys: () => Promise<{
        privateKey: any;
        publicKey: any;
    }>;
    generateWalletName: () => string;
    toDecimal: (amount: number, num: number) => number;
};
