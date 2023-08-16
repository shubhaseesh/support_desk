const mongoose = require("mongoose");

const ticketSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      require: true,
      ref: "User",
    },
    product: {
      type: String,
      required: [true, "Please select a product"],
      enum: ["iPhone", "iPad", "iMac", "Macbook Pro"],
    },
    description: {
      type: String,
      required: [true, "Please add a description."],
    },
    status: {
      type: String,
      required: true,
      enum: ["new", "open", "closed"],
      default: "new",
    },
  },
  {
    timestamp: true,
  }
);

module.exports = mongoose.model("Ticket", ticketSchema);
