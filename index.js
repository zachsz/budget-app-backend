const server = require('./server');
const config = require('./src/config');
const {connect} = require('./src/db');

connect()
  .then(() => {
    server.listen(config.port);
  });
