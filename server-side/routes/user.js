// Importing the Router module from express
const router = require("express").Router();

// Importing the Booking, User, and Listing models
const Booking = require("../models/Booking");
const User = require("../models/User");
const Listing = require("../models/Listing");

/* GET TRIP LIST */
router.get("/:userId/trips", async (req, res) => {
  try {
    // Extracting the userId parameter from the request URL
    const { userId } = req.params;
    // Finding all bookings where the customerId matches the userId and populating related fields
    const trips = await Booking.find({ customerId: userId }).populate("customerId hostId listingId");
    // Sending the trips data as a JSON response
    res.status(202).json(trips);
  } catch (err) {
    // Handling errors and sending an error response if fetching trips fails
    console.log(err);
    res.status(404).json({ message: "Can not find trips!", error: err.message });
  }
});

/* ADD LISTING TO WISHLIST */
router.patch("/:userId/:listingId", async (req, res) => {
  try {
    // Extracting userId and listingId from request parameters
    const { userId, listingId } = req.params;
    // Finding the user and listing based on their IDs
    const user = await User.findById(userId);
    const listing = await Listing.findById(listingId).populate("creator");

    // Checking if the listing is already in the user's wishlist
    const favoriteListing = user.wishList.find((item) => item._id.toString() === listingId);

    // If the listing is already in the wishlist, remove it; otherwise, add it
    if (favoriteListing) {
      user.wishList = user.wishList.filter((item) => item._id.toString() !== listingId);
      await user.save();
      res.status(200).json({ message: "Listing is removed from wish list", wishList: user.wishList });
    } else {
      user.wishList.push(listing);
      await user.save();
      res.status(200).json({ message: "Listing is added to wish list", wishList: user.wishList });
    }
  } catch (err) {
    // Handling errors and sending an error response if the patch operation fails
    console.log(err);
    res.status(404).json({ error: err.message });
  }
});

/* GET PROPERTY LIST */
router.get("/:userId/properties", async (req, res) => {
  try {
    // Extracting the userId parameter from the request URL
    const { userId } = req.params;
    // Finding all listings created by the user and populating the creator field
    const properties = await Listing.find({ creator: userId }).populate("creator");
    // Sending the properties data as a JSON response
    res.status(202).json(properties);
  } catch (err) {
    // Handling errors and sending an error response if fetching properties fails
    console.log(err);
    res.status(404).json({ message: "Can not find properties!", error: err.message });
  }
});

/* GET RESERVATION LIST */
router.get("/:userId/reservations", async (req, res) => {
  try {
    // Extracting the userId parameter from the request URL
    const { userId } = req.params;
    // Finding all bookings where the hostId matches the userId and populating related fields
    const reservations = await Booking.find({ hostId: userId }).populate("customerId hostId listingId");
    // Sending the reservations data as a JSON response
    res.status(202).json(reservations);
  } catch (err) {
    // Handling errors and sending an error response if fetching reservations fails
    console.log(err);
    res.status(404).json({ message: "Can not find reservations!", error: err.message });
  }
});

// Exporting the router module for use in other parts of the application
module.exports = router;
