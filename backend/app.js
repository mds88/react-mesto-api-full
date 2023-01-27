const express = require('express');
require('dotenv').config();
const mongoose = require('mongoose');
const { errors } = require('celebrate');
const cookieParser = require('cookie-parser');
// const cors = require('cors');
const cors = require('./middlewares/cors');
const indexRouter = require('./routes/index');
const errorHandler = require('./middlewares/errorHandler');
const { requestLogger, errorLogger } = require('./middlewares/logger');

const { PORT = 3000 } = process.env;

const app = express();

app.use(express.json());
app.use(cookieParser());

// app.use(cors({
//   origin: 'http://localhost:3001',
//   credentials: true,
// }));
app.use(cors);

mongoose.set('strictQuery', true);
mongoose.connect('mongodb://127.0.0.1:27017/mestodb', { useNewUrlParser: true });
// TODO(immotal) Useful for debugging, in the future I will change it to a log file
// , (err) => {
//   const message = err || 'mongdb is connected';
//   console.log(message);
// }
app.use(requestLogger);

app.use(indexRouter);

app.use(errorLogger);

app.use(errors());
app.use(errorHandler);

app.listen(PORT);
// TODO(immotal) Useful for debugging, in the future I will change it to a log file
// , () => {
//   console.log(`App listening on port ${PORT}`);
// }
