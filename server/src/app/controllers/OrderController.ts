import { Response, NextFunction } from 'express';
import axios from 'axios';
import creditCardType from 'credit-card-type';
import { cpf as cpfValidator } from 'cpf-cnpj-validator';

import User from '@models/User';
import Product, { ProductType } from '@models/Product';
import Order, { OrderType } from '@models/Order';

import { Request } from '@definitions/express';

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

      const orders = await Order.find({
        user: req.user._id,
      })
        .skip(limit * page - limit)
        .limit(limit);

      const total = await Order.countDocuments({
        user: req.user._id,
      });

      const meta = {
        items: orders.length,
        total,
      };

      return res.json({ meta, orders });
    } catch (err) {
      return next(err);
    }
  },
  async store(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<Response | void> {
    try {
      const { products, payment, billing } = req.body;

      if (!cpfValidator.isValid(payment.document)) {
        return res.status(400).json({
          error: 'Bad Request',
          message: '"payment.document" format is invalid',
          validation: {
            source: 'body',
            keys: ['payment.document'],
          },
        });
      }

      const productsFilled: Array<OrderType['products']> = [];
      const acquirerItems: Array<ProductType> = [];
      let totalOrderAmount = 0;

      for (const { _id, quantity } of products) {
        const product = await Product.findById(_id).lean();

        if (product) {
          const totalPrice = product.price * quantity;

          totalOrderAmount += totalPrice;

          productsFilled.push({ ...product, quantity, totalPrice });
          acquirerItems.push({
            id: product._id,
            title: product.name,
            unit_price: product.price,
            quantity,
            tangible: false,
          });
        }
      }

      const cardFirstDigits = payment.cardNumber.substring(0, 4);
      const cardLastDigits = payment.cardNumber.slice(-4);

      const [card] = creditCardType(cardFirstDigits);

      const order = await Order.create({
        user: req.user._id,
        products: productsFilled,
        payment: {
          status: 'processing',
          cardFirstDigits,
          cardLastDigits,
          cardHolderName: payment.cardHolderName,
          cardExpirationDate: payment.cardExpirationDate,
          cardBrand: card.niceType,
          customerDocument: payment.document,
        },
        status: 'processing',
        totalOrderAmount,
      });

      const acquirer = axios.create({
        baseURL: 'https://api.pagar.me/1',
        // disable error throw
        validateStatus() {
          return true;
        },
      });

      const acquirerResponse = await acquirer.post('transactions', {
        api_key: process.env.PAGARME_KEY,
        amount: totalOrderAmount,
        card_number: String(payment.cardNumber),
        card_cvv: String(payment.cardCvv),
        card_expiration_date: payment.cardExpirationDate,
        card_holder_name: payment.cardHolderName,
        customer: {
          external_id: req.user._id,
          name: req.user.name,
          type: 'individual',
          country: 'br',
          email: req.user.email,
          documents: [
            {
              type: 'cpf',
              number: String(payment.document),
            },
          ],
          phone_numbers: req.user.phones,
          birthday: req.user.birthday.toISOString().split('T')[0],
        },
        billing: {
          name: billing.name,
          address: {
            country: billing.address.country,
            state: billing.address.state,
            city: billing.address.city,
            neighborhood: billing.address.neighborhood,
            street: billing.address.street,
            street_number: billing.address.streetNumber,
            zipcode: billing.address.zipcode,
          },
        },
        items: acquirerItems,
      });

      if (acquirerResponse.status >= 400) {
        await Order.findByIdAndUpdate(order._id, {
          status: 'error',
          $set: {
            'payment.status': 'error_processing_payment',
          },
        });

        await User.findByIdAndUpdate(req.user._id, {
          cart: {},
        });
      }

      if (
        acquirerResponse.status === 200 &&
        acquirerResponse.data.status === 'paid'
      ) {
        await Order.findByIdAndUpdate(order._id, {
          status: 'finished',
          $set: {
            'payment.status': 'paid',
            'payment.pagarmeId': acquirerResponse.data.id,
          },
        });

        await User.findByIdAndUpdate(req.user._id, {
          cart: {},
        });
      }

      if (
        acquirerResponse.status === 200 &&
        acquirerResponse.data.status === 'refused'
      ) {
        await Order.findByIdAndUpdate(order._id, {
          status: 'refused',
          $set: {
            'payment.status': 'refused',
            'payment.pagarmeId': acquirerResponse.data.id,
          },
        });

        await User.findByIdAndUpdate(req.user._id, {
          cart: {},
        });
      }

      const updatedOrder = await Order.findById(order._id).select(
        '-user -payment._id',
      );

      return res.send({ order: updatedOrder });
    } catch (err) {
      return next(err);
    }
  },
};
