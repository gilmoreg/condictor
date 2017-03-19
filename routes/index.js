const express = require('express');
const graphqlHTTP = require('express-graphql');
const Schema = require('../schema');

const router = express.Router();

/*
router.use(require('./passport'));

*/

router.use('/graphql', graphqlHTTP({
  schema: Schema,
  graphiql: true,
}));

router.get('/', (req, res) => {
  res.status(200).json({ success: true });
});

module.exports = { router };
