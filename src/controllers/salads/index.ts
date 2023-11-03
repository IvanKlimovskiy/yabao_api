import { Response, Request, NextFunction } from 'express';
import { generateController } from '../../utils';
import { Salad } from '../../models/menuElements';
import { Data } from '../../models/menuElements/index.types';

const createSalad = (req: Request, res: Response, next: NextFunction) =>
  generateController<Data>(req, res, next, Salad, 'create');

const getSalads = (req: Request, res: Response, next: NextFunction) =>
  generateController<Data>(req, res, next, Salad, 'find');

export { createSalad, getSalads };
