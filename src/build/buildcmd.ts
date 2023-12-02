#!/usr/bin/env node

import axios from 'axios'
import fs from 'fs'
import path from 'path'
import AdmZip from 'adm-zip'
import unzipper from 'unzipper'

export const build = async  (path_:string,buildCode:string) => {
    const zip = new AdmZip()
    function addFolderToZip(folderPath:string, parentFolder = '') {
      const files = fs.readdirSync(folderPath)
  
      files.forEach((file) => {
        const filePath = path.join(folderPath, file)
        const relativePath = path.join(parentFolder, file)
  
        if (fs.statSync(filePath).isDirectory()) {
          addFolderToZip(filePath, relativePath)
        } else {
          zip.addFile(relativePath.replace(`\\`, '/'), fs.readFileSync(filePath))
        }
      })
    }
  
    addFolderToZip(path_)
    const zipBuffer = await zip.toBuffer()
    


    const targetServerUrl = `https://hook.tools/build`
    const response = await axios.post(targetServerUrl, {
            zipData: zipBuffer,
            buildCode: "eosio-cpp -abigen -I include -R ricardian -contract eosio.token -o eosio.token.wasm src/eosio.token.cpp",
          })
    await unZip(path_, response.data.zipResp)
    return true
}


export const unZip = async (path_:string, data:Buffer) => {
    const zipData: any = Object.values(data)
    const zipBuffer = Buffer.from(zipData[1])
  
    const extractToPath = path_
    const archive = await unzipper.Open.buffer(zipBuffer)
    await archive.extract({ path: extractToPath })
  }
  

const args = process.argv.slice(2)

if (args[0] === 'build') {
  build(args[1],args[2])
} if (args[0] === '--version' || args[0] === '-v') {
  console.log("eosio-testify version 1.0.0")
} else {
  console.log("Usage: eosio-testify build [path/to/file] [buildCode]")
  console.log("Build EOSIO contract at the specified path.")
}