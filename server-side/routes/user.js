// Importing necessary dependencies
const router = require("express").Router(); // Express router for defining routes

const Booking = require("../models/Booking"); // Importing Booking model for database operations
const User = require("../models/User"); // Importing User model for database operations
const Listing = require("../models/Listing"); // Importing Listing model for database operations

/* GET TRIP LIST Endpoint */
router.get("/:userId/trips", async (req, res) => {
  try {
    // Extracting userId from the request parameters
    const { userId } = req.params;

    // Finding trips associated with the customerId (userId) and populating related data
    const trips = await Booking.find({ customerId: userId }).populate("customerId hostId listingId");

    // Responding with the fetched trips
    res.status(202).json(trips);
  } catch (err) {
    // Error handling if fetching trips fails
    console.log(err); // Logging the error for debugging
    res.status(404).json({ message: "Can not find trips!", error: err.message }); // Sending an error response with an appropriate error message
  }
});

module.exports = router; // Exporting the router instance
