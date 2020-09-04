import { Request, Response, NextFunction } from 'express';

import Product from '@models/Product';

export default {
  async index(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<Response | void> {
    try {
      const { page } = req.query;
      let { limit } = req.query;
      limit = parseInt(limit || 10);

      const products = await Product.find({})
        .skip(limit * page - limit)
        .limit(limit);

      const total = await Product.countDocuments({});

      const meta = {
        items: products.length,
        total,
      };

      return res.json({ meta, products });
    } catch (err) {
      return next(err);
    }
  },
};
