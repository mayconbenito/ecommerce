import { Response, NextFunction } from 'express';

import User from '@models/User';

import { Request } from '@definitions/express';

export default async function(
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<Express.Response | void> {
  const authorizationHeader = req.headers.authorization;

  if (!authorizationHeader) {
    return res.status(401).send({ error: 'NoTokenProvided' });
  }

  const parts = authorizationHeader.split(' ');

  const [_, token] = parts;

  const user = await User.findOne({ sessionToken: token })
    .select('+email +phones')
    .lean();

  if (!user) {
    return res.status(401).json({ error: 'UnauthorizedToken' });
  }

  req.user = user;

  return next();
}
