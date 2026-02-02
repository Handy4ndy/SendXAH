# XAH Sender

A simple TypeScript script to send XAH on the Xahau Ledger using the official [xahau JavaScript library](https://www.npmjs.com/package/xahau).

This tool allows users to securely send XAH by prompting for transaction details and confirming before submission. It's designed for developers and users familiar with the Xahau ecosystem.

## Table of Contents

- [Features](#features)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Usage](#usage)
- [How It Works](#how-it-works)
- [Security Warning](#security-warning)
- [Dependencies](#dependencies)
- [Contributing](#contributing)
- [License](#license)

## Features

- Interactive command-line interface for sending XAH
- Prompts for amount, destination address, and seed phrase
- Transaction summary and confirmation before submission
- Uses the official Xahau JavaScript library for reliable integration
- Supports Xahau mainnet transactions

## Prerequisites

- Node.js (version 18 or higher) - [Download here](https://nodejs.org/)
- npm (comes with Node.js)
- Basic knowledge of XAH and Xahau Ledger - see [Xahau Documentation](https://xahau.network/docs/)

## Installation

1. Clone this repository:
   ```
   git clone https://github.com/yourusername/SendXAH.git
   cd SendXAH
   ```

2. Install dependencies:
   ```
   npm install
   ```

## Usage

Run the script with:
```
npm start
```

The script will interactively prompt you for:

1. **Amount of XAH to send**: Enter the amount in XAH (e.g., 10.5)
2. **Destination address**: The Xahau address to send XAH to (must be a valid Xahau Ledger address)
3. **Your seed phrase**: Your wallet's secret seed (keep this secure!)

After entering the details, the script will display a transaction summary including:
- Source address
- Destination address
- Amount
- Estimated fee

Confirm the transaction to submit it to the Xahau mainnet.

## Example

Here's a sample run of the script (with sensitive information masked for security):

```
C:\Users\Handy\Documents\GitHub\SendXAH>npm start

> xah-sender@1.0.0 start
> ts-node sendXAH.ts

Connected to Xahau network.
Enter the amount of XAH to send: 10
Enter the destination address: rGe24P5aZckhpfsXSsSwRa68pgtaio4yZw
Enter your seed phrase: *******************************

--- Transaction Summary ---
From: r9cRbr7HFoPBfRhP7v9sTjSKTRJoydcTyQ
To: rGe24P5aZckhpfsXSsSwRa68pgtaio4yZw
Amount: 10 XAH
Fee: 0.017841 XAH
Sequence: 823118746
---------------------------
Do you want to submit this transaction? (y/n): y
Transaction submitted.
Result: {
  api_version: 1,
  id: 5,
  result: {
    accepted: true,
    account_sequence_available: 823118747,
    account_sequence_next: 823118747,
    applied: true,
    broadcast: true,
    engine_result: 'tesSUCCESS',
    engine_result_code: 0,
    engine_result_message: 'The transaction was applied. Only final in a validated ledger.',
    kept: true,
    open_ledger_cost: '17841',
    queued: false,
    tx_blob: '1200002100005359220000000024310FCB9A201B0137B9C16140000000009896806840000000000045B17321EDD7BA869CD64F500117AFC4423E694D516857371AD0181BEC5DF0E62E3D6F6CC07440ADAC70BF4528736FE850A37DDAA9F52ADAA134C581381D9FEF652B364E00D2505B37762062E78BEB9AF410915B8EC591E0E526DEE69812B0B735A808A67BAB0681145E7416AD47FD07D07D4529091E1152D96247D4988314ABA521D9DCB3602C15AE7CDA813AA9CA790E8B3D',
    tx_json: {
      Account: 'r9cRbr7HFoPBfRhP7v9sTjSKTRJoydcTyQ',
      Amount: '10000000',
      Destination: 'rGe24P5aZckhpfsXSsSwRa68pgtaio4yZw',
      Fee: '17841',
      Flags: 0,
      LastLedgerSequence: 20429249,
      NetworkID: 21337,
      Sequence: 823118746,
      SigningPubKey: 'EDD7BA869CD64F500117AFC4423E694D516857371AD0181BEC5DF0E62E3D6F6CC0',
      TransactionType: 'Payment',
      TxnSignature: 'ADAC70BF4528736FE850A37DDAA9F52ADAA134C581381D9FEF652B364E00D2505B37762062E78BEB9AF410915B8EC591E0E526DEE69812B0B735A808A67BAB06',
      hash: '3509E559EC5FF28B8471C42BF8B2BB736EBF3773ABBA75CE14A45B710B00C9BD'
    },
    validated_ledger_index: 20429230
  },
  type: 'response'
}
```

This example shows a successful transaction submission. The `engine_result` of `'tesSUCCESS'` indicates the transaction was applied successfully.

## How It Works

This script uses the [xahau JavaScript library](https://www.npmjs.com/package/xahau) to interact with the Xahau Ledger. Here's a high-level overview:

1. **Wallet Connection**: Connects to the Xahau mainnet using a WebSocket connection.
2. **Transaction Preparation**: Creates a [Payment transaction](https://xahau.network/docs/protocol-reference/transactions/transaction-types/payment/) with the provided details.
3. **Signing**: Signs the transaction using your seed phrase.
4. **Submission**: Submits the signed transaction to the ledger.
5. **Confirmation**: Waits for transaction validation and provides the result.

For more details on Xahau transactions, see the [Transaction Types documentation](https://xahau.network/docs/protocol-reference/transactions/transaction-types/) and [Send XAH guide](https://xahau.network/docs/).

## Security Warning

**This script interacts with real XAH on the mainnet. Use at your own risk!**

- Ensure you have sufficient XAH for the transaction amount plus fees (typically around 0.01 XAH).
- Double-check all inputs, especially the destination address and amount.
- Never share your seed phrase with anyone.
- Test with small amounts first.
- For security best practices, refer to the [Xahau Security Best Practices](https://xahau.network/docs/).

## Dependencies

- [xahau](https://www.npmjs.com/package/xahau): Official Xahau JavaScript library for interacting with the Xahau Ledger
- [readline-sync](https://www.npmjs.com/package/readline-sync): Synchronous readline for Node.js, used for secure input masking
- [@types/node](https://www.npmjs.com/package/@types/node): TypeScript type definitions for Node.js
- [ts-node](https://www.npmjs.com/package/ts-node): TypeScript execution and REPL for Node.js

## Contributing

Contributions are welcome! Please:

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

For issues or feature requests, please use the [GitHub Issues](https://github.com/yourusername/SendXAH/issues) page.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

*Built with the [Xahau Ledger](https://xahau.network/)*