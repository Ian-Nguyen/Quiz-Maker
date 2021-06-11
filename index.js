var mongoUtil = require("./mongo.js");
var cluster = require("cluster");

if (cluster.isMaster) {
  cluster.fork();

  cluster.on("exit", function (worker, code, signal) {
    cluster.fork();
  });
}

if (cluster.isWorker) {
  mongoUtil.connectToServer(function (err, client) {
    if (err) console.log(err);

    require("./server");
  });
}
