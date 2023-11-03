import { Response, Request, NextFunction } from 'express';
import { Pizza } from '../../models/menuElements';
import { generateController } from '../../utils';
import { Data } from '../../models/menuElements/index.types';

const createPizza = (req: Request, res: Response, next: NextFunction) =>
  generateController<Data>(req, res, next, Pizza, 'create');

const getPizzas = (req: Request, res: Response, next: NextFunction) =>
  generateController<Data>(req, res, next, Pizza, 'find');

export { createPizza, getPizzas };
