import express from'express';
import amqp from'amqplib';

const app = express();
const port = 3000;

// Connect to RabbitMQ server
async function connectToRabbitMQ() {
  const connection = await amqp.connect('amqp://localhost');
  const channel = await connection.createChannel();

  const rpcQueue = 'rpc_queue';
  await channel.assertQueue(rpcQueue, { durable: false });

  // Consume RPC requests
  channel.consume(rpcQueue, async (msg) => {
    if(msg){
      const numArray = JSON.parse(msg.content.toString());
      const result = addNumbers(numArray[0], numArray[1]);
    
      // Send back the result as a response
      channel.sendToQueue(
        msg.properties.replyTo,
        Buffer.from(result.toString()),
        { correlationId: msg.properties.correlationId }
      );

      // Acknowledge the RPC request
      channel.ack(msg);
    }
  });

  console.log('RPC server is running...');
}

function addNumbers(a: number, b: number) {
  return a + b;
}

// Start the RPC server
connectToRabbitMQ();

app.listen(port, () => {
  console.log(`RPC server is listening on http://localhost:${port}`);
});
