import { Response, NextFunction } from 'express';
import { Request } from 'express';
import jwt from 'jsonwebtoken';
import { UNAUTHORIZED_CODE } from '../constants';
import { JWT_REFRESH_SECRET } from '../controllers/users';
import UnauthorizedError from '../errors/unauthorized-error';

export default (req: Request, res: Response, next: NextFunction) => {
  const { authorization } = req.headers;
  if (!authorization || !authorization.startsWith('Bearer ')) {
    return res.status(UNAUTHORIZED_CODE).send({ message: 'Требуется авторизация' });
  }
  const token = authorization.replace('Bearer ', '');
  let payload: jwt.JwtPayload | string = 'Необходима авторизация';
  try {
    if (JWT_REFRESH_SECRET) {
      payload = jwt.verify(token, JWT_REFRESH_SECRET);
    }
  } catch (e) {
    const err = new UnauthorizedError('Необходима авторизация');
    return next(err);
  }
  req.user = payload as jwt.JwtPayload;
  return next();
};
