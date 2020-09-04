import { Response, NextFunction } from 'express';

import User from '@models/User';
import Product from '@models/Product';

import { Request } from '@definitions/express';

export default {
  async update(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<Response | void> {
    try {
      const { products } = req.body;

      await User.findByIdAndUpdate(req.user._id, {
        cart: { products },
      });

      const user = await User.findById(req.user._id);

      if (!user) {
        return res.status(400).json({
          error: 'UserNotFound',
        });
      }

      let totalOrderAmount = 0;

      const productsArr = [];

      for (const { _id, quantity } of products) {
        const product = await Product.findById(_id).lean();

        totalOrderAmount += product.price * quantity;
        productsArr.push({ ...product, quantity });
      }

      return res.json({
        cart: {
          products: productsArr,
          totalOrderAmount,
        },
      });
    } catch (err) {
      return next(err);
    }
  },
  async show(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<Response | void> {
    try {
      const user = await User.findById(req.user._id)
        .select('cart')
        .lean();

      if (!user.cart || !user.cart.products) {
        return res.json({ cart: { products: [], totalOrderAmount: 0 } });
      }

      let totalOrderAmount = 0;

      const products = [];

      for (const { _id, quantity } of user.cart.products) {
        const product = await Product.findById(_id).lean();

        totalOrderAmount += product.price * quantity;
        products.push({ ...product, quantity });
      }

      return res.json({ cart: { products, totalOrderAmount } });
    } catch (err) {
      return next(err);
    }
  },
};
