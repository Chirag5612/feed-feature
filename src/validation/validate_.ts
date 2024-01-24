/* eslint-disable max-len */
/* eslint-disable no-underscore-dangle */
import { NextFunction, Request, Response } from 'express';
import mongoose from 'mongoose';
import Validator from 'validatorjs';
import responseSend from '../helper/responseMiddleware';

Validator.registerAsync('exist', (value, attribute, req, passes) => {
  if (!attribute) throw new Error('Specify Requirements i.e fieldName: exist:table,column');
  // split table and column
  const attArr = attribute.split(',');
  if (attArr.length !== 2 && attArr.length !== 3) throw new Error(`Invalid format for validation rule on ${attribute}`);

  const { 0: table, 1: column, 2: id } = attArr;

  const query: any = {};
  query[column] = value;
  if (id !== undefined && Number(id) !== 0) { query._id = { $ne: id }; }

  if (value === undefined || value === '') {
    passes();
  } else {
    // @ts-ignore
    mongoose.models[table].findOne(query)
      .then((result: any) => {
        if (result) {
          passes(false, `${value} is Already Exist in ${table}.`); // return false if value exists
          return;
        }
        passes();
      });
  }
}, 'message');

const validatorUtil = (body: any, rules: any, customMessages: any, callback: Function) => {
  const validation = new Validator(body, rules, customMessages);
  validation.passes(() => callback(null, true));
  validation.fails(() => callback(validation.errors.errors, false));
};

const validatorUtilWithCallback = (rules: any, customMessages: any, req: Request, res: Response, next: NextFunction) => {
  const validation = new Validator(req.body, rules, customMessages);
  validation.passes(() => next());
  validation.fails(() => responseSend.sendValidationError(res, validation.errors.errors));
  // validation.fails(() => res.status(422).send(validation.errors.errors));
};
const validatorUtilWithCallbackQuery = (rules: any, customMessages: any, req: Request, res: Response, next: NextFunction) => {
  const validation = new Validator(req.query, rules, customMessages);
  validation.passes(() => next());
  validation.fails(() => res.status(422).send(validation.errors.errors));
};

export default {
  validatorUtil,
  validatorUtilWithCallbackQuery,
  validatorUtilWithCallback,
};
