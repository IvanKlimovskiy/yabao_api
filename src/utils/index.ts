import { Document, Model } from 'mongoose';
import { Response, Request, NextFunction } from 'express';
import IncorrectData from '../errors/incorrect-data';
import ServerSideError from '../errors/server-side-error';
import { ProfileFields } from '../types';
import User from '../models/users';
import NotFoundError from '../errors/not-found-error';
const handleErrors = (error: Error, next: NextFunction) => {
  if (error.name === 'ValidationError') {
    error = new IncorrectData('Введены некорректные данные');
  } else if (error.name === 'CastError') {
    error = new IncorrectData('Некорректный идентификатор');
  }
  next(error);
};

export function generateController<T extends Document>(
  req: Request,
  res: Response,
  next: NextFunction,
  model: Model<T>,
  method: 'find' | 'create'
) {
  const keyName = `${model.modelName}s`;
  switch (method) {
    case 'create':
      model
        .create(req.body)
        .then((data) => {
          if (data) {
            setTimeout(() => {
              res.json({
                status: 'success',
                data: {
                  [keyName]: data,
                },
              });
            }, 1000);
          } else {
            throw new IncorrectData('Введены некорректные данные!');
          }
        })
        .catch((error: Error) => {
          handleErrors(error, next);
        });
      break;
    case 'find':
      model
        .find()
        .then((data) => {
          if (data) {
            setTimeout(() => {
              res.json({
                status: 'success',
                data: {
                  [keyName]: data,
                },
              });
            }, 1000);
          } else {
            throw new IncorrectData('Введены некорректные данные!');
          }
        })
        .catch((error: Error) => {
          handleErrors(error, next);
        });
      break;
    default:
      throw new ServerSideError('На сервере произошла ошибка!');
  }
}

export const editProfile = async (fieldBeingEdited: ProfileFields, req: Request, res: Response) => {
  // @ts-ignore
  const field = req.body[fieldBeingEdited];
  const { _id } = req.body;
  const user = await User.findByIdAndUpdate(_id, field, { new: true });
  if (!user) {
    throw new NotFoundError('Пользователь не найден');
  }
  return user;
};
