import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import User from '../../models/users';
import { generateController } from '../../utils';
import { UserModel } from '../../models/users/index.types';
import NotFoundError from '../../errors/not-found-error';
import serverSideError from '../../errors/server-side-error';
import ServerSideError from '../../errors/server-side-error';
dotenv.config();
export const { JWT_ACCESS_SECRET, JWT_REFRESH_SECRET } = process.env;
export const createUser = (req: Request, res: Response, next: NextFunction) =>
  generateController<UserModel>(req, res, next, User, 'create');
export const getUsers = (req: Request, res: Response, next: NextFunction) =>
  generateController<UserModel>(req, res, next, User, 'find');
export const login = (req: Request, res: Response, next: NextFunction) => {
  const code = Math.floor(Math.random() * (9999 - 1000 + 1)) + 1000;
  User.findOne(req.body).then((user) => {
    if (user) {
      User.findOneAndUpdate(req.body, { code }, { new: true })
        .then((user) => {
          if (user) {
            res.send({
              code,
            });
          } else {
            next(new serverSideError('На сервере произошла ошибка'));
          }
        })
        .catch((error) => {
          next(error);
        });
    } else {
      const { number } = req.body;
      User.create({ number, code })
        .then((user) => {
          if (user) {
            res.send({
              code,
            });
          } else {
            throw new ServerSideError('Пользователь не создан');
          }
        })
        .catch((error) => {
          next(error);
        });
    }
  });
};
export const verifyCode = (req: Request, res: Response, next: NextFunction) => {
  const { number, code } = req.body;
  User.findOne({ number })
    .then((user) => {
      if (user && JWT_ACCESS_SECRET && JWT_REFRESH_SECRET) {
        const accessToken = jwt.sign({ _id: user._id }, JWT_ACCESS_SECRET, { expiresIn: '15m' });
        const refreshToken = jwt.sign({ _id: user._id }, JWT_REFRESH_SECRET, { expiresIn: '30d' });
        if (user.code === code) {
          User.findOneAndUpdate({ number }, { refreshToken: `Bearer ${refreshToken}` })
            .then((user) => {
              if (user) {
                res.json({
                  status: 'success',
                  user,
                  tokens: {
                    accessToken: `Bearer ${accessToken}`,
                    refreshToken: `Bearer ${refreshToken}`,
                  },
                });
              } else {
                throw new ServerSideError('Произошла ошибка при обновлении токена в базе данных');
              }
            })
            .catch((error: Error) => {
              next(error);
            });
        } else {
          res.send({
            status: 'failure',
          });
        }
      } else {
        throw new NotFoundError('Пользователь не найден');
      }
    })
    .catch((error) => {
      next(error);
    });
};
