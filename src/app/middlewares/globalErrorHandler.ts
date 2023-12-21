/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */

import { ErrorRequestHandler } from 'express'
import { TErrorSources } from '../interface/error'
import { ZodError } from 'zod'
import { ZodErrorHandler } from '../utils/zodErrorHandler'
import { ValidationErrorHandler } from '../utils/validationErrorHandler'
import { CastErrorHandler } from '../utils/castErrorHandler'
import { DuplicateErrorHandler } from '../utils/duplicateErrorHandler'
import ErrorComposer from '../utils/errorComposer'
import config from '../config'

export const globalErrorHandler: ErrorRequestHandler = (err, req, res, next) => {
  let statusCode = 500
  let message = 'Something went wrong!'
  let errorSources: TErrorSources = [
    {
      path: '',
      message: 'Something went wrong',
    },
  ]

  if (err instanceof ZodError) {
    const simplifiedError = ZodErrorHandler(err)
    statusCode = simplifiedError?.statusCode
    message = simplifiedError?.message
    errorSources = simplifiedError?.errorSources
  } else if (err?.name === 'ValidationError') {
    const simplifiedError = ValidationErrorHandler(err)
    statusCode = simplifiedError?.statusCode
    message = simplifiedError?.message
    errorSources = simplifiedError?.errorSources
  } else if (err?.name === 'CastError') {
    const simplifiedError = CastErrorHandler(err)
    statusCode = simplifiedError?.statusCode
    message = simplifiedError?.message
    errorSources = simplifiedError?.errorSources
  } else if (err?.code === 11000) {
    const simplifiedError = DuplicateErrorHandler(err)
    statusCode = simplifiedError?.statusCode
    message = simplifiedError?.message
    errorSources = simplifiedError?.errorSources
  } else if (err instanceof ErrorComposer) {
    statusCode = err?.statusCode
    message = err.message
    errorSources = [
      {
        path: '',
        message: err?.message,
      },
    ]
  } else if (err instanceof Error) {
    message = err.message
    errorSources = [
      {
        path: '',
        message: err?.message,
      },
    ]
  }

  return res.status(statusCode).json({
    success: false,
    message,
    errorSources,
    err,
    stack: config.NODE_ENV === 'development' ? err?.stack : null,
  })
}
