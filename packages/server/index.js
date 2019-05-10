const app = require('./app');
const PORT = process.env.PORT || 3000;
const MONGO_URI = process.env.MONGO_URI || '';
const winston = require('winston');
const mongoose = require('mongoose');


mongoose.connect(MONGO_URI, { useNewUrlParser: true }, () => {
  winston.info(`connected to mongodb => ${MONGO_URI}`);
});

app.listen(PORT, () => {
  winston.info(`connected to server on port ${PORT}`);
});
