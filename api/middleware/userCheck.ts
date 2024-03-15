import { Request, Response, NextFunction } from 'express';
import { HydratedDocument } from 'mongoose';
import User from '../models/User';
import { UserFields } from '../types';

export interface RequestWithUser extends Request {
  user?: HydratedDocument<UserFields>;
}

const userCheck = async (
  req: RequestWithUser,
  _res: Response,
  next: NextFunction,
) => {
  const headerValue = req.get('Authorization');

  if (!headerValue) {
    return next();
  }

  const [_bearer, token] = headerValue.split(' ');

  if (!token) {
    return next();
  }

  const user = await User.findOne({ token });

  if (!user) {
    return next();
  }

  req.user = user;
  next();
};

export default userCheck;
