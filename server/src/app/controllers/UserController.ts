import { Request, Response } from 'express';
import { cpf as cpfValidator } from 'cpf-cnpj-validator';

import User from '@models/User';

import generatePasswordHash from '@utils/generatePasswordHash';
import generateBytes from '@utils/generateBytes';

export default {
  async store(req: Request, res: Response): Promise<Response> {
    try {
      const { name, email, password, document, birthday, phones } = req.body;

      let user = await User.findOne({
        email,
      }).select('_id');

      if (user) {
        return res.status(400).json({
          error: 'EmailAlreadyInUse',
        });
      }

      if (document) {
        if (!cpfValidator.isValid(document)) {
          return res.status(400).json({
            error: 'Bad Request',
            message: '"document" format is invalid',
            validation: {
              source: 'body',
              keys: ['document'],
            },
          });
        }
      }

      const passwordHash = await generatePasswordHash(
        process.env.APP_KEY,
        password,
      );

      user = await User.create({
        name,
        email,
        password: passwordHash,
        document,
        birthday,
        phones,
      });

      user.password = undefined;
      user.cart = undefined;

      const sessionToken = await generateBytes();

      await User.findByIdAndUpdate(user._id, {
        sessionToken,
      });

      return res.json({ ...user.toJSON(), sessionToken });
    } catch (err) {
      console.log(err);
      return res.status(500).json({
        error: 'InternalServerError',
      });
    }
  },
};
