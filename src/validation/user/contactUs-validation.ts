import { NextFunction, Request, Response } from 'express';
import validator from '../validate_';

const store = async (req: Request, res: Response, next: NextFunction) => {
  const validationRule = {
    email: 'string|email',
    message: 'required|string',
  };
  validator.validatorUtilWithCallback(validationRule, {}, req, res, next);
};

export default {
  store,
};
