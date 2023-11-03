import { Response, Request, NextFunction } from 'express';
import { generateController } from '../../utils';
import { Drink } from '../../models/menuElements';
import { Data } from '../../models/menuElements/index.types';

const createDrink = (req: Request, res: Response, next: NextFunction) =>
  generateController<Data>(req, res, next, Drink, 'create');

const getDrinks = (req: Request, res: Response, next: NextFunction) =>
  generateController<Data>(req, res, next, Drink, 'find');

export { createDrink, getDrinks };
