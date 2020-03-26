import { Joi } from 'celebrate';

export default {
  store: {
    body: Joi.object().keys({
      name: Joi.string()
        .min(1)
        .required(),
      email: Joi.string()
        .email()
        .required(),
      password: Joi.string().required(),
      document: Joi.string()
        .min(11)
        .max(11),
      birthday: Joi.date().required(),
      phones: Joi.array()
        .items(
          Joi.string()
            .min(14)
            .max(15)
            .required(),
        )
        .min(1)
        .required(),
    }),
  },
};
