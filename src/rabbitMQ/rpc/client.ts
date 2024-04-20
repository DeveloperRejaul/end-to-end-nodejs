/* eslint-disable @typescript-eslint/no-unused-vars */
import express from'express';
import amqp,{ConsumeMessage} from'amqplib';

const app = express();
const port = 4000;

// Connect to RabbitMQ server
async function connectToRabbitMQ() {
  const connection = await amqp.connect('amqp://localhost');
  const channel = await connection.createChannel();
  
  const rpcQueue = 'rpc_queue';
  const responseQueue = await channel.assertQueue('', { exclusive: true });
  
  // Define a closure to capture correlationId
  const handleMessage = (correlationId: string) => (msg: ConsumeMessage | null ) => {
    if (msg?.properties.correlationId === correlationId) {
      console.log(`Result: ${msg.content.toString()}`);
      channel.close();
    }
  };
  
  // Generate a unique correlationId
  const correlationId = generateUuid();
  
  // Listen for responses
  channel.consume(
    responseQueue.queue, 
    handleMessage(correlationId)
    , { noAck: true });
  
  return { channel, responseQueue, correlationId };
}
  

// Send RPC request to add two numbers
async function sendRPCRequest(a: number, b: number) {
  const { channel, responseQueue } = await connectToRabbitMQ();

  const correlationId = generateUuid();
  const numArray = [a, b];

  // Send the RPC request
  channel.sendToQueue('rpc_queue', Buffer.from(JSON.stringify(numArray)), {
    correlationId: correlationId,
    replyTo: responseQueue.queue
  });

  return correlationId; // Return correlationId
}

// Utility function to generate a unique ID
function generateUuid(): string {
  return Math.random().toString() +
         Math.random().toString() +
         Math.random().toString();
}

// Example usage: Send RPC request to add 2 and 3
sendRPCRequest(2, 3)
  .then((correlationId) => {
    // Store correlationId for later use if needed
    console.log(`RPC client sent request with correlation ID: ${correlationId}`);
  })
  .catch((error) => {
    console.error('Error sending RPC request:', error);
  });

app.listen(port, () => {
  console.log(`RPC client is listening on http://localhost:${port}`);

});
