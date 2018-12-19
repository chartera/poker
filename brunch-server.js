const express = require('express');
const app = express();
var path = require('path');

app.use(express.static(__dirname + '/priv/static/'));                                                                

app.get('/', function(req, res) {
    res.sendFile(path.join(__dirname + '/priv/static/templates/poker/index.html'));
});

// Export the module like this for Brunch.                                                                                                                     
module.exports = (config, callback) => {
  // Server config is passed within the `config` variable.                                                                                                     
  app.listen(config.port, function () {
    console.log(`Example app listening on port ${config.port}!`);
    callback();
  });

  // Return the app; it has the `close()` method, which would be ran when                                                                                      
  // Brunch server is terminated                                                                                                                               
  return app;
};
