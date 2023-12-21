/* eslint-disable @typescript-eslint/no-explicit-any */

import express, { Application } from 'express'
import cors from 'cors';
import router from './routers';
import { globalErrorHandler } from './middlewares/globalErrorHandler';
import { notFound } from './middlewares/notFound';

const app: Application = express()

app.use(express.json())

app.use(cors())

app.use('/api/v1', router)

app.use(globalErrorHandler)
app.use(notFound)

export default app;