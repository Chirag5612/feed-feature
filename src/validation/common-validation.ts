/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable no-underscore-dangle */
import { NextFunction, Request, Response } from 'express';
import validator from './validate_';

const idRequiredQuery = async (req: Request, res: Response, next: NextFunction) => {
  const ValidationRule = {
    id: 'required|string',
  };
  validator.validatorUtilWithCallbackQuery(ValidationRule, {}, req, res, next);
};
const idRequired = async (req: Request, res: Response, next: NextFunction) => {
  const ValidationRule = {
    id: 'required|string',
  };
  validator.validatorUtilWithCallback(ValidationRule, {}, req, res, next);
};
const _UserIdRequired = async (req: Request, res: Response, next: NextFunction) => {
  const ValidationRule = {
    user: {
      _id: 'required|string',
    },
  };
  validator.validatorUtilWithCallback(ValidationRule, {}, req, res, next);
};

const idRequiredParams = (req: Request, res: Response, next: NextFunction) => {
  const ValidationRule = {
    id: 'required|string',
  };
  validator.validatorUtilWithCallback(ValidationRule, {}, req, res, next);
};

const storeChat = async (req: Request, res: Response, next: NextFunction) => {
  const ValidationRule = {
    type: 'required',
    admin_id: [{ required_if: ['type', 1] }],
    vendor_id: [{ required_if: ['type', 2] }],
    user_id: [{ required_if: ['type', 3] }],
  };
  validator.validatorUtilWithCallback(ValidationRule, {}, req, res, next);
};

const fieldExistValidation = (req: Request, res: Response, next: NextFunction) => {
  const ValidationRule = {
    filed_value: 'required|string',
    field: 'required|string',
  };
  validator.validatorUtilWithCallback(ValidationRule, {}, req, res, next);
};

const notificationStatusChange = async (req: Request, res: Response, next: NextFunction) => {
  const validationRule = {
    status: 'required',
  };
  validator.validatorUtilWithCallback(validationRule, {}, req, res, next);
};

export default {
  storeChat,
  idRequired,
  idRequiredQuery,
  _UserIdRequired,
  idRequiredParams,
  notificationStatusChange,
  fieldExistValidation,
};
