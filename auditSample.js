const apostilleLib = require('simple-apostille-v2');

const data = 'Hello World!';
const txHash = '2853577637590F1614B62FA86885CA2082C011C8C47FD170658451646B52CFD0';

const apiEndpoint = 'https://sym-test-01.opening-line.jp:3001';

apostilleLib.AuditService.audit(data, txHash, apiEndpoint).then((r) => {
  console.log(r);
}).catch((err) => {
  console.error(err);
});
