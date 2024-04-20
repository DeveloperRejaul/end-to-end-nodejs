import amqp from'amqplib';

// Connect to RabbitMQ server
async function consumeMessages() {

  try {
    const connection = await amqp.connect('amqp://localhost');
    const channel = await connection.createChannel();

    await channel.assertExchange('log-exchange', 'direct');

    const q = await channel.assertQueue('infoQueue');

    // Bind the queue to the exchange with a specific routing key
    await channel.bindQueue(q.queue, 'log-exchange', 'Info');

    console.log('Waiting for messages from queue infoQueue...');

    // Consume messages from the queue
    channel.consume('infoQueue', (msg) => {
      if (msg !== null) {
        console.log(`Routing Key:"Info" -  Received message: ${msg.content.toString()}`);
        // Acknowledge the message
        channel.ack(msg);
      }
    });

  } catch (error) {
    console.log(error);
  }
  
}

consumeMessages();
