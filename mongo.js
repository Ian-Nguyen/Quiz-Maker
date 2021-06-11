const MongoClient = require("mongodb").MongoClient;
const url =
  "mongodb+srv://admin:D3WT5wx11Sg0@quiz-riruu.mongodb.net/test?retryWrites=true&w=majority";
var _db;
module.exports = {
  connectToServer: function (callback) {
    MongoClient.connect(
      url,
      { useNewUrlParser: true, useUnifiedTopology: true },
      function (err, client) {
        _db = client.db("Quiz");
        return callback(err);
      }
    );
  },

  getDb: function () {
    return _db;
  },
};
