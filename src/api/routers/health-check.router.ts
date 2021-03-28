import * as express from 'express';

export const healthCheckRouter = express.Router();

healthCheckRouter.get('/healthcheck', (_req, res) => {
  console.log('🟠 Healthcheck Triggered');
  res.status(200).send({
    status: 'ok',
  });
});
