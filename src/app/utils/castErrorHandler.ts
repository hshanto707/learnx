import mongoose from "mongoose"
import { TErrorSources, TGenericErrorResponse } from "../interface/error"

export const CastErrorHandler = (err: mongoose.Error.CastError): TGenericErrorResponse => {
  console.log(err);
  
  const errorSources: TErrorSources = [
    {
      path: err.path,
      message: err.message,
    }
  ]

  const statusCode = 400

  return {
    statusCode,
    message: 'Invalid ID',
    errorSources,
  }
}