import http from 'node:http';
import cluster from 'node:cluster';
import OS from 'node:os';




export default async function NodeCluster () {
  if(cluster.isMaster){
    console.log(`muster process ${process.pid} is already running`);
    const totalCore = OS.cpus().length;
    for (let index = 0; index < totalCore; index++) {
      cluster.fork(); 
    }
  }else {
    console.log(`Worker ${process.pid} is already running`);
    // creating a simple server
    const server = http.createServer((req,res)=> {
      if(req.url === '/'){
        console.log('root route hit');
        res.writeHead(200, {'Content-Type':'text/plain'});
        res.end('Home Page');
      }else if(req.url === '/slow-page') {
        console.log('slow route hit');
        for (let index = 0; index < 6000000000; index++) {
          
        } // cpu incentive task 
        res.writeHead(200, {'Content-Type':'text/plain'});
        res.end('Slow Page');
      }
    });

    server.listen(4000, ()=> console.log('server is running on prot 4000'));
  }
}