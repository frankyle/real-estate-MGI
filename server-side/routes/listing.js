// Importing necessary dependencies
const router = require("express").Router(); // Express router for defining routes
const multer = require("multer"); // Middleware for handling file uploads

const Listing = require("../models/Listing"); // Importing Listing model for database operations

/* Configuration Multer for File Upload */
const storage = multer.diskStorage({
  // Configuring storage destination and filename for uploaded files
  destination: function (req, file, cb) {
    cb(null, "public/uploads/"); // Store uploaded files in the 'uploads' folder
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname); // Use the original file name
  },
});

const upload = multer({ storage }); // Initializing Multer with the configured storage

/* CREATE LISTING Endpoint */
router.post("/create", upload.array("listingPhotos"), async (req, res) => {
  try {
    // Extracting data from the request body
    const {
      creator,
      category,
      type,
      streetAddress,
      aptSuite,
      city,
      province,
      country,
      guestCount,
      bedroomCount,
      bedCount,
      bathroomCount,
      amenities,
      title,
      description,
      highlight,
      highlightDesc,
      price,
    } = req.body;

    const listingPhotos = req.files; // Extracting uploaded files

    if (!listingPhotos) {
      return res.status(400).send("No file uploaded."); // Error handling if no file is uploaded
    }

    // Mapping uploaded files to their paths
    const listingPhotoPaths = listingPhotos.map((file) => file.path);

    // Creating a new listing instance
    const newListing = new Listing({
      creator,
      category,
      type,
      streetAddress,
      aptSuite,
      city,
      province,
      country,
      guestCount,
      bedroomCount,
      bedCount,
      bathroomCount,
      amenities,
      listingPhotoPaths,
      title,
      description,
      highlight,
      highlightDesc,
      price,
    });

    // Saving the new listing to the database
    await newListing.save();

    // Responding with the created listing
    res.status(200).json(newListing);
  } catch (err) {
    // Error handling if listing creation fails
    res
      .status(409)
      .json({ message: "Fail to create Listing", error: err.message });
    console.log(err);
  }
});

/* GET LISTINGS BY CATEGORY Endpoint */
router.get("/", async (req, res) => {
  // Extracting query parameter for category filtering
  const qCategory = req.query.category;

  try {
    let listings;

    // Fetching listings based on category query parameter
    if (qCategory) {
      listings = await Listing.find({ category: qCategory }).populate("creator");
    } else {
      listings = await Listing.find().populate("creator");
    }

    // Responding with the fetched listings
    res.status(200).json(listings);
  } catch (err) {
    // Error handling if fetching listings fails
    res
      .status(404)
      .json({ message: "Fail to fetch listings", error: err.message });
    console.log(err);
  }
});

/* GET LISTINGS BY SEARCH Endpoint */
router.get("/search/:search", async (req, res) => {
  // Extracting search term from URL parameters
  const { search } = req.params;

  try {
    let listings = [];

    // Searching listings based on the provided search term
    if (search === "all") {
      listings = await Listing.find().populate("creator");
    } else {
      listings = await Listing.find({
        $or: [
          { category: { $regex: search, $options: "i" } },
          { title: { $regex: search, $options: "i" } },
        ],
      }).populate("creator");
    }

    // Responding with the matching listings
    res.status(200).json(listings);
  } catch (err) {
    // Error handling if fetching listings fails
    res
      .status(404)
      .json({ message: "Fail to fetch listings", error: err.message });
    console.log(err);
  }
});

/* GET LISTING DETAILS Endpoint */
router.get("/:listingId", async (req, res) => {
  try {
    // Extracting listing ID from URL parameters
    const { listingId } = req.params;

    // Finding the listing by its ID and populating the creator field
    const listing = await Listing.findById(listingId).populate("creator");

    // Responding with the listing details
    res.status(202).json(listing);
  } catch (err) {
    // Error handling if fetching listing details fails
    res
      .status(404)
      .json({ message: "Listing can not found!", error: err.message });
  }
});

module.exports = router; // Exporting the router instance
