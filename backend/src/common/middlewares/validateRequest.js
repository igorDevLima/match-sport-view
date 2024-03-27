import { BadRequestError } from "../helpers/api-errors.js";

const validateRequest = (schema, type) => {
  return (req, res, next) => {
    const data = req[type];
    const result = schema.validate(data);

    if (result.error) {
      throw new BadRequestError(result.error.details[0].message);
    }

    if (!req.value) {
      req.value = {};
    }

    req.value[type] = result.value;
    next();
  };
};

export const validateBodyRequest = (schema) => validateRequest(schema, "body");

export const validateParamsRequest = (schema) =>
  validateRequest(schema, "params");

export const validateQueryRequest = (schema) =>
  validateRequest(schema, "query");
