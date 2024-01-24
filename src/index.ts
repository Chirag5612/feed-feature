require('dotenv').config();
const express = require('express');
const http = require('http');
const bodyParser = require('body-parser');
const cron = require('node-cron');
const cors = require('cors');
const log4js = require('log4js');
const mongoose = require('mongoose');
const morgan = require('morgan');

import indexRouter from './routes/index';
import cronService from './controllers/common/cron';
import userService from './controllers/users/bookingVenue';

const port = process.env.PORT;

if (process.env.nodeEnv !== 'test') {
  log4js.configure({
    appenders: {
      everything: {
        type: 'dateFile',
        filename: './logger/all-the-logs.log',
        maxLogSize: 10485760,
        backups: 3,
        compress: true,
      },
    },
    categories: {
      default: { appenders: ['everything'], level: 'debug' },
    },
  });
}
// Router Prefix Setup
express.application.prefix = express.Router.prefix = function (
  path: any,
  configure: any,
) {
  const router = express.Router();
  this.use(path, router);
  configure(router);
  return router;
};
// prefix Over

const app = express();
app.use(morgan(':method :url :response-time'));

// prefix start

// get data from body
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
// get data from body end

app.set('view engine', 'ejs');
const corsOptions = {
  origin: '*',
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  credentials: true, // access-control-allow-credentials:true
  optionSuccessStatus: 200,
};

app.use(cors(corsOptions)); // Use this after the variable declaration
// start route

mongoose.set('strictQuery', false);

const mongoConnect = async () => {
  await mongoose
    .connect(process.env.DB_URI, {})
    .then(() => {
      console.log('Mongodb Connection ✅');
    })
    .catch((err: any) => {
      console.log(err);
    });
};

if (process.env.nodeEnv !== 'test') {
  mongoConnect();
}

app.get('/', (req: any, res: any) => {
  const version = process.env.APP_VERSION || 'unknown';
  const message = `Hello From Blok! Version: ${version}`;
  res.send(message);
});

app.use('/api', indexRouter);

if (process.env.nodeEnv !== 'test') {
  app.listen(port, async (err: any) => {
    if (err) {
      console.log(err);
      return process.exit(1);
    }
    console.log(`Server is running on ${port}`);
  });
}

if (process.env.nodeEnv !== 'test') {
  // cron job to remove logger logs every 3 days
  cron.schedule('0 0 */3 * *', async () => {
    await cronService.removeLogger();
  });

  // Set Up Canada/Atlantic Timezone in CRONJOB
  cron.schedule('*/30 * * * *', async () => {
    console.log("remainder");
    await userService.sendRemainder();
  }, {
    timezone: "Canada/Atlantic"
  });

}
export default app;
