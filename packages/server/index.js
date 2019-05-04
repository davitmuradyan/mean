const app = require('./app');
const { PORT } = require('./constants/constants');
const winston = require('winston');

app.listen(PORT, () => {
  winston.info(`connected to server on port ${PORT}`);
});
