const queue = 'hello';
import amqp from'amqplib/callback_api';

amqp.connect('amqp://localhost', function(error0, connection) {
  if (error0) throw error0;
	
  connection.createChannel(function(error1, channel) {
    if (error1) throw error1;
		
    channel.consume(queue, function(msg) {
      console.log(' [x] Received1 %s', msg?.content.toString());
    }, {
      noAck: true // when consume message , this message remove from queue
    });
        
  });
});

