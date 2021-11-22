
const { MongoClient } = require("mongodb");
const Db = 'mongodb://127.0.0.1:27017'
const client = new MongoClient(Db, {
  useNewUrlParser: true
});
 
var _db;
 
module.exports = {
  connectToServer: function (callback) {
    client.connect(function (err, db) {
      // Verify we got a good "db" object
      if (db)
      {
        _db = db.db("homes4all");
        console.log("Successfully connected to MongoDB."); 
      }
      return callback(err);
         });
  },
 
  getDb: function () {
    return _db;
  },
};