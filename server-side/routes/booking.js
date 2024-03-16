// Importing necessary dependencies
const router = require("express").Router(); // Express router for defining routes

const Booking = require("../models/Booking"); // Importing Booking model for database operations

/* CREATE BOOKING Endpoint */
router.post("/create", async (req, res) => {
  try {
    // Extracting data from the request body
    const { customerId, hostId, listingId, startDate, endDate, totalPrice } = req.body;

    // Creating a new booking instance
    const newBooking = new Booking({ customerId, hostId, listingId, startDate, endDate, totalPrice });

    // Saving the new booking to the database
    await newBooking.save();

    // Responding with the created booking
    res.status(200).json(newBooking);
  } catch (err) {
    // Error handling if booking creation fails
    console.log(err); // Logging the error for debugging
    res.status(400).json({ message: "Fail to create a new Booking!", error: err.message }); // Sending an error response with an error message
  }
});

module.exports = router; // Exporting the router instance
