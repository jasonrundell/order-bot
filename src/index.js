import 'babel-polyfill';

import config from 'config';
import express from 'express';
import http from 'http';

import log from './modules/log';
import bootstrap from './bootstrap';
import { normalizePort } from './utils';

// import AI  from './modules/ai';
// import Bot from './modules/bot';

const App = express();

App.start = async () => {
  log.info('Starting Server ...');
  const port = normalizePort(config.get('port'));
  App.set('port', port);
  bootstrap(App);
  const server = http.createServer(App);

  server.on('error', (error) => {
    if (error.syscall !== 'listen') throw error;
    log.error(`Failed to start server: ${error}`);
    process.exit(1);
  });

  server.on('listening', () => {
    const address = server.address();
    log.info(`Server listening ${address.address}:${address.port} ✓`);
  });

  server.listen(port);
};

App.start().catch((err) => {
  log.error(err);
});

export default App;
