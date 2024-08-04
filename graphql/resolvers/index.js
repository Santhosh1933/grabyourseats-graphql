const eventResolvers = require('./events')

module.exports = {
    Query: {
        ...eventResolvers.Query
    },
    // Mutation: {
    //     ...eventResolvers.Mutation
    // },
};