// with coffeescript 1.7, need to bring in register to have coffeescript compiled on the fly
var trans = require('coffee-script');
if (trans.register) {
  trans.register();
}
server = require("./server.coffee");
config = require("./config");
server.startServer(config, function(){});
