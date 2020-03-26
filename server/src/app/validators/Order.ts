import { Joi } from 'celebrate';
import JoiObjectId from 'joi-objectid';

const joiObjectId = JoiObjectId(Joi);

export default {
  index: {
    query: Joi.object().keys({
      page: Joi.number()
        .min(1)
        .required(),
      limit: Joi.number()
        .min(1)
        .max(100),
    }),
  },
  store: {
    body: Joi.object().keys({
      products: Joi.array()
        .items(
          Joi.object().keys({
            _id: joiObjectId().required(),
            quantity: Joi.number()
              .min(1)
              .max(500)
              .required(),
          }),
        )
        .min(1)
        .max(500)
        .required(),
      payment: Joi.object()
        .keys({
          cardNumber: Joi.string()
            .creditCard()
            .required(),
          cardCvv: Joi.string()
            .min(3)
            .max(4)
            .required(),
          cardExpirationDate: Joi.string()
            .min(4)
            .max(4)
            .required(),
          cardHolderName: Joi.string()
            .min(1)
            .required(),
          document: Joi.string()
            .min(11)
            .max(11)
            .required(),
        })
        .required(),
      billing: Joi.object().keys({
        name: Joi.string()
          .min(1)
          .required(),
        address: Joi.object().keys({
          country: Joi.string()
            .min(2)
            .max(3)
            .required(),
          state: Joi.string()
            .min(2)
            .max(2)
            .required(),
          city: Joi.string()
            .min(2)
            .max(2)
            .required(),
          neighborhood: Joi.string()
            .min(1)
            .required(),
          street: Joi.string()
            .min(1)
            .required(),
          streetNumber: Joi.string()
            .min(1)
            .required(),
          zipcode: Joi.string()
            .min(5)
            .required(),
        }),
      }),
    }),
  },
};
