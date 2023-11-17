import express, { Request, Response, NextFunction } from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import { ErrorStatusCode } from './types';
import { PORT_DB, PORT, DB_NAME, DIRECTORY_PATH, NOT_FOUND_CODE } from './constants';
import pizzaRouter from './routes/pizzas';
import rollRouter from './routes/rolls';
import saladRouter from './routes/salads';
import drinkRouter from './routes/drinks';
import userRouter from './routes/users';
import { getCurrentUser, login, logout, verifyCode } from './controllers/users';
import auth from './middleware/auth';

const app = express();
app.use(express.static(DIRECTORY_PATH));
app.use(cors());
app.use(express.json());

app.post('/api/auth/login', login);
app.post('/api/auth/verify', verifyCode);
app.post('/api/auth/activate', verifyCode);
app.post('/api/auth/logout', logout);

app.use('/api', pizzaRouter);
app.use('/api', rollRouter);
app.use('/api', saladRouter);
app.use('/api', drinkRouter);
app.use('/api', userRouter);

app.get('/api/users/me', auth, getCurrentUser);
app.use((err: ErrorStatusCode, req: Request, res: Response, next: NextFunction) => {
  const { statusCode, message } = err;
  res.status(statusCode).json({ statusCode: `Код ошибки ${statusCode}`, message });
  next();
});

app.use('*', (req: Request, res: Response) => {
  res.status(NOT_FOUND_CODE).send('Страница не найдена');
});

const start = async () => {
  try {
    await mongoose.connect(`mongodb://127.0.0.1:${PORT_DB}/${DB_NAME}`).then(() => {
      console.log('Соединение с базой данных установлено');
    });
    app.listen(PORT, () => {
      console.log(`Сервер запущен на ${PORT} порту!`);
    });
  } catch (err) {
    console.log(err);
  }
};

start().then();
