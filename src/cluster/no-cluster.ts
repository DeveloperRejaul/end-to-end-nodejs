import express from 'express';
const app = express();

app.get('/', (req, res) => {
  for(let i =0 ; i <= 1e8; i++ ){
    // do something here
  }
  res.send(`process id: ${process.pid} . ok...`);
});


app.listen(3000, ()=> console.log(`app listening on ${3000} post , process id is ${process.pid}`));
