const symbolSdk = require('symbol-sdk');
const apostilleLib = require('simple-apostille-v2');

const data = 'Hello World!';
const seed = `hello_${new Date().toLocaleString()}.txt`;

const ownerKey = '3E04C96EBAE99124A1D388B05EBD007AA06CB917E09CA08F5859B3ADC49A148D';
const networkType = symbolSdk.NetworkType.TEST_NET;
const account = symbolSdk.Account.createFromPrivateKey(ownerKey, networkType);

const apiEndpoint = 'https://sym-test-01.opening-line.jp:3001';
const generationHash = '6C1B92391CCB41C96478471C2634C111D9E989DECD66130C0430B5B8D20117CD';
const feeMultiplier = 1000;

const repositoryFactory = new symbolSdk.RepositoryFactoryHttp(
  apiEndpoint,
  { generationHash, networkType }
);

const transactionRepo = repositoryFactory.createTransactionRepository();
const receiptRepo = repositoryFactory.createReceiptRepository();
const listener = repositoryFactory.createListener();

repositoryFactory.getEpochAdjustment().subscribe((adjustment) => {
  const apostilleTx = apostilleLib.ApostilleTransaction.createFromData(
    data,
    apostilleLib.HashingType.Type.sha256,
    seed,
    account,
    networkType,
    generationHash,
    feeMultiplier,
    apiEndpoint,
    adjustment,
  );
  apostilleTx.singedTransactionAndAnnounceType().then((info) => {
    const signedTx = info.signedTransaction;
    console.log(`txHash: ${signedTx.hash}`);
    listener.open().then(() => {
      listener.confirmed(account.address, signedTx.hash).subscribe((x) => {
        console.log(x);
        listener.close();
      }, (err) => {
        console.error(err);
      });

      listener.status(account.address, signedTx.hash).subscribe((x) => {
        console.log(x);
        listener.close();
      }, (err) => {
        console.error(err);
        listener.close();
      });

      transactionRepo.announce(signedTx).subscribe((x) => {
        console.log(x);
      }, (err) => {
        console.error(err);
      });
    });
  });
});
