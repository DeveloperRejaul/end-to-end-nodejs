/* eslint-disable no-undef */
import amqp from'amqplib/callback_api';
var queue = 'hello';

amqp.connect('amqp://localhost', function(error0, connection) {
  if (error0) throw error0;
	
  connection.createChannel(function(error1, channel) {
    if (error1) {
      throw error1;
    }
    var msg = 'Hello world';

    channel.assertQueue(queue, 
      {
        durable: false // when restart server message delete form queue
      });

    channel.sendToQueue(queue, Buffer.from(msg));
    console.log(' [x] Sent %s', msg);
  });
});