import { isValidObjectId } from "mongoose";
import { BadRequestError } from "../helpers/api-errors";

export const validateMongoObjectId = (req, res, next) => {
  if (!isValidObjectId(req.params.id))
    throw new BadRequestError("Invalid objectId!");

  next();
};
