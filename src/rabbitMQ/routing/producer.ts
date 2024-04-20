import express, { Request, Response } from'express';
import amqp from'amqplib';
const app = express();
const port = 3000;


// Connect to RabbitMQ server
async function connectToRabbitMQ() {
  const connection = await amqp.connect('amqp://localhost');
  const channel = await connection.createChannel();
  
  await channel.assertExchange('log-exchange', 'direct');

  return { connection, channel };
}

// Express route to send message to RabbitMQ
app.get('/send', async (req: Request, res: Response) => {
  const { message, routingKey} = req.query;

  try {
    const { channel } = await connectToRabbitMQ();
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    //@ts-ignore
    channel.publish('log-exchange', routingKey, Buffer.from(message));
    console.log(`Message sent to RabbitMQ with routing key ${routingKey}: ${message}`);
    res.send('Message sent successfully');
  } catch (error) {
    console.error('Error sending message to RabbitMQ:', error);
    res.status(500).send('Internal server error');
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
