import Joi from "joi";

const userSchema = {
  username: Joi.string().min(4, "utf8").max(20, "utf8"),
  email: Joi.string().email(),
  password: Joi.string().min(6, "utf8").max(30, "utf8"),
};

export const loginValidateSchema = Joi.object({
  email: userSchema.email.required(),
  password: userSchema.password.required(),
});

export const registerValidateSchema = Joi.object({
  username: userSchema.username.required(),
  email: userSchema.email.required(),
  password: userSchema.password.required(),
});

export const tokenValidateSchema = Joi.object({
  token: Joi.string()
    .regex(/^[A-Za-z0-9-_]+\.[A-Za-z0-9-_]+\.[A-Za-z0-9-_.+/=]*$/)
    .min(3)
    .max(200)
    .required(),
});

export const idParamValidateSchema = Joi.object({
  id: Joi.number(),
});

export const teamQueryValidateSchema = Joi.object({
  id: Joi.number(),
  leagueId: Joi.number(),
  season: Joi.string().regex(/^(19[0-9]{2}|2[0-9]{3})$/),
  search: Joi.string(),
});
