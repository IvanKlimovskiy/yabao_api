import { Router } from 'express';
import { createDrink, getDrinks } from '../../controllers/drinks';

const drinkRouter = Router();

drinkRouter.post('/menu/drink', createDrink);
drinkRouter.get('/menu/drink', getDrinks);
export default drinkRouter;
