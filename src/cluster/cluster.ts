/* eslint-disable @typescript-eslint/no-unused-vars */
import express from 'express';
import os from 'node:os';
import cluster from 'node:cluster';

const app = express();
const numCpus = os.cpus().length;

app.get('/', (req, res) => {
  for(let i =0 ; i <= 1e8; i++ ){
    // do something here
  }
  res.send(`process id: ${process.pid} . ok...`);

  // kill current running worker process
  // cluster.worker?.kill();
});


if(cluster.isMaster) {
  for(let i = 0 ; i < numCpus ; i++) {
    cluster.fork();
  }

  // leasing cluster worker is kill 
  cluster.on('exit', (worker, code , signal) => {
    console.log(`Worker id: ${worker.process.pid} died`);
    
    // create new worker process instance
    cluster.fork();
  });
}else {
  app.listen(3000, ()=> console.log(`app listening on ${3000} post , process id is ${process.pid}`));
}

