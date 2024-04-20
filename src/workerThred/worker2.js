/* eslint-disable no-undef */
/* eslint-disable @typescript-eslint/no-var-requires */
const {parentPort, workerData } = require('node:worker_threads');
let num = 0;
for (let i = 1; i <= 10_000_000_000 / workerData.threadCount; i++) {
  num= i;
}
parentPort?.postMessage(num);
