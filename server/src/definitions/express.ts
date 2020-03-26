import express from 'express';
import { UserType } from '@models/User';

export interface Request extends express.Request {
  user?: UserType;
}
