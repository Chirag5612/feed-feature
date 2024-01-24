import { NextFunction, Request, Response } from 'express';
import validator from '../validate_';

const store = async (req: Request, res: Response, next: NextFunction) => {
  let id: any = 0;
  if (req.body.id) {
    id = req.body.id;
  }
  const validationRule = {
    card_number: `required|string|exist:cards,card_number,${id}`,
    card_name: 'required|string',
    card_exp: 'required|string',
    card_cvv: 'required|string',
  };

  validator.validatorUtilWithCallback(validationRule, {}, req, res, next);
};

export default {
  store,
};
