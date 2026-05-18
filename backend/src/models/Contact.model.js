const mongoose = require("mongoose");

const contactSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
    },

    lastName: {
      type: String,
      required: true,
    },

    email: {
      type: String,
      required: true,
    },

    phone: {
      type: String,
    },

    company: {
      type: String,
    },

    service: {
      type: String,
    },

    inquiryType: {
      type: String,
    },

    department: {
      type: String,
    },

    preferredContact: {
      type: String,
    },

    message: {
      type: String,
      required: true,
    },

    status: {
      type: String,
      default: "new",
    },
  },
  {
    timestamps: true,
  },
);

module.exports = mongoose.model("Contact", contactSchema);
