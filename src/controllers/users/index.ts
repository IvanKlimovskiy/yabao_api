import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import { v4 as uuidv4 } from 'uuid';
import User from '../../models/users';
import { generateController } from '../../utils';
import { UserModel } from '../../models/users/index.types';
import NotFoundError from '../../errors/not-found-error';
import ServerSideError from '../../errors/server-side-error';
import MailService from '../../service/mail-service';
import * as process from 'process';

dotenv.config();

export const { JWT_SECRET, API_URL, CLIENT_URL } = process.env;
export const createUser = (req: Request, res: Response, next: NextFunction) =>
  generateController<UserModel>(req, res, next, User, 'create');
export const getUsers = (req: Request, res: Response, next: NextFunction) =>
  generateController<UserModel>(req, res, next, User, 'find');
export const login = (req: Request, res: Response, next: NextFunction) => {
  const code = Math.floor(Math.random() * (9999 - 1000 + 1)) + 1000;
  const { number } = req.body;
  User.findOne({ number }).then((user) => {
    if (user) {
      User.findOneAndUpdate(req.body, { code }, { new: true })
        .then((updatedUser) => {
          if (updatedUser) {
            setTimeout(() => {
              res.send({
                code,
              });
            }, 3000);
          } else {
            throw new ServerSideError('На сервере произошла ошибка');
          }
        })
        .catch((error: Error) => {
          next(error);
        });
    } else {
      User.create({ number, code })
        .then((newUser) => {
          if (newUser) {
            setTimeout(() => {
              res.send({
                code,
              });
            }, 3000);
          } else {
            throw new ServerSideError('Пользователь не создан');
          }
        })
        .catch((error: Error) => {
          next(error);
        });
    }
  });
};
export const verifyCode = (req: Request, res: Response, next: NextFunction) => {
  const { number, code } = req.body;
  User.findOne({ number })
    .then((user) => {
      if (user && JWT_SECRET) {
        const accessToken = jwt.sign({ _id: user._id }, JWT_SECRET, { expiresIn: '20s' });
        const refreshToken = jwt.sign({ _id: user._id }, JWT_SECRET, { expiresIn: '30d' });
        if (user.code === code) {
          User.findOneAndUpdate({ number }, { refreshToken: `Bearer ${refreshToken}` })
            .then((updatedUser) => {
              if (updatedUser) {
                setTimeout(() => {
                  res.json({
                    status: 'success',
                    user,
                    tokens: {
                      accessToken: `Bearer ${accessToken}`,
                      refreshToken: `Bearer ${refreshToken}`,
                    },
                  });
                }, 3000);
              } else {
                throw new ServerSideError('Произошла ошибка при обновлении токена в базе данных');
              }
            })
            .catch((error: Error) => {
              next(error);
            });
        } else {
          setTimeout(() => {
            res.send({
              status: 'failure',
            });
          }, 3000);
        }
      } else {
        throw new NotFoundError('Пользователь не найден');
      }
    })
    .catch((error: Error) => {
      next(error);
    });
};

export const getCurrentUser = (req: Request, res: Response) => {
  User.findById(req.user._id).then((user) => {
    if (user) {
      setTimeout(() => {
        res.json({ status: 'success', user });
      }, 3000);
    } else {
      setTimeout(() => {
        res.json({
          status: 'failure',
        });
      }, 3000);
    }
  });
};

export const logout = (req: Request, res: Response) => {
  const { refreshToken } = req.body;
  User.findOneAndUpdate({ refreshToken }, { refreshToken: '' }).then((user) => {
    if (user) {
      setTimeout(() => {
        res.json({
          status: 'success',
          message: 'Разлогирование успешное',
        });
      }, 3000);
    } else {
      setTimeout(() => {
        res.json({
          status: 'failure',
          message: 'Пользователь не найден',
        });
      }, 3000);
    }
  });
};

export const getActivationLink = async (req: Request, res: Response) => {
  const { email, number } = req.body;
  const user = await User.findOne({ number });
  if (!user) {
    throw new NotFoundError('Пользователь не найден');
  }
  const activationLink = uuidv4();
  user.activationLink = activationLink;
  user.email = email;
  await MailService.sendActivationLinkToMail(email, `${API_URL}/api/auth/activate/${activationLink}`);
  await user.save().then(() => {
    setTimeout(() => {
      res.json({
        message: 'success',
      });
    }, 3000);
  });
};

export const activateEmail = async (req: Request, res: Response, next: NextFunction) => {
  const activationLink = req.params.link;
  const user = await User.findOne({ activationLink });
  if (!user) {
    next(new NotFoundError('Пользователь не найден'));
  } else {
    user.isActivated = true;
    await user.save().then(() => {
      if (CLIENT_URL) {
        return res.redirect(CLIENT_URL);
      }
    });
  }
};

export const editName = async (req: Request, res: Response, next: NextFunction) => {
  const { id } = req.params;
  const { name } = req.body;
  const user = await User.findByIdAndUpdate({ _id: id }, { name }, { new: true });
  if (!user) {
    next(new NotFoundError('Пользователь не найден'));
  }
  setTimeout(() => {
    res.json({
      status: 'success',
      user,
    });
  }, 3000);
};
