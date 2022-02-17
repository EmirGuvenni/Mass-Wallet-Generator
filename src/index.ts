import fs from 'fs';
import Web3 from 'web3';
import prompts, { PromptObject } from 'prompts';

const questions: PromptObject[] = [
  {
    type: 'number',
    name: 'numberOfWallets',
    message: 'How many wallets do you want to generate?',
    initial: 100,
    min: 1,
  },
  {
    type: 'text',
    name: 'fileName',
    message: 'Enter the output file name',
    initial: 'wallets',
    validate: (value: string) =>
      value.length > 0 || 'Please enter a valid file name',
  },
];

(async () => {
  console.clear();

  const params = await prompts(questions);

  // Connect to the Ethereum network since it doesn't matter which network
  // you're connected to.
  const web3 = new Web3('https://mainnet.infura.io/');

  for (let i = 0; i < params.numberOfWallets; i++) {
    const wallet = web3.eth.accounts.create(web3.utils.randomHex(32));

    fs.appendFileSync(
      `${params.fileName}.txt`,
      `${wallet.address}=${wallet.privateKey}\n`
    );
  }
})();
