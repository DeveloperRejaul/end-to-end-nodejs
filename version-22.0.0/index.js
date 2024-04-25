// all node update implementations
/**
 * 01. node run in watch mode 
 * 02. node supports mjs in cjs
 * 03. node supports ws
 * 04.  glob and globSync add in fs
 */

const {name} = require("./esm.mjs");
console.log(name);


const WebSocket = require('ws');
// Create a WebSocket server
const wss = new WebSocket.Server({ port: 8080 });

// WebSocket connection handling
wss.on('connection', function connection(ws) {
  console.log('A new client connected');

  // Handle messages from clients
  ws.on('message', function incoming(message) {
    console.log('Received: %s', message);
  });

  // Send a message to the client
  ws.send('Hello, client!');
});



const { glob, globSync } = require('fs');
// Asynchronous pattern matching using glob
glob('*.html', (err, files) => {
    if (err) {
      console.error('Error:', err);
      return;
    }
    
    console.log('Matching files (asynchronous):', files);
  });
  
// Synchronous pattern matching using globSync
const filesSync = globSync('*.js');
console.log('Matching files (synchronous):', filesSync);



