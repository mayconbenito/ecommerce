import { Joi } from 'celebrate';

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
};
