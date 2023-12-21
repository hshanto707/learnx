/* eslint-disable @typescript-eslint/no-explicit-any */

import { TErrorSources, TGenericErrorResponse } from '../interface/error'

export const DuplicateErrorHandler = (err: any): TGenericErrorResponse => {
  const match = err.message.match(/"([^"]*)"/)

  const extractMessage = match && match[1]

  const errorSources: TErrorSources = [
    {
      path: '',
      message: `${extractMessage} is already exists`,
    },
  ]

  const statusCode = 400

  return {
    statusCode,
    message: 'Invalid ID',
    errorSources,
  }
}
