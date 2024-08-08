const { UserInputError, ApolloError } = require("apollo-server");
const Event = require("../../models/Event");

module.exports = {
  Query: {
    async getEventById(_, { id }) {
      try {
        const event = await Event.findById(id);
        if (!event) {
          throw new UserInputError("Event not found");
        }
        return event;
      } catch (err) {
        throw new ApolloError("Error fetching event", err.message);
      }
    },
    async getAllEvents(_, { start, end, status, categories }) {
      try {
        const query = {};

        if (status) {
          query.status = status;
        }

        if (Array.isArray(categories) && categories.length > 0) {
          query.category = { $in: categories };
        }

        const res = await Event.find(query)
          .skip(start)
          .limit(end - start)
          .sort({ dateTime: -1 });
        return res;
      } catch (err) {
        console.error("Error fetching events:", err.message);
        throw new ApolloError("Error fetching events", err.message);
      }
    },
  },
};
