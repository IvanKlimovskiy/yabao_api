import { Request, Response, NextFunction } from 'express';
import User from '../../models/users';
import { generateController } from '../../utils';
import { UserModel } from '../../models/users/index.types';

export const createUser = (req: Request, res: Response, next: NextFunction) =>
  generateController<UserModel>(req, res, next, User, 'create');

export const getUsers = (req: Request, res: Response, next: NextFunction) =>
  generateController<UserModel>(req, res, next, User, 'find');

export const login = (req: Request, res: Response) => {
  console.log(req.body);
  const code = Math.floor(Math.random() * (9999 - 1000 + 1)) + 1000;
  User.findOne(req.body).then((user) => {
    if (user) {
      User.findOneAndUpdate(req.body, { code }, { new: true }).then((user) => {
        res.send({
          message: 'Пользователь найден и обновлён',
          code,
          user,
        });
      });
    } else {
      const { number } = req.body;
      User.create({ number, code }).then(() => {
        res.send({
          message: 'Пользователь создан',
          code,
        });
      });
    }
  });
};
