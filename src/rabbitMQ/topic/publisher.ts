import amqp from'amqplib';
const exchangeName = 'topic_exchange';
const routingKey = 'topic';

async function publishTopicMessage(message: string) {
  try {
    const connection = await amqp.connect('amqp://localhost');
    const channel = await connection.createChannel();

    await channel.assertExchange(exchangeName, 'topic', { durable: false });

    await channel.publish(exchangeName, routingKey, Buffer.from(message));
    console.log(`Topic Message sent with routing key '${routingKey}': ${message}`);

    await channel.close();
    await connection.close();
  } catch (error) {
    console.error('Error publishing topic message:', error);
  }
}

// Example usage
publishTopicMessage('Hello Topic Exchange!');
