import { NextFunction, Request, Response } from 'express';
import validator from '../validate_';

const register = async (req: Request, res: Response, next: NextFunction) => {
  const validationRule = {
    email: 'required|string|email',
    full_name: 'required|string',
    mobile_no: 'required|string',
    password: 'required|string',
  };
  validator.validatorUtilWithCallback(validationRule, {}, req, res, next);
};

const profile = async (req: Request, res: Response, next: NextFunction) => {
  let id: any = 0;
  if (req.body.id) {
    id = req.body.id;
  }
  const validationRule = {
    email: `required|string|email|exist:users,email,${id}`,
    first_name: 'required|string',
    last_name: 'required|string',
    mobile_no: 'required|string',
    location: 'required',
  };

  validator.validatorUtilWithCallback(validationRule, {}, req, res, next);
};

const login = async (req: Request, res: Response, next: NextFunction) => {
  const validationRule = {
    identity: 'string',
    password: 'string',
  };
  validator.validatorUtilWithCallback(validationRule, {}, req, res, next);
};

const changePassword = async (req: Request, res: Response, next: NextFunction) => {
  const validationRule = {
    old_password: 'string',
    password: 'string',
  };
  validator.validatorUtilWithCallback(validationRule, {}, req, res, next);
};

const uploadBrochure = async (req: Request, res: Response, next: NextFunction) => {
  const validationRule = {
    upload_brochure: 'required',
  };
  validator.validatorUtilWithCallback(validationRule, {}, req, res, next);
};

const emailValidation = async (req: Request, res: Response, next: NextFunction) => {
  const validationRule = {
    email: 'required|string|email',
  };
  validator.validatorUtilWithCallback(validationRule, {}, req, res, next);
};

const resetPassword = async (req: Request, res: Response, next: NextFunction) => {
  const validationRule = {
    password: 'required|string|min:6',
  };
  validator.validatorUtilWithCallback(validationRule, {}, req, res, next);
};

const verifyMobileNumber = async (req: Request, res: Response, next: NextFunction) => {
  const validationRule = {
    mobile_no: 'required',
  };
  validator.validatorUtilWithCallback(validationRule, {}, req, res, next);
};

const verifyOtp = async (req: Request, res: Response, next: NextFunction) => {
  const validationRule = {
    otp: 'required|string|min:4|max:4',
    token: 'required',
  };
  validator.validatorUtilWithCallback(validationRule, {}, req, res, next);
};

export default {
  login,
  register,
  changePassword,
  profile,
  uploadBrochure,
  emailValidation,
  resetPassword,
  verifyMobileNumber,
  verifyOtp,
};
