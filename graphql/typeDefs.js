const { gql } = require("apollo-server");

module.exports = gql`
  type Event {
    id: ID!
    title: String!
    category: String!
    location: String!
    locationUrl: String
    city: String!
    date: String!
    image: [Image!]!
    cast: [Cast!]!
    ticketTypes: [TicketType!]!
    description: String!
    featured: Boolean
    status: String!
    time: String
    dateTime: String
    createdAt: String!
    updatedAt: String!
  }

  type Image {
    imageID: String!
    imageURL: String!
  }

  type Cast {
    name: String!
    role: String
  }

  type TicketType {
    type: String!
    price: Float!
  }

  type Query {
    getEventById(id: ID!): Event
    getAllEvents(start: Int, end: Int, status: String, categories: [String]): [Event]
  }
`;
