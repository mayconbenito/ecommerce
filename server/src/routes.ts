import express from 'express';
import { celebrate as validator } from 'celebrate';

import SessionController from '@controllers/SessionController';
import UserController from '@controllers/UserController';
import ProductController from '@controllers/ProductController';
import CartController from '@controllers/CartController';
import OrderController from '@controllers/OrderController';

import auth from '@middlewares/auth';

import UserValidator from '@validators/User';
import ProductValidator from '@validators/Product';
import SessionValidator from '@validators/Session';
import CartValidator from '@validators/Cart';
import OrderValidator from '@validators/Order';

const routes = express.Router();

routes.post(
  '/sessions',
  validator(SessionValidator.store),
  SessionController.store,
);
routes.post('/register', validator(UserValidator.store), UserController.store);

routes.get(
  '/products',
  auth,
  validator(ProductValidator.index),
  ProductController.index,
);

routes.get('/me/cart', auth, CartController.show);
routes.put(
  '/me/cart',
  auth,
  validator(CartValidator.update),
  CartController.update,
);

routes.post(
  '/me/orders',
  auth,
  validator(OrderValidator.store),
  OrderController.store,
);
routes.get(
  '/me/orders',
  auth,
  validator(OrderValidator.index),
  OrderController.index,
);

export default routes;
