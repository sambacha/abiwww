/** @file Application */
import * as express from 'express';
require('express-async-errors'); // hack to make express handle exceptions in async functions
import { MongoError } from 'mongodb';
import { connectToDB } from 'infrastructure-mongodb';
import * as compression from 'compression';
import * as cors from 'cors';
import { oEmbedRouter, projectsRouter, healthCheckRouter } from './routers';
import { initTokenAuth } from './middleware';
import { globalErrorHandler } from './global-error-handler';

const app = express();

/**  @app middlewares */
app.use(compression());
app.use(
  cors({
    origin: process.env.ORIGIN,
  }),
);
app.use(express.json({ limit: '50mb' }));
app.use(initTokenAuth());

/**
 * @GET
 * @param routes
 */

const apiPrefix = '/v1';
app.use(apiPrefix, healthCheckRouter);
app.use(apiPrefix, projectsRouter);
app.use(oEmbedRouter);

/**
 * @app globalErrorHandler
 *
 * @summary error handler
 */

app.use(globalErrorHandler);

/**
const pjson = require("../../../package.json");
const bannerBytes = Buffer.from(fs.readFileSync(path.join(__dirname, "./../banner.txt")));

router.get("/", (req, res) => {
    res.set("content-type", "text/html");
    res.write("<div style=\"color: #4a203b\"><pre>");
    res.write(bannerBytes);
    res.write(`</pre>${pjson.name}@${pjson.version}</div>`);
    res.end();
});
*/

connectToDB().then(
  () => {
    const port = parseInt(process.env.PORT, 10) || 80;
    console.log('✅ Successfully connected to mongo database');
    app.listen(port, () => console.log(`✅ Service API is listening on port ${port}`));
  },
  (err: MongoError) => {
    console.error('Unable to start project services API. Could not connect to database:', err);
    process.exit(1);
  },
);
/** @exports serviceAPI *.
