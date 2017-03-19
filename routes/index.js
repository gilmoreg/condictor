const express = require('express');
const GraphQL = require('graphql');
const graphqlHTTP = require('express-graphql');

const router = express.Router();

/*
router.use(require('./passport'));

*/
const schema = new GraphQL.GraphQLSchema({
  query: new GraphQL.GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
      hello: {
        type: GraphQL.GraphQLString,
        resolve() {
          return 'world';
        },
      },
    },
  }),
});

router.use('/graphql', graphqlHTTP({
  schema,
  graphiql: true,
}));

router.get('/', (req, res) => {
  res.status(200).json({ success: true });
});

module.exports = { router };
