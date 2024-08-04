require("dotenv").config();
const { ApolloServer } = require("apollo-server");
const mongoose = require("mongoose");

const MONGODB = process.env.MONGODB_URI;

const typeDefs = require("./graphql/typeDefs");
const resolvers = require("./graphql/resolvers");

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

mongoose
  .connect(MONGODB, { useNewUrlParser: true })
  .then(() => {
    console.log("Mongodb Connection successful");
    return server.listen({ port: process.env.PORT });
  })
  .then((res) => {
    console.log(`server running at ${res.url}`);
  });
