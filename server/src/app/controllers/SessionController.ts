import { Request, Response } from 'express';

import User from '@models/User';

import generatePasswordHash from '@utils/generatePasswordHash';
import generateBytes from '@utils/generateBytes';

export default {
  async store(req: Request, res: Response): Promise<Response> {
    try {
      const { email, password } = req.body;

      const passwordHash = await generatePasswordHash(
        process.env.APP_KEY,
        password,
      );

      const user = await User.findOne({
        email,
        password: passwordHash,
      })
        .select('-cart')
        .lean();

      if (!user) {
        return res.status(401).json({
          error: 'InvalidCredentials',
        });
      }

      const sessionToken = await generateBytes();

      await User.findByIdAndUpdate(user._id, {
        sessionToken,
      });

      return res.json({ ...user, sessionToken });
    } catch (err) {
      console.log(err);
      return res.status(500).json({
        error: 'InternalServerError',
      });
    }
  },
};
