import { NextFunction, Request, Response } from 'express';
import { AppError } from '../../../errors/AppError';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export function errorHandler(error: Error, req: Request, res: Response, next: NextFunction) {
  if(error instanceof AppError) {
    res.status(error.statusCode).json({error: error.message});
  }

  return res.status(500).json({error: `Internal Server Error - ${error.message}`});
}