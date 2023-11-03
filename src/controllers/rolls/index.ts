import { Response, Request, NextFunction } from 'express';
import { Roll } from '../../models/menuElements';
import { generateController } from '../../utils';
import { Data } from '../../models/menuElements/index.types';

const createRoll = (req: Request, res: Response, next: NextFunction) =>
  generateController<Data>(req, res, next, Roll, 'create');

const getRolls = (req: Request, res: Response, next: NextFunction) =>
  generateController<Data>(req, res, next, Roll, 'find');

export { createRoll, getRolls };
