# Руководство по созданию и развертыванию собственной криптовалюты на Ethereum (Hoodi Testnet)

> **Полное пошаговое руководство для начинающих**  
> От написания смарт-контракта до отправки токенов в кошельке

---

## Содержание

1. [Что мы создаем](#-что-мы-создаем)
2. [Предварительные требования](#-предварительные-требования)
3. [Установка инструментов](#-установка-инструментов)
4. [Создание проекта](#-создание-проекта)
5. [Написание смарт-контракта](#-написание-смарт-контракта)
6. [Настройка развертывания](#-настройка-развертывания)
7. [Компиляция контракта](#-компиляция-контракта)
8. [Подготовка сети Hoodi](#-подготовка-сети-hoodi)
9. [Развертывание токена](#-развертывание-токена)
10. [Импорт токена в кошелек](#-импорт-токена-в-кошелек)
11. [Проверка и отправка токенов](#-проверка-и-отправка-токенов)
12. [Устранение неполадок](#-устранение-неполадок)
13. [Дальнейшие шаги](#-дальнейшие-шаги)
14. [Полезные ссылки](#-полезные-ссылки)

---

## Что мы создаем

Мы создадим **собственную криптовалюту** (ERC-20 токен) на блокчейне Ethereum и развернем её в **бесплатной тестовой сети Hoodi**.

**Что вы получите:**
- Собственный токен с уникальным названием и символом
- Возможность выпускать любое количество токенов
- Возможность отправлять токены другим людям
- Полный контроль над эмиссией

**Что такое Hoodi Testnet:**
- Бесплатная тестовая сеть Ethereum для разработчиков
- Токены не имеют реальной ценности
- Идеально подходит для обучения и тестирования

---

## Предварительные требования

Перед началом убедитесь, что у вас есть:

| Компонент | Назначение | Где взять |
|-----------|------------|-----------|
| **MetaMask** | Кошелек для управления токенами | [metamask.io](https://metamask.io) |
| **Git** | Для установки зависимостей | [git-scm.com](https://git-scm.com) |
| **Node.js v22.x LTS** | Среда выполнения JavaScript | [nodejs.org](https://nodejs.org) |
| **Командная строка** | PowerShell, cmd или терминал | Встроена в ОС |

---

## Установка инструментов

### 1. Установка Node.js

**Windows / macOS / Linux:**

1. Перейдите на [nodejs.org](https://nodejs.org/)
2. Скачайте и установите **Node.js 22 LTS** (или новее)
3. После установки перезапустите терминал

**Проверка установки:**

```bash
node --version   # Должно показать v22.x.x или выше
npm --version    # Должно показать 10.x.x или выше
```

### 2. Установка Git

**Windows:**

1. Скачайте установщик с [git-scm.com](https://git-scm.com)
2. При установке обязательно выберите опцию:  
   `"Git from the command line and also from 3rd-party software"`
3. После установки перезагрузите компьютер

**macOS:**

```bash
brew install git
```

**Linux (Ubuntu/Debian):**

```bash
sudo apt update
sudo apt install git
```

**Проверка установки:**

```bash
git --version   # Должно показать git version 2.x.x
```

### 3. Установка Truffle (глобально)

```bash
npm install -g truffle
```

**Проверка:**

```bash
truffle version   # Должно показать Truffle v5.x.x
```

---

## Создание проекта

### Шаг 1: Создайте папку проекта

```bash
# Перейдите в нужную директорию
cd N:\          # Для Windows (пример)
cd ~/Desktop    # Для macOS/Linux

# Создайте папку проекта
mkdir MyToken
cd MyToken
```

### Шаг 2: Инициализируйте Truffle проект

```bash
truffle init
```

### Шаг 3: Инициализируйте npm и установите зависимости

```bash
# Создайте package.json
npm init -y

# Установите OpenZeppelin (библиотека готовых контрактов)
npm install @openzeppelin/contracts

# Установите HDWalletProvider (для подключения к сетям)
npm install @truffle/hdwallet-provider
```

**Структура проекта после инициализации:**

```
MyToken/
 contracts/           # Папка со смарт-контрактами
    .gitkeep        # Пустой файл-заглушка
 migrations/          # Скрипты для развертывания
    1_initial_migration.js
 test/               # Папка для тестов
 build/              # Скомпилированные файлы (создается автоматически)
 truffle-config.js   # Конфигурация Truffle
 package.json        # Зависимости проекта
```

---

## Написание смарт-контракта

### Шаг 1: Создайте файл контракта

Создайте файл `contracts/Token.sol` и откройте его в любом текстовом редакторе.

### Шаг 2: Напишите код токена

```solidity
// SPDX-License-Identifier: MIT
// Версия Solidity (используем 0.8.20 для совместимости)
pragma solidity ^0.8.20;

// Импортируем стандарт ERC20 из библиотеки OpenZeppelin
import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

// Объявляем контракт MyToken, который наследует все функции ERC20
contract MyToken is ERC20 {

    //  НАСТРОЙТЕ ЭТИ ПАРАМЕТРЫ ПОД СЕБЯ:

    // INITIAL_SUPPLY = общее количество токенов
    // 1000000000 = 1 миллиард токенов
    // (10 ** 18) = 18 знаков после запятой (стандарт для Ethereum)
    uint256 public constant INITIAL_SUPPLY = 1000000000 * (10 ** 18);

    // Конструктор вызывается один раз при развертывании контракта
    // "MY_TOKEN" - название токена
    // "MYT" - символ (тикер) токена
    constructor() ERC20("MY_TOKEN", "MYT") {
        // mint - функция создания токенов
        // msg.sender - адрес, который развернул контракт (это вы)
        // Все токены отправляются создателю
        _mint(msg.sender, INITIAL_SUPPLY);
    }
}
```

### Шаг 3: Настройте количество токенов

Измените строку `INITIAL_SUPPLY` на нужное вам значение:

| Желаемое количество | Код |
|---------------------|-----|
| 1 000 токенов | `1000 * (10 ** 18)` |
| 1 000 000 токенов | `1000000 * (10 ** 18)` |
| 1 000 000 000 токенов | `1000000000 * (10 ** 18)` |
| 10 000 000 000 токенов | `10000000000 * (10 ** 18)` |

> **Пояснение:** `(10 ** 18)` означает 18 нулей. Это нужно, чтобы токен можно было делить на мелкие части (как копейки у рубля).

---

## Настройка развертывания

### Шаг 1: Создайте скрипт миграции

Создайте файл `migrations/2_deploy_contracts.js`:

```javascript
// Запрашиваем артефакт нашего контракта
const MyToken = artifacts.require("MyToken");

// Экспортируем функцию развертывания
module.exports = function(deployer) {
    // Развертываем контракт MyToken в блокчейне
    deployer.deploy(MyToken);
};
```

### Шаг 2: Настройте файл конфигурации Truffle

Откройте `truffle-config.js` и замените его содержимое на:

```javascript
// Подключаем HDWalletProvider для подписи транзакций
const HDWalletProvider = require('@truffle/hdwallet-provider');
const fs = require('fs');

// Пытаемся прочитать сид-фразу из файла .secret
// Если файла нет, используем стандартную тестовую фразу
let mnemonic;
try {
    mnemonic = fs.readFileSync('.secret', 'utf8').toString().trim();
    if (mnemonic && mnemonic.split(' ').length === 12) {
        console.log(' Файл .secret загружен успешно');
    }
} catch (err) {
    console.log('  Файл .secret не найден. Использую стандартную тестовую фразу');
    mnemonic = "test test test test test test test test test test test junk";
}

module.exports = {
    // Настройки сетей
    networks: {
        // Локальная сеть для разработки
        development: {
            host: "127.0.0.1",     // localhost
            port: 7545,             // Порт Ganache
            network_id: "*"         // Любой network ID
        },

        //  Сеть Hoodi Testnet (для развертывания)
        hoodi: {
            provider: () => new HDWalletProvider(
                mnemonic,                            // Сид-фраза от кошелька
                "https://rpc.hoodi.ethpandaops.io"   // RPC адрес сети Hoodi
            ),
            network_id: 560048,      // ID сети Hoodi
            gas: 5500000,            // Лимит газа (максимум комиссии)
            confirmations: 2,        // Ждем 2 подтверждения блока
            timeoutBlocks: 200,      // Таймаут в блоках
            skipDryRun: true         // Пропускаем тестовый прогон
        }
    },

    // Настройки компилятора Solidity
    compilers: {
        solc: {
            version: "0.8.20"       // Версия должна совпадать с контрактом
        }
    }
};
```

### Шаг 3: Создайте файл с сид-фразой (опционально)

Если вы хотите использовать свой кошелек MetaMask, создайте файл `.secret`:

```bash
# В PowerShell/командной строке
echo "ваша_сид_фраза_из_12_слов" > .secret
```

**Как получить сид-фразу из MetaMask:**

1. Откройте MetaMask → иконка аккаунта → «Настройки»
2. «Безопасность и конфиденциальность» → «Показать секретную фразу восстановления»
3. Введите пароль и скопируйте 12 слов

>  **ВАЖНО:** Никогда не публикуйте файл `.secret` в интернете или GitHub!

---

## Компиляция контракта

### Запустите компиляцию

```bash
truffle compile
```

**Ожидаемый вывод при успехе:**

```
Compiling your contracts...
===========================
> Compiling @openzeppelin\contracts\token\ERC20\ERC20.sol
> Compiling @openzeppelin\contracts\token\ERC20\IERC20.sol
> Compiling @openzeppelin\contracts\token\ERC20\extensions\IERC20Metadata.sol
> Compiling @openzeppelin\contracts\utils\Context.sol
> Compiling .\contracts\Token.sol

> Artifacts written to N:\MyToken\build\contracts
> Compiled successfully using:
   - solc: 0.8.20+commit.a1b79de6.Emscripten.clang
```

> **Что произошло:** Truffle преобразовал ваш код Solidity в байт-код, понятный блокчейну, и сохранил его в папке `build/contracts/`.

---

## Подготовка сети Hoodi

### Что такое Hoodi?

Hoodi — это тестовая сеть Ethereum, запущенная в 2025 году. Она заменила старые сети (Ropsten, Goerli) и предназначена для тестирования смарт-контрактов.

**Преимущества:**
- Бесплатная
- Тестовый ETH можно получить из кранов
- Полностью совместима с основной сетью Ethereum

### Шаг 1: Добавьте сеть Hoodi в MetaMask

**Способ 1: Вручную**

1. Откройте расширение MetaMask в браузере
2. Нажмите на выпадающий список сетей (слева от иконки аккаунта)
3. Выберите «Добавить сеть»
4. Нажмите «Добавить сеть вручную»
5. Заполните поля:

| Поле | Значение |
|------|----------|
| Имя сети | `Hoodi Testnet` |
| Новый RPC URL | `https://rpc.hoodi.ethpandaops.io` |
| Chain ID | `560048` |
| Символ валюты | `ETH` |
| URL обозревателя | `https://hoodi.beaconcha.in/` |

6. Нажмите «Сохранить»

**Способ 2: Автоматически через Chainlist**

1. Перейдите на [chainlist.org](https://chainlist.org)
2. Найдите **Hoodi**
3. Нажмите «Connect Wallet» → выберите MetaMask
4. Нажмите «Add to MetaMask» → подтвердите

### Шаг 2: Получите тестовый ETH

В сети Hoodi нужен тестовый ETH для оплаты газа. Получить его можно бесплатно:

**Вариант 1: Hoodi PoW Faucet (рекомендуется)**

1. Перейдите на [holesky-faucet.pk910.de](https://holesky-faucet.pk910.de)  
   *(Этот кран изначально для Holesky, но часто работает и для Hoodi)*
2. Введите адрес вашего кошелька MetaMask
3. Подождите в очереди (обычно 1–5 минут)
4. Получите ~0.5 ETH

**Вариант 2: Google Cloud Web3 Faucet**

1. Перейдите на [cloud.google.com/application/web3/faucet](https://cloud.google.com/application/web3/faucet)
2. Выберите **Hoodi**
3. Введите адрес кошелька
4. Получите 0.1 ETH *(требуется аккаунт Google)*

> После получения ETH баланс должен отобразиться в кошельке MetaMask.

---

## Развертывание токена

### Запуск миграции

Теперь всё готово для развертывания!

```bash
truffle migrate --network hoodi
```

**Ожидаемый вывод при успехе:**

```
  Файл .secret не найден. Использую стандартную тестовую фразу

Compiling your contracts...
===========================
> Everything is up to date, there is nothing to compile.

Starting migrations...
======================
> Network name:    'hoodi'
> Network id:      560048
> Block gas limit: 59941351

2_deploy_contracts.js
=====================

   Deploying 'MyToken'
   -------------------
   > transaction hash:    0x5a52ef1ddcd2fc82120fce6485c1768786adc8269f0ea141d13f9786b0a656d5
   > Blocks: 2            Seconds: 12
   > contract address:    0x1816eeda78540C0BEf142508b7A76E89C916feB0
   > block number:        2869247
   > block timestamp:     1779498780
   > account:             0x73AC80f41944e0Ebb9e3cCbf35F8de5114053E63
   > balance:             0.996689864537303392
   > gas used:            957852
   > gas price:           3.455790104 gwei
   > value sent:          0 ETH
   > total cost:          0.003310135462696608 ETH

   Pausing for 2 confirmations...
   -------------------------------
   > confirmation number: 1 (block: 2869247)
   > confirmation number: 2 (block: 2869248)
   > Saving artifacts
   -------------------------------------
   > Total cost:     0.003310135462696608 ETH

Summary
=======
> Total deployments:   1
> Final cost:          0.003310135462696608 ETH
```

### Что означают эти данные

| Параметр | Значение | Описание |
|----------|----------|----------|
| `contract address` | `0x1816...` | **СОХРАНИТЕ ЭТОТ АДРЕС!** Он нужен для импорта токена |
| `account` | `0x73AC...` | Ваш кошелек в сети Hoodi |
| `total cost` | `0.0033 ETH` | Стоимость развертывания (в тестовом ETH) |

---

## Импорт токена в кошелек

### В MetaMask

1. Переключитесь на сеть **Hoodi** в MetaMask
2. Нажмите **«Импорт токенов»** (синяя кнопка внизу)
3. В поле «Адрес контракта токена» вставьте адрес из вывода выше:

```
0x1816eeda78540C0BEf142508b7A76E89C916feB0
```

4. Остальные поля заполнятся автоматически:
   - Символ токена: `MYT` (или что вы указали)
   - Десятичные знаки: `18`
5. Нажмите **«Добавить пользовательский токен»**
6. Нажмите **«Импортировать токены»**

**Ожидаемый результат:**  
Вы должны увидеть ваш токен с балансом `1 000 000 000 MYT` (или ваше количество).

### Почему баланс может быть 0?

Если вы использовали стандартную тестовую фразу, ваш основной кошелек в MetaMask — это другой аккаунт. Токены принадлежат кошельку `0x73AC...`, а не вашему.

**Решение — импортируйте кошелек разработчика:**

1. MetaMask → иконка профиля → «Импортировать аккаунт»
2. Тип: **«Приватный ключ»**
3. Вставьте ключ:
   ```
   0x5de4111afa1a4b94908f83103eb1f1706367c2e68ca870fc3fb9a804cdab365a
   ```
4. Нажмите «Импорт»

Теперь переключитесь на новый аккаунт — на нем будут все токены.

---

## Проверка и отправка токенов

### Проверка баланса через консоль Truffle

```bash
truffle console --network hoodi
```

Затем в консоли:

```javascript
// Получить экземпляр контракта
const token = await MyToken.deployed();

// Проверить баланс вашего кошелька
// Замените 0xВАШ_АДРЕС на ваш реальный адрес
const balance = await token.balanceOf('0x73AC80f41944e0Ebb9e3cCbf35F8de5114053E63');
console.log('Баланс в минимальных единицах:', balance.toString());
console.log('Баланс в токенах:', Number(balance.toString()) / 10**18);

// Узнать название токена
const name = await token.name();
console.log('Название:', name);

// Узнать символ
const symbol = await token.symbol();
console.log('Символ:', symbol);

// Узнать общее количество токенов в обращении
const totalSupply = await token.totalSupply();
console.log('Total supply:', Number(totalSupply.toString()) / 10**18);

// Выйти из консоли
.exit
```

### Отправка токенов через MetaMask

1. В MetaMask убедитесь, что выбрана сеть **Hoodi**
2. Нажмите на ваш токен `MY_TOKEN` (или `MYT`)
3. Нажмите **«Отправить»**
4. Введите адрес получателя *(должен быть в сети Hoodi)*
5. Укажите количество токенов
6. Нажмите «Далее» → «Подтвердить»

>  **Важно:** У отправителя должен быть тестовый ETH для оплаты газа!

### Отправка токенов через Hoodi Etherscan

1. Откройте [Hoodi Etherscan](https://hoodi.etherscan.io)
2. В поиске введите адрес вашего контракта
3. Перейдите во вкладку **«Write Contract»** (Написать контракт)
4. Нажмите **«Connect to Web3»** → выберите MetaMask
5. Найдите функцию `transfer`
6. Заполните поля:
   - `address (to)`: адрес получателя
   - `uint256 (amount)`: сумма в минимальных единицах (умноженная на 10^18)  
     *Пример: чтобы отправить 100 токенов → `100000000000000000000`*
7. Нажмите **«Write»** → подтвердите в MetaMask

---

## Устранение неполадок

### Ошибка: `Mnemonic invalid or undefined`

**Причина:** Файл `.secret` пустой или содержит неправильный формат.

**Решение:**
```bash
# Используйте стандартную тестовую фразу
echo "test test test test test test test test test test test junk" > .secret
```

---

### Ошибка: `spawn git ENOENT`

**Причина:** Git не установлен или не добавлен в PATH.

**Решение:**
1. Установите Git с [git-scm.com](https://git-scm.com)
2. При установке выберите «Git from the command line»
3. Перезагрузите компьютер

---

### Ошибка: `This version of µWS is not compatible`

**Причина:** Проблемы с библиотекой µWS на Windows.

**Решение:** Это предупреждение, не влияющее на работу. Можно игнорировать.

---

### Ошибка: `Error: ENOENT: no such file or directory, open '.secret'`

**Причина:** Отсутствует файл `.secret`.

**Решение:** Это не критично — Truffle использует тестовую фразу. Если хотите убрать предупреждение, создайте пустой файл:

```bash
echo "" > .secret
```

---

### Баланс токена показывает 0 или прочерк

**Причина:** Токены принадлежат другому кошельку.

**Решение:** Импортируйте кошелек разработчика (см. раздел [«Импорт токена в кошелек»](#-импорт-токена-в-кошелек)).

---

### Недостаточно ETH для газа

**Причина:** На кошельке нет тестового ETH в сети Hoodi.

**Решение:** Получите ETH через кран:
- [Hoodi PoW Faucet](https://holesky-faucet.pk910.de)
- [Google Cloud Web3 Faucet](https://cloud.google.com/application/web3/faucet)

---

### Ошибка: `truffle migrate` зависает или очень медленный

**Причина:** Проблемы с RPC соединением.

**Решение:** Попробуйте другой RPC адрес в `truffle-config.js`:

```javascript
hoodi: {
    provider: () => new HDWalletProvider(
        mnemonic,
        "https://ethereum-hoodi-rpc.publicnode.com"  // Альтернативный RPC
    ),
    // ... остальные настройки
}
```

---

## Дальнейшие шаги

### 1. Добавление функции создания токенов (Mint)

Отредактируйте `contracts/Token.sol`:

```solidity
// Добавьте импорт Ownable для контроля доступа
import "@openzeppelin/contracts/access/Ownable.sol";

// Наследуйте также Ownable
contract MyToken is ERC20, Ownable {

    uint256 public constant INITIAL_SUPPLY = 1000000000 * (10 ** 18);

    constructor() ERC20("MY_TOKEN", "MYT") Ownable(msg.sender) {
        _mint(msg.sender, INITIAL_SUPPLY);
    }

    // Функция создания новых токенов (только владелец)
    function mint(address to, uint256 amount) external onlyOwner {
        _mint(to, amount);
    }
}
```

### 2. Добавление функции сжигания токенов (Burn)

```solidity
// Любой может сжечь свои токены
function burn(uint256 amount) external {
    _burn(msg.sender, amount);
}
```

### 3. Верификация контракта на Etherscan

Чтобы другие могли видеть ваш код:

```bash
# Установите плагин верификации
npm install @truffle/plugin-verify

# Запустите верификацию
truffle run verify MyToken --network hoodi --license MIT
```

Или вручную:

1. Откройте [hoodi.etherscan.io](https://hoodi.etherscan.io)
2. Найдите ваш контракт
3. Нажмите **«Verify and Publish»**
4. Выберите **«Solidity (Single file)»**
5. Вставьте код из `Token.sol`
6. Выберите версию компилятора `0.8.20`
7. Нажмите **«Verify»**

### 4. Создание веб-интерфейса для вашего токена

Используйте библиотеку Web3.js для создания простого сайта:

```html
<!DOCTYPE html>
<html>
<head>
    <title>MyToken - Обзор баланса</title>
    <script src="https://cdn.jsdelivr.net/npm/web3@latest/dist/web3.min.js"></script>
</head>
<body>
    <h1>MyToken (MYT)</h1>
    <p>Адрес контракта: <span id="contract-address">0x1816...</span></p>
    <p>Ваш баланс: <span id="balance">Загрузка...</span></p>

    <script>
        const contractAddress = "0x1816eeda78540C0BEf142508b7A76E89C916feB0";
        const abi = [ /* ABI из build/contracts/Token.json */ ];

        async function getBalance() {
            if (window.ethereum) {
                const web3 = new Web3(window.ethereum);
                await window.ethereum.request({ method: 'eth_requestAccounts' });
                const contract = new web3.eth.Contract(abi, contractAddress);
                const accounts = await web3.eth.getAccounts();
                const balance = await contract.methods.balanceOf(accounts[0]).call();
                document.getElementById('balance').innerText = balance / 10**18;
            }
        }

        getBalance();
    </script>
</body>
</html>
```

### 5. Запуск на основной сети Ethereum (Mainnet)

>  **ОСТОРОЖНО:** Требует реальных ETH и несет финансовые риски!

1. Добавьте конфигурацию mainnet в `truffle-config.js`
2. Убедитесь, что контракт прошел аудит безопасности
3. Развертывайте только после полного тестирования

```javascript
mainnet: {
    provider: () => new HDWalletProvider(
        mnemonic,
        "https://mainnet.infura.io/v3/ВАШ_КЛЮЧ"
    ),
    network_id: 1,
    gas: 5500000,
    gasPrice: 20000000000  // 20 Gwei
}
```

---

## Полезные ссылки

| Ресурс | Назначение | Ссылка |
|--------|------------|--------|
| OpenZeppelin Docs | Документация по ERC-20 | [docs.openzeppelin.com](https://docs.openzeppelin.com) |
| Hoodi Etherscan | Обозреватель тестовой сети | [hoodi.etherscan.io](https://hoodi.etherscan.io) |
| Chainlist | Параметры EVM-сетей | [chainlist.org](https://chainlist.org) |
| Remix IDE | Онлайн-редактор контрактов | [remix.ethereum.org](https://remix.ethereum.org) |
| Solidity Docs | Документация по Solidity | [docs.soliditylang.org](https://docs.soliditylang.org) |
| Truffle Suite | Документация Truffle | [trufflesuite.com](https://trufflesuite.com) |
| MetaMask | Расширение кошелька | [metamask.io](https://metamask.io) |

---

## Финальный чек-лист

Перед запуском проверьте:

- [ ] Node.js 22 LTS установлен (`node --version`)
- [ ] Truffle установлен глобально (`truffle version`)
- [ ] Git установлен и работает (`git --version`)
- [ ] Проект создан (`truffle init`)
- [ ] Зависимости установлены (`npm install`)
- [ ] Контракт `Token.sol` написан
- [ ] Компиляция прошла без ошибок (`truffle compile`)
- [ ] Сеть Hoodi добавлена в MetaMask
- [ ] Тестовый ETH получен (баланс > 0.01)
- [ ] Развертывание выполнено (`truffle migrate --network hoodi`)
- [ ] Адрес контракта сохранен
- [ ] Токен импортирован в MetaMask
- [ ] Отправка токенов работает

---

## Поздравляю!

Вы успешно создали и развернули собственную криптовалюту в тестовой сети Hoodi!

**Что дальше:**

- Экспериментируйте с кодом контракта
- Создайте веб-интерфейс для вашего токена
- Отправьте токены друзьям
- Изучайте более сложные концепции (стейкинг, голосование, DAO)

---

## Лицензия

Это руководство предоставлено в образовательных целях. Используйте на свой страх и риск при работе с реальными средствами в основной сети Ethereum.

---

 Если это руководство было полезным, поставьте звезду на GitHub!

> Вопросы или проблемы? Создайте Issue в репозитории или обратитесь в сообщество.
