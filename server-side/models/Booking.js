// Importing Mongoose dependency for MongoDB object modeling
const mongoose = require("mongoose");

// Defining the Booking Schema using Mongoose
const BookingSchema = new mongoose.Schema(
  {
    // Defining customerId field referencing the User model
    customerId: {
      type: mongoose.Schema.Types.ObjectId, // MongoDB ObjectId type
      ref: "User", // Referencing the User model
    },
    // Defining hostId field referencing the User model
    hostId: {
      type: mongoose.Schema.Types.ObjectId, // MongoDB ObjectId type
      ref: "User", // Referencing the User model
    },
    // Defining listingId field referencing the Listing model
    listingId: {
      type: mongoose.Schema.Types.ObjectId, // MongoDB ObjectId type
      ref: "Listing", // Referencing the Listing model
    },
    // Defining startDate field for the start date of the booking
    startDate: {
      type: String, // String type for storing dates
      required: true, // Making it a required field
    },
    // Defining endDate field for the end date of the booking
    endDate: {
      type: String, // String type for storing dates
      required: true, // Making it a required field
    },
    // Defining totalPrice field for the total price of the booking
    totalPrice: {
      type: Number, // Number type for storing numerical values
      required: true, // Making it a required field
    },
  },
  { timestamps: true } // Adding timestamps for createdAt and updatedAt fields
);

// Creating the Booking model using the Booking Schema
const Booking = mongoose.model("Booking", BookingSchema);

module.exports = Booking; // Exporting the Booking model for use in other parts of the application
