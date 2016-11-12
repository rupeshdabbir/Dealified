/**
 * Created by Nrsimha on 11/8/16.
 */
var MongoClient = require('mongodb').MongoClient;
var db;


var url = "mongodb://localhost:27017/delified";
/**Connects to the MongoDB Database with the provided URL**/
exports.connect = function(callback){
    MongoClient.connect(url, function(err, _db){
        if (err) { throw new Error('Could not connect: '+err);
        }
        db = _db;
        callback(db);
    }); };


/**Returns the collection on the selected database**/
// exports.db = db;
