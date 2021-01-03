const apostilleLib = require('simple-apostille-v2');

const data = 'Hello World!';
const txHash = 'B6E8E065471F0F77B1714947F14838298D82E1BDB245B2BA413DFF3BB1A204E4';

const apiEndpoint = 'https://sym-test-01.opening-line.jp:3001';

apostilleLib.AuditService.audit(data, txHash, apiEndpoint).then((r) => {
  console.log(r);
}).catch((err) => {
  console.error(err);
});
