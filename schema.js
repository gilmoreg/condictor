const GraphQL = require('graphql');
const graffitiMongoose = require('@risingstack/graffiti-mongoose');
const Ticket = require('./models/Ticket').Ticket;

const schema = graffitiMongoose.getSchema([Ticket]);

module.exports = schema;
