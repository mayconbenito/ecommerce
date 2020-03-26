import { Joi } from 'celebrate';
import JoiObjectId from 'joi-objectid';

const joiObjectId = JoiObjectId(Joi);

export default {
  update: {
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
    }),
  },
};
