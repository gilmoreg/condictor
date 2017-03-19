const express = require('express');
const cors = require('cors');
const morgan = require('morgan');

const { router } = require('./routes');
const { logger } = require('./logger');

require('dotenv').config();

const app = express();
let server;

app.use(cors());
app.use(router);
app.use(morgan('common', { stream: logger.stream }));
// Express only serves static assets in production
if (process.env.NODE_ENV === 'production') {
  app.use(express.static('client/build'));
}

function runServer(port = process.env.PORT) {
  return new Promise((resolve, reject) => {
    server = app.listen(port, () => {
      logger.log(`Your app is listening on port ${port}`);
      resolve();
    })
    .on('error', (err) => {
      reject(err);
    });
  });
}

function closeServer() {
  return new Promise((resolve, reject) => {
    logger.log('Closing server');
    server.close((err) => {
      if (err) reject(err);
      resolve();
    });
  });
}

if (require.main === module) {
  runServer().catch(err => logger.error(err));
}

module.exports = { app, runServer, closeServer };
