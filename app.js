const express = require('express');
const cors = require('cors');
const userRouter = require('./routes/userRoutes');
const tweetRouter = require('./routes/tweetRoutes');
const updateRouter = require('./routes/updateRoute');
const globalErrHandler = require('./controller/errController');
const AppError = require('./utils/appError');

const app = express();
app.use(cors());
app.use(express.json());

app.use('/api/v1/users', userRouter);
app.use('/api/v1/tweets', tweetRouter);
app.use('/api/updateVisual', updateRouter);

app.all('*', (req, res, next) => {
  const message = `${req.originalUrl} not found on the server`;
  next(new AppError(message, 404));
});

app.use(globalErrHandler);

module.exports = app;
