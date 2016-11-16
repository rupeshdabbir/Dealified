/**
 * Created by Nrsimha on 11/8/16.
 */
var MongoClient = require('mongodb').MongoClient;
var r = require('rethinkdb')
var db;
var rethinkdb;


var url = "mongodb://localhost:27017/delified";
/**Connects to the MongoDB Database with the provided URL**/
exports.connect = function(callback){
    MongoClient.connect(url, function(err, _db){
        if (err) { throw new Error('Could not connect: '+err);
        }
        db = _db;
        callback(db);
    }); };

var rethinkUrl = "localhost", port="28105";

// exports.rethinkconnect = function(callback){
// r.connect({ host: rethinkUrl, port: port }, function(err, conn) {
//   if(err) throw err;
//
//   rethinkdb = conn;
//   callback(rethinkdb);
// });
// };

/**Returns the collection on the selected database**/
// exports.db = db;
