import { Router } from 'express';
import { createSalad, getSalads } from '../../controllers/salads';
import pizzaRouter from '../pizzas';

const saladRouter = Router();

saladRouter.post('/menu/salad', createSalad);
pizzaRouter.get('/menu/salad', getSalads);
export default saladRouter;
