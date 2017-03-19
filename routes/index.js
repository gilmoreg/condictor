const express = require('express');
// const graphqlHTTP = require('express-graphql');


const router = express.Router();

/* router.use(require('./passport')); */
/*
router.use('/graphql', graphqlHTTP({
  schema: MyGraphQLSchema,
  graphiql: true,
}));
*/

router.get('/', (req, res) => {
  res.status(200).json({ success: true });
});

module.exports = { router };
