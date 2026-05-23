/**
 * Use this file to configure your truffle project. It's seeded with some
 * common settings for different networks and features like migrations,
 * compilation, and testing. Uncomment the ones you need or modify
 * them to suit your project as necessary.
 *
 * More information about configuration can be found at:
 *
 * https://trufflesuite.com/docs/truffle/reference/configuration
 *
 * Hands-off deployment with Infura
 * --------------------------------
 *
 * Do you have a complex application that requires lots of transactions to deploy?
 * Use this approach to make deployment a breeze 🏖️:
 *
 * Infura deployment needs a wallet provider (like @truffle/hdwallet-provider)
 * to sign transactions before they're sent to a remote public node.
 * Infura accounts are available for free at 🔍: https://infura.io/register
 *
 * You'll need a mnemonic - the twelve word phrase the wallet uses to generate
 * public/private key pairs. You can store your secrets 🤐 in a .env file.
 * In your project root, run `$ npm install dotenv`.
 * Create .env (which should be .gitignored) and declare your MNEMONIC
 * and Infura PROJECT_ID variables inside.
 * For example, your .env file will have the following structure:
 *
 * MNEMONIC = <Your 12 phrase mnemonic>
 * PROJECT_ID = <Your Infura project id>
 *
 * Deployment with Truffle Dashboard (Recommended for best security practice)
 * --------------------------------------------------------------------------
 *
 * Are you concerned about security and minimizing rekt status 🤔?
 * Use this method for best security:
 *
 * Truffle Dashboard lets you review transactions in detail, and leverages
 * MetaMask for signing, so there's no need to copy-paste your mnemonic.
 * More details can be found at 🔎:
 *
 * https://trufflesuite.com/docs/truffle/getting-started/using-the-truffle-dashboard/
 */

// require('dotenv').config();
// const { MNEMONIC, PROJECT_ID } = process.env;

/// Подключаем необходимую библиотеку для подписи транзакций
const HDWalletProvider = require('@truffle/hdwallet-provider');
// Читаем секретную фразу из файла, который не должен попадать в Git
const fs = require('fs');
const mnemonic = fs.readFileSync(".secret").toString().trim();

module.exports = {
  networks: {
    // Ваша локальная сеть для разработки (оставляем как есть)
    development: {
      host: "127.0.0.1",
      port: 7545,
      network_id: "*"
    },
    
    // 🟢 НОВАЯ СЕТЬ: Hoodi Testnet
    hoodi: {
      provider: () => new HDWalletProvider(
        mnemonic, 
        `https://rpc.hoodi.ethpandaops.io` // Публичный RPC-адрес сети Hoodi [citation:6][citation:8]
      ),
      network_id: 560048,       // ID сети Hoodi [citation:2][citation:8][citation:10]
      gas: 5500000,             // Лимит газа (можно оставить как есть)
      confirmations: 2,         // Ждем 2 подтверждения перед успехом
      timeoutBlocks: 200,       // Таймаут
      skipDryRun: true          // Пропускаем тестовый прогон
    },
    
    // Другие сети (ropsten, goerli) можно удалить или закомментировать
  },
  
  compilers: {
    solc: {
      version: "0.8.20" // Убедитесь, что версия совместима с вашим контрактом
    }
  }
};