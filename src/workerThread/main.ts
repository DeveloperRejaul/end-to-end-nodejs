import {Worker} from 'node:worker_threads';
import express, { Request, Response } from 'express';
import os from 'node:os';


const app = express();
const PORT = 4000;


app.get('/', async (req: Request, res: Response): Promise<void> => {
  res.send('<h1>Hello World<h1/>');
});


// heavy task with out worker thread : run in main thread
app.get('/heavy', async (req: Request, res: Response): Promise<void> => {
  let num = 0;
  for (let i = 1; i <= 10_000_000_000; i++) {
    num = i;
  }
  res.send(`${num}`);
});


// heavy task with worker thread : run in single worker thread
app.get('/heavy2', async (req: Request, res: Response): Promise<void> => {
  
  const worker = new Worker('./worker.js');

  worker.on('message', (data)=> {
    res.status(200).send(`${data}`);
  });
    
  worker.on('error', (data)=> {
    res.status(401).send(`${data}`);
  });
});


// heavy task with malty worker thread : run in malty worker thread
app.get('/heavy3', async (req: Request, res: Response): Promise<void> => {
  try {
    const THREAD_COUNT = os.cpus().length-1;
    const workerPromise = new Promise((resolve, reject) => {
      const worker = new Worker('./worker2.js', {workerData :{ threadCount:THREAD_COUNT}});
      worker.on('message', (data)=> {
        resolve(data);
      });
      
      worker.on('error', (data)=> {
        reject(data);
      });
    });

    const workerPromises = [];
    for (let i = 0; i <THREAD_COUNT; i++) {
      workerPromises.push(workerPromise);
    }

    const resPromisers = await Promise.all(workerPromises);
    const result = resPromisers.reduce((acc, cur) => {
      if ( typeof acc === 'number' && typeof cur === 'number'){
        return acc + cur;
      }
    }, 1);
    res.status(200).send(`${result}`);
  } catch (error) {
    res.status(400).send('something wrong');
  }
  
});

app.listen(PORT, () => console.log(`App listen on port ${PORT}`));

