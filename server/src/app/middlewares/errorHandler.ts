/* eslint-disable @typescript-eslint/no-unused-vars */
import { Request, Response, NextFunction, ErrorRequestHandler } from 'express';

function errorHandler(
  err: ErrorRequestHandler,
  req: Request,
  res: Response,
  next: NextFunction,
): Response {
  if (process.env.NODE_ENV !== 'production') {
    console.log(err);
  }

  return res.status(500).json({
    error: {
      code: 'InternalServerError',
      message: 'Internal server error',
    },
  });
}

export default errorHandler;
