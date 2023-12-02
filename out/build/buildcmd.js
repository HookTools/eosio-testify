#!/usr/bin/env node
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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.unZip = exports.build = void 0;
const axios_1 = __importDefault(require("axios"));
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const adm_zip_1 = __importDefault(require("adm-zip"));
const unzipper_1 = __importDefault(require("unzipper"));
const build = (path_, buildCode) => __awaiter(void 0, void 0, void 0, function* () {
    const zip = new adm_zip_1.default();
    function addFolderToZip(folderPath, parentFolder = '') {
        const files = fs_1.default.readdirSync(folderPath);
        files.forEach((file) => {
            const filePath = path_1.default.join(folderPath, file);
            const relativePath = path_1.default.join(parentFolder, file);
            if (fs_1.default.statSync(filePath).isDirectory()) {
                addFolderToZip(filePath, relativePath);
            }
            else {
                zip.addFile(relativePath.replace(`\\`, '/'), fs_1.default.readFileSync(filePath));
            }
        });
    }
    addFolderToZip(path_);
    const zipBuffer = yield zip.toBuffer();
    const targetServerUrl = `http://localhost:4000/build`;
    const response = yield axios_1.default.post(targetServerUrl, {
        zipData: zipBuffer,
        buildCode: "eosio-cpp -abigen -I include -R ricardian -contract eosio.token -o eosio.token.wasm src/eosio.token.cpp",
    });
    yield (0, exports.unZip)(path_, response.data.zipResp);
    return true;
});
exports.build = build;
const unZip = (path_, data) => __awaiter(void 0, void 0, void 0, function* () {
    const zipData = Object.values(data);
    const zipBuffer = Buffer.from(zipData[1]);
    const extractToPath = path_;
    const archive = yield unzipper_1.default.Open.buffer(zipBuffer);
    yield archive.extract({ path: extractToPath });
});
exports.unZip = unZip;
const args = process.argv.slice(2);
if (args[0] === 'build') {
    (0, exports.build)(args[1], args[2]);
}
if (args[0] === '--version' || args[0] === '-v') {
    console.log("eosio-testify version 1.0.0");
}
else {
    console.log("Usage: eosio-testify build [path/to/file] [buildCode]");
    console.log("Build EOSIO contract at the specified path.");
}
