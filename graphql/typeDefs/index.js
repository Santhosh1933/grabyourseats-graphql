const { mergeTypeDefs } = require('@graphql-tools/merge');
const eventsType = require("./eventsType");

const typeDefs = mergeTypeDefs([eventsType]);

module.exports = typeDefs;
