import { Document, Model } from 'mongoose';
import { Response, Request, NextFunction } from 'express';
import IncorrectData from '../errors/incorrect-data';
import ServerSideError from '../errors/server-side-error';

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
            res.json({
              status: 'success',
              data: {
                [keyName]: data,
              },
            });
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
            res.json({
              status: 'success',
              data: {
                [keyName]: data,
              },
            });
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
