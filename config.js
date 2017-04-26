module.exports = {
  DATABASE_URL: process.env.DATABASE_USER ? `mongodb://${process.env.DATABASE_USER}:${process.env.DATABASE_PW}@${process.env.DATABASE_URL}`
    : 'mongodb://localhost/condictor',
  TEST_DATABASE_URL: 'mongodb://localhost/test-condictor',
  PORT: process.env.PORT || 3001,
  TEST_PORT: 3002,
};
