/* eslint-disable @typescript-eslint/no-explicit-any */

import express, { NextFunction, Request, Response } from 'express'
import cors from 'cors';
import { UserRoutes } from './modules/user/user.route';
import router from './routers';

const app = express()
app.use(express.json())
app.use(cors())

app.use('/api/v1', router)

app.use(ErrorCom)

// app.use('/api/users', UserRoutes);

// app.get('/', (req: Request, res: Response) => {
//   res.json({
//     success: true,
//     message: 'Api worked successfully'
//   });
// });

// app.all('*', (req: Request, res: Response) => {
//   res.status(400).json({
//     success: false,
//     message: 'API not found!',
//   });
// })

// app.use((error: any, req: Request, res: Response, next: NextFunction) => {
//   if (error) {
//     res.status(404).json({
//       success: false,
//       message: 'Something went wrong!',
//     })
//   }
// })

export default app;