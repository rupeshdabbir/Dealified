/**
 * Created by Nrsimha on 11/19/16.
 */

var r = require('rethinkdb')
var amqp = require('amqplib/callback_api');
var rethinkdb;
var ch;
var q = 'changesQueue';
amqp.connect('amqp://localhost', function(err, conn) {
  conn.createChannel(function(err, _ch) {
    ch = _ch;

     });

});
exports.watch = function(product, database, table){
  r.connect({ host: 'localhost', port: 28015 }, function(err, conn) {
    if (err) throw err;
    r.db(database).table(table).filter(function (row) {
      return row("id").downcase().match("(.*)" + product + "(.*)");
    }).changes().run(conn, function (err, cursor) {

      cursor.each(function(err, row){

        var product = {"product": row.new_val};
        ch.assertQueue(q, {durable: false});
        // Note: on Node 6 Buffer.from(msg) should be used
        ch.sendToQueue(q, new Buffer(JSON.stringify(product)));
        
        console.log(JSON.stringify(JSON.stringify(product)));
      });


      // ch.assertQueue(q, {durable: false});
      // Note: on Node 6 Buffer.from(msg) should be used
      // ch.sendToQueue(q, new Buffer('Hello World!'));
      console.log(" [x] Sent 'Hello World!'");



    });

    // To include price in the future
    // r.db(database).table(table).filter(function(row){
    //   return row("title").downcase().match("(.*)microsoft(.*)").and(row("price").lt(100));
    // })

  });


}
