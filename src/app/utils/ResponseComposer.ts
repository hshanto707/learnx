import { Response } from 'express'

type TResponse<T> = {
  statusCode: number
  success: boolean
  message?: string
  page?: number
  limit?: number
  data: T
}

export const ResponseComposer = <T>(res: Response, data: TResponse<T>) => {
  res.status(data?.statusCode).json({
    meta: {
      statusCode: data.statusCode,
      success: data.success,
      message: data.message,
      page: data.page,
      limit: data.limit,
    },
    data: data.data,
  })
}
