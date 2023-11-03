import { Router } from 'express';
import { createRoll, getRolls } from '../../controllers/rolls';
import pizzaRouter from '../pizzas';

const rollRouter = Router();

rollRouter.post('/menu/roll', createRoll);
pizzaRouter.get('/menu/roll', getRolls);
export default rollRouter;
