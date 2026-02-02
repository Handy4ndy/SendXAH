import * as xahau from 'xahau';
import * as readlineSync from 'readline-sync';

function ask(question: string): string {
  return readlineSync.question(question);
}

function askMasked(question: string): string {
  return readlineSync.question(question, { hideEchoBack: true });
}

async function main() {
  try {
    // Connect to Xahau network
    const client = new xahau.Client('wss://xahau.network/');
    await client.connect();
    console.log('Connected to Xahau network.');

    // Step 1: Prompt for amount
    const amountXAH = ask('Enter the amount of XAH to send: ');
    const amountDrops = (parseFloat(amountXAH) * 1000000).toString();

    // Step 2: Prompt for destination
    const destination = ask('Enter the destination address: ');

    // Step 3: Prompt for seed phrase
    const seed = askMasked('Enter your seed phrase: ');

    // Create wallet from seed
    const wallet = xahau.Wallet.fromSeed(seed);

    // Prepare transaction
    const tx: xahau.Payment = {
      TransactionType: 'Payment',
      Account: wallet.address,
      Destination: destination,
      Amount: amountDrops,
    };

    // Autofill transaction (fee, sequence, etc.)
    const prepared = await client.autofill(tx);

    // Summary
    const feeXAH = (parseInt(prepared.Fee!) / 1000000).toFixed(6);
    console.log('\n--- Transaction Summary ---');
    console.log(`From: ${wallet.address}`);
    console.log(`To: ${destination}`);
    console.log(`Amount: ${amountXAH} XAH`);
    console.log(`Fee: ${feeXAH} XAH`);
    console.log(`Sequence: ${prepared.Sequence}`);
    console.log('---------------------------');

    // Confirmation
    const confirm = ask('Do you want to submit this transaction? (y/n): ');
    if (confirm.toLowerCase() !== 'y') {
      console.log('Transaction cancelled.');
      await client.disconnect();
      return;
    }

    // Sign and submit
    const signed = wallet.sign(prepared);
    const result = await client.submit(signed.tx_blob);

    console.log('Transaction submitted.');
    console.log('Result:', result);

    await client.disconnect();
  } catch (error) {
    console.error('Error:', error);
    process.stdin.setRawMode(false);
    process.stdin.pause();
  }
}

main();