import http from 'node:http';

async function noCluster () {
 
  // creating a simple server
  const server = http.createServer((req,res)=> {
    if(req.url === '/'){
      console.log('root route hit');
      res.writeHead(200, {'Content-Type':'text/plain'});
      res.end('Home Page');
    }else if(req.url === '/slow-page') {
      console.log('slow route hit');
      for (let index = 0; index < 6000000000; index++) { } // cpu incentive task 
      res.writeHead(200, {'Content-Type':'text/plain'});
      res.end('Slow Page');
    }
  });

  server.listen(4000, ()=> console.log('server is running on prot 4000'));
}

noCluster();