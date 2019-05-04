const express = require('express');
const app = express();
const mongoose = require('mongoose');
const passport = require('passport');
const cors = require('cors');
const path = require('path');
const compression = require('compression');

const authRoutes = require('./routes/auth');
const statRoutes = require('./routes/stat');
const courseRoutes = require('./routes/course');
const solutionRoutes = require('./routes/solution');
const { MONGO_URI } = require('./constants/constants');
const { errorHandler } = require('./errors');

mongoose.connect(MONGO_URI, { useNewUrlParser: true }, () => {
  // eslint-disable-next-line no-console
  console.log(`conected to mongodb`);
});

app.use(compression());
app.use(passport.initialize());
require('./middlewares/passport')(passport);
app.use(cors());
app.use('/uploads', express.static('uploads'));
app.use(express.json());
app.use(authRoutes);
app.use('/dataset', statRoutes);
app.use('/course', courseRoutes);
app.use('/solution', solutionRoutes);
app.use((err, req, res, next) => errorHandler(err, req, res, next));

if (process.env.NODE_ENV === 'production') {
  app.use(express.static('../client/dist/client'));

  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, '..', 'client', 'dist', 'client', 'index.html'));
  });
}

module.exports = app;
