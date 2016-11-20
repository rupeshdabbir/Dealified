/**
 * Created by Nrsimha on 11/20/16.
 */
var amqp = require('amqplib/callback_api');
var q = 'changesQueue';
amqp.connect('amqp://localhost', function(err, conn) {
  conn.createChannel(function(err, ch) {


    ch.assertQueue(q, {durable: false});

    console.log(" [*] Waiting for messages in %s. To exit press CTRL+C", q);
    ch.consume(q, function(msg) {
      console.log(" [x] Received %s", msg.content
      );
    }, {noAck: true});
  });
});
