const express = require('express');
const GraphQL = require('graphql');
const graphqlHTTP = require('express-graphql');


const router = express.Router();

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

module.exports = { router };
