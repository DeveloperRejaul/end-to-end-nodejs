import amqp from'amqplib';

const exchangeName = 'topic_exchange';
const queueName = 'topic_queue';
const routingKeyPattern = 'topic.*';

async function consumeTopicMessages() {
  try {
    const connection = await amqp.connect('amqp://localhost');
    const channel = await connection.createChannel();

    await channel.assertExchange(exchangeName, 'topic', { durable: false });
    const assertQueueResponse = await channel.assertQueue(queueName, { exclusive: true });

    await channel.bindQueue(assertQueueResponse.queue, exchangeName, routingKeyPattern);

    console.log(`Waiting for messages with routing key pattern '${routingKeyPattern}'...`);

    channel.consume(assertQueueResponse.queue, (msg) => {
      if (msg !== null) {
        console.log(`Received topic message with routing key '${msg.fields.routingKey}': ${msg.content.toString()}`);
        channel.ack(msg);
      }
    });
  } catch (error) {
    console.error('Error consuming topic messages:', error);
  }
}

consumeTopicMessages();
