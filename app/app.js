import express from 'express';
import morgan from 'morgan';

import { config } from '../config/index.js';
import { router } from './router/index.js';


class Application {
  /// Application
  static app = express()
    .use(express.json({ limit: '50mb' }))
    .use(express.urlencoded({ extended: true }))
    .use(morgan('dev'))
    .use('/api', router)



  /// Start
  static start = async (port) => {
    process.on('uncaughtException', (err) => console.error('Top-Level exception', err, err.stack));

    return new Promise((resolve, reject) => {
      this.app.listen(port, async (err) => {
        if (err) {
          console.error(err);
          reject(err);
        }
        console.log(`Nutrition Master API listening on port: ${port}`);

        resolve();
      });
    });
  };
}

(async () => {
  // If invoked directly from the command line...
    await Application.start(config.port || 5300);
})();

export { Application };

