const mongoose = require("mongoose");
const cron = require("node-cron");

const statusEnum = ["Upcoming", "Ongoing", "Past"];

const eventSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Title is required."],
    },
    category: {
      type: String,
      required: [true, "Category is required."],
    },
    location: {
      type: String,
      required: [true, "Location is required."],
    },
    locationUrl: {
      type: String,
      required: [true, "Location URL is required."],
    },
    city: {
      type: String,
      required: [true, "City is required."],
    },
    date: {
      type: String,
      required: [true, "Date is required."],
      validate: {
        validator: function (date) {
          const currentDate = new Date().toISOString().split("T")[0];
          const reqDate = new Date(date).toISOString().split("T")[0];
          return reqDate >= currentDate;
        },
        message: "Date must be in the future.",
      },
    },
    image: [
      {
        imageID: { type: String, required: [true, "Image ID is required"] },
        imageURL: { type: String, required: [true, "Image URL is required."] },
      },
    ],
    cast: [
      {
        name: { type: String, required: [true, "Actor name is required."] },
        role: { type: String, required: [true, "Role is required."] },
      },
    ],
    ticketTypes: [
      {
        type: {
          type: String,
          required: [true, "Ticket type is required."],
        },
        price: { type: Number, required: [true, "Price is required."] },
      },
    ],
    description: {
      type: String,
      required: [true, "Description is required."],
    },
    featured: {
      type: Boolean,
      default: false,
    },
    status: {
      type: String,
      enum: {
        values: statusEnum,
        message: "Invalid status.",
      },
      default: "Upcoming",
    },
    time: {
      type: String,
    },
    dateTime: {
      type: Date,
    },
  },
  {
    timestamps: true,
    autoCreate: true,
    autoIndex: true,
  }
);

// Pre-save hook to concatenate date and time and store as dateTime
eventSchema.pre("save", function (next) {
  const { date, time } = this;
  const dateTimeString = `${date}T${time}:00.000Z`;
  this.dateTime = new Date(dateTimeString);
  next();
});

const updateEventStatus = async () => {
  try {
    const currentDate = new Date();

    await Promise.all([
      Event.updateMany(
        { dateTime: { $lt: currentDate }, status: { $ne: "Past" } },
        { $set: { status: "Past" } }
      ),
      Event.updateMany(
        { dateTime: { $gt: currentDate }, status: { $ne: "Upcoming" } },
        { $set: { status: "Upcoming" } }
      ),
      Event.updateMany(
        {
          dateTime: {
            $gte: currentDate.setHours(0, 0, 0, 0),
            $lt: currentDate.setHours(23, 59, 59, 999),
          },
          status: { $ne: "Ongoing" },
        },
        { $set: { status: "Ongoing" } }
      ),
    ]);
  } catch (err) {
    console.error("Error updating event statuses:", err);
  }
};

// Schedule the cron job to run every 5 minutes
cron.schedule("*/5 * * * *", updateEventStatus);

const Event = mongoose.model("Event", eventSchema);
module.exports = Event;
