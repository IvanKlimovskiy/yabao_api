import { Router } from 'express';
import { createPizza, getPizzas } from '../../controllers/pizzas';

const pizzaRouter = Router();

pizzaRouter.post('/menu/pizza', createPizza);
pizzaRouter.get('/menu/pizza', getPizzas);
export default pizzaRouter;
