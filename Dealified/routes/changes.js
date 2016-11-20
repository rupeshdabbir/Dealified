/**
 * Created by Nrsimha on 11/19/16.
 */

var r = require('rethinkdb')
var rethinkdb;


exports.watch = function(product, database, table){
  r.connect({ host: 'localhost', port: 28015 }, function(err, conn) {
    if (err) throw err;
    r.db(database).table(table).filter(function (row) {
      return row("title").downcase().match("(.*)" + product + "(.*)");
    }).changes().run(conn, function (err, cursor) {
      cursor.each(console.log);

    });

    // To include price in the future
    // r.db(database).table(table).filter(function(row){
    //   return row("title").downcase().match("(.*)microsoft(.*)").and(row("price").lt(100));
    // })

  });
  
  
}
