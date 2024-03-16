import "../styles/CreateListing.scss"; // Importing the styling for CreateListing component
import Navbar from "../components/Navbar"; // Importing Navbar component
import { categories, types, facilities } from "../data"; // Importing categories, types, and facilities data
import { RemoveCircleOutline, AddCircleOutline } from "@mui/icons-material"; // Icons for adding and removing circles
import variables from "../styles/variables.scss"; // Importing variables for styling
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd"; // Library for drag and drop functionality
import { IoIosImages } from "react-icons/io"; // Icon for images
import { useState } from "react"; // Using state in functional component
import { BiTrash } from "react-icons/bi"; // Icon for trash
import { useSelector } from "react-redux"; // Hook to access Redux store
import { useNavigate } from "react-router-dom"; // Hook for navigation
import Footer from "../components/Footer"; // Importing Footer component

const CreateListing = () => {
  // State variables initialization
  const [category, setCategory] = useState(""); // Selected category
  const [type, setType] = useState(""); // Selected type

  // State for form location
  const [formLocation, setFormLocation] = useState({
    streetAddress: "",
    aptSuite: "",
    city: "",
    province: "",
    country: "",
  });

  // Handler for location input change
  const handleChangeLocation = (e) => {
    const { name, value } = e.target;
    setFormLocation({
      ...formLocation,
      [name]: value,
    });
  };

  // State variables for basic counts
  const [guestCount, setGuestCount] = useState(1);
  const [bedroomCount, setBedroomCount] = useState(1);
  const [bedCount, setBedCount] = useState(1);
  const [bathroomCount, setBathroomCount] = useState(1);

  // State variable for amenities
  const [amenities, setAmenities] = useState([]);

  // Handler for selecting amenities
  const handleSelectAmenities = (facility) => {
    if (amenities.includes(facility)) {
      // If facility is already selected, remove it
      setAmenities((prevAmenities) =>
        prevAmenities.filter((option) => option !== facility)
      );
    } else {
      // If facility is not selected, add it
      setAmenities((prev) => [...prev, facility]);
    }
  };

  // State variable for photos
  const [photos, setPhotos] = useState([]);

  // Handler for uploading photos
  const handleUploadPhotos = (e) => {
    const newPhotos = e.target.files;
    setPhotos((prevPhotos) => [...prevPhotos, ...newPhotos]);
  };

  // Handler for dragging photos
  const handleDragPhoto = (result) => {
    if (!result.destination) return;

    const items = Array.from(photos);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);

    setPhotos(items);
  };

  // Handler for removing photos
  const handleRemovePhoto = (indexToRemove) => {
    setPhotos((prevPhotos) =>
      prevPhotos.filter((_, index) => index !== indexToRemove)
    );
  };

  // State variable for description
  const [formDescription, setFormDescription] = useState({
    title: "",
    description: "",
    highlight: "",
    highlightDesc: "",
    price: 0,
  });

  // Handler for description input change
  const handleChangeDescription = (e) => {
    const { name, value } = e.target;
    setFormDescription({
      ...formDescription,
      [name]: value,
    });
  };

  // Fetching creatorId from Redux store
  const creatorId = useSelector((state) => state.user._id);

  // Navigation hook
  const navigate = useNavigate();

  // Handler for submitting listing form
  const handlePost = async (e) => {
    e.preventDefault();

    try {
      // Create a new FormData object to handle file uploads
      const listingForm = new FormData();
      listingForm.append("creator", creatorId);
      // Append form data to FormData object
      listingForm.append("category", category);
      listingForm.append("type", type);
      listingForm.append("streetAddress", formLocation.streetAddress);
      listingForm.append("aptSuite", formLocation.aptSuite);
      listingForm.append("city", formLocation.city);
      listingForm.append("province", formLocation.province);
      listingForm.append("country", formLocation.country);
      listingForm.append("guestCount", guestCount);
      listingForm.append("bedroomCount", bedroomCount);
      listingForm.append("bedCount", bedCount);
      listingForm.append("bathroomCount", bathroomCount);
      listingForm.append("amenities", amenities);
      listingForm.append("title", formDescription.title);
      listingForm.append("description", formDescription.description);
      listingForm.append("highlight", formDescription.highlight);
      listingForm.append("highlightDesc", formDescription.highlightDesc);
      listingForm.append("price", formDescription.price);

      /* Append each selected photos to the FormData object */
      photos.forEach((photo) => {
        listingForm.append("listingPhotos", photo);
      });

      // Send a POST request to server
      const response = await fetch("http://localhost:3001/properties/create", {
        method: "POST",
        body: listingForm,
      });

      if (response.ok) {
        navigate("/");
      }
    } catch (err) {
      console.log("Publish Listing failed", err.message);
    }
  };

  // Front-end view
  return (
    <>
      <Navbar />
      {/* Container for creating a listing */}
      <div className="create-listing">
        <h1>Publish Your Place</h1>
        {/* Form for creating a listing */}
        <form onSubmit={handlePost}>
          {/* Step 1: Tell us about your place */}
          <div className="create-listing_step1">
            <h2>Step 1: Tell us about your place</h2>
            <hr /> {/* Horizontal line */}
            {/* Choose category */}
            <h3>Which of these categories best describes your place?</h3>
            <div className="category-list">
              {/* Display categories from data.js */}
              {categories?.map((item, index) => (
                <div
                  className={`category ${
                    category === item.label ? "selected" : ""
                  }`} // Apply 'selected' class if category is chosen
                  key={index} // Unique key for mapping
                  onClick={() => setCategory(item.label)} // Set selected category
                >
                  <div className="category_icon">{item.icon}</div>{" "}
                  {/* Category icon */}
                  <p>{item.label}</p> {/* Category label */}
                </div>
              ))}
            </div>
            {/* Choose type of place */}
            <h3>What type of place will guests have?</h3>
            <div className="type-list">
              {/* Display types from data.js */}
              {types?.map((item, index) => (
                <div
                  className={`type ${type === item.name ? "selected" : ""}`}
                  key={index} // Unique key for mapping
                  onClick={() => setType(item.name)} // Set selected type
                >
                  <div className="type_text">
                    <h4>{item.name}</h4> {/* Type name */}
                    <p>{item.description}</p> {/* Type description */}
                  </div>
                  <div className="type_icon">{item.icon}</div> {/* Type icon */}
                </div>
              ))}
            </div>
            {/* Location details */}
            <h3>Where's your place located?</h3>
            <div className="full">
              <div className="location">
                {/* Street address input */}
                <p>Street Address</p>
                <input
                  type="text"
                  placeholder="Street Address"
                  name="streetAddress"
                  value={formLocation.streetAddress}
                  onChange={handleChangeLocation}
                  required
                />
              </div>
            </div>
            {/* Divided in two columns */}
            <div className="half">
              <div className="location">
                {/* Apartment/Suite input */}
                <p>Apartment, Suite, etc. (if applicable)</p>
                <input
                  type="text"
                  placeholder="Apt, Suite, etc. (if applicable)"
                  name="aptSuite"
                  value={formLocation.aptSuite}
                  onChange={handleChangeLocation}
                  required
                />
              </div>
              <div className="location">
                {/* City input */}
                <p>City</p>
                <input
                  type="text"
                  placeholder="City"
                  name="city"
                  value={formLocation.city}
                  onChange={handleChangeLocation}
                  required
                />
              </div>
            </div>
            {/* Divided in two columns */}
            <div className="half">
              <div className="location">
                {/* Province input */}
                <p>Province</p>
                <input
                  type="text"
                  placeholder="Province"
                  name="province"
                  value={formLocation.province}
                  onChange={handleChangeLocation}
                  required
                />
              </div>
              <div className="location">
                {/* Country input */}
                <p>Country</p>
                <input
                  type="text"
                  placeholder="Country"
                  name="country"
                  value={formLocation.country}
                  onChange={handleChangeLocation}
                  required
                />
              </div>
            </div>
            {/* Basics about the place */}
            <h3>Share some basics about your place</h3>
            <div className="basics">
              {/* Guests count */}
              <div className="basic">
                <p>Guests</p>
                <div className="basic_count">
                  {/* Decrease guest count */}
                  <RemoveCircleOutline
                    onClick={() => {
                      guestCount > 1 && setGuestCount(guestCount - 1);
                    }}
                    sx={{
                      fontSize: "25px",
                      cursor: "pointer",
                      "&:hover": { color: variables.pinkred },
                    }}
                  />
                  <p>{guestCount}</p>
                  {/* Increase guest count */}
                  <AddCircleOutline
                    onClick={() => {
                      setGuestCount(guestCount + 1);
                    }}
                    sx={{
                      fontSize: "25px",
                      cursor: "pointer",
                      "&:hover": { color: variables.pinkred },
                    }}
                  />
                </div>
              </div>
              {/* Bedrooms count */}
              <div className="basic">
                <p>Bedrooms</p>
                <div className="basic_count">
                  {/* Decrease bedroom count */}
                  <RemoveCircleOutline
                    onClick={() => {
                      bedroomCount > 1 && setBedroomCount(bedroomCount - 1);
                    }}
                    sx={{
                      fontSize: "25px",
                      cursor: "pointer",
                      "&:hover": { color: variables.pinkred },
                    }}
                  />
                  <p>{bedroomCount}</p>
                  {/* Increase bedroom count */}
                  <AddCircleOutline
                    onClick={() => {
                      setBedroomCount(bedroomCount + 1);
                    }}
                    sx={{
                      fontSize: "25px",
                      cursor: "pointer",
                      "&:hover": { color: variables.pinkred },
                    }}
                  />
                </div>
              </div>
              {/* Beds count */}
              <div className="basic">
                <p>Beds</p>
                <div className="basic_count">
                  {/* Decrease bed count */}
                  <RemoveCircleOutline
                    onClick={() => {
                      bedCount > 1 && setBedCount(bedCount - 1);
                    }}
                    sx={{
                      fontSize: "25px",
                      cursor: "pointer",
                      "&:hover": { color: variables.pinkred },
                    }}
                  />
                  <p>{bedCount}</p>
                  {/* Increase bed count */}
                  <AddCircleOutline
                    onClick={() => {
                      setBedCount(bedCount + 1);
                    }}
                    sx={{
                      fontSize: "25px",
                      cursor: "pointer",
                      "&:hover": { color: variables.pinkred },
                    }}
                  />
                </div>
              </div>
              {/* Bathrooms count */}
              <div className="basic">
                <p>Bathrooms</p>
                <div className="basic_count">
                  {/* Decrease bathroom count */}
                  <RemoveCircleOutline
                    onClick={() => {
                      bathroomCount > 1 && setBathroomCount(bathroomCount - 1);
                    }}
                    sx={{
                      fontSize: "25px",
                      cursor: "pointer",
                      "&:hover": { color: variables.pinkred },
                    }}
                  />
                  <p>{bathroomCount}</p>
                  {/* Increase bathroom count */}
                  <AddCircleOutline
                    onClick={() => {
                      setBathroomCount(bathroomCount + 1);
                    }}
                    sx={{
                      fontSize: "25px",
                      cursor: "pointer",
                      "&:hover": { color: variables.pinkred },
                    }}
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Step 2: Make your place stand out */}
          <div className="create-listing_step2">
            <h2>Step 2: Make your place stand out</h2>
            <hr /> {/* Horizontal line */}
            {/* Describe amenities */}
            <h3>Tell guests what your place has to offer</h3>
            <div className="amenities">
              {/* Display facilities from data.js */}
              {facilities?.map((item, index) => (
                <div
                  className={`facility ${
                    amenities.includes(item.name) ? "selected" : ""
                  }`} // Apply 'selected' class if facility is chosen
                  key={index} // Unique key for mapping
                  onClick={() => handleSelectAmenities(item.name)} // Handle facility selection
                >
                  <div className="facility_icon">{item.icon}</div>{" "}
                  {/* Facility icon */}
                  <p>{item.name}</p> {/* Facility name */}
                </div>
              ))}
            </div>
            {/* Add photos of the place */}
            <h3>Add some photos of your place</h3>
            {/* Using react-beautiful-dnd for drag and drop effect */}
            <DragDropContext onDragEnd={handleDragPhoto}>
              {/* Droppable area */}
              <Droppable droppableId="photos" direction="horizontal">
                {/* Horizontal droppable area */}
                {(provided) => (
                  <div
                    className="photos"
                    {...provided.droppableProps}
                    ref={provided.innerRef}
                  >
                    {/* If no photos are selected, show default icon image */}
                    {photos.length < 1 && (
                      <>
                        <input
                          id="image"
                          type="file"
                          style={{ display: "none" }}
                          accept="image/*"
                          onChange={handleUploadPhotos}
                          multiple
                        />
                        <label htmlFor="image" className="alone">
                          <div className="icon">
                            <IoIosImages />
                          </div>
                          <p>Upload from your device</p>
                        </label>
                      </>
                    )}
                    {/* After selecting some images */}
                    {photos.length >= 1 && (
                      <>
                        {photos.map((photo, index) => (
                          <Draggable
                            key={index} // Unique key for mapping
                            draggableId={`photo-${index}`} // Ensure draggableId is unique
                            index={index}
                          >
                            {(provided) => (
                              <div
                                className="photo"
                                ref={provided.innerRef}
                                {...provided.draggableProps}
                                {...provided.dragHandleProps}
                              >
                                {/* Display the photo */}
                                <img
                                  src={URL.createObjectURL(photo)}
                                  alt="place"
                                />
                                {/* Button to remove photo */}
                                <button
                                  type="button"
                                  onClick={() => handleRemovePhoto(index)}
                                >
                                  <BiTrash />
                                </button>
                              </div>
                            )}
                          </Draggable>
                        ))}
                        <input
                          id="image"
                          type="file"
                          style={{ display: "none" }}
                          accept="image/*"
                          onChange={handleUploadPhotos}
                          multiple
                        />
                        <label htmlFor="image" className="together">
                          <div className="icon">
                            <IoIosImages />
                          </div>
                          <p>Upload from your device</p>
                        </label>
                      </>
                    )}
                  </div>
                )}
              </Droppable>
            </DragDropContext>
            {/* Describe what makes the place attractive and exciting */}
            <h3>What make your place attractive and exciting?</h3>
            <div className="description">
              {/* Title input */}
              <p>Title</p>
              <input
                type="text"
                placeholder="Title"
                name="title"
                value={formDescription.title}
                onChange={handleChangeDescription}
                required
              />
              {/* Description input */}
              <p>Description</p>
              <textarea
                type="text"
                placeholder="Description"
                name="description"
                value={formDescription.description}
                onChange={handleChangeDescription}
                required
              />
              {/* Highlight input */}
              <p>Highlight</p>
              <input
                type="text"
                placeholder="Highlight"
                name="highlight"
                value={formDescription.highlight}
                onChange={handleChangeDescription}
                required
              />
              {/* Highlight details input */}
              <p>Highlight details</p>
              <textarea
                type="text"
                placeholder="Highlight details"
                name="highlightDesc"
                value={formDescription.highlightDesc}
                onChange={handleChangeDescription}
                required
              />
              {/* Price input */}
              <p>Now, set your PRICE</p>
              <span>$</span>
              <input
                type="number"
                placeholder="100"
                name="price"
                value={formDescription.price}
                onChange={handleChangeDescription}
                className="price"
                required
              />
            </div>
          </div>

          {/* Submit button */}
          <button className="submit_btn" type="submit">
            CREATE YOUR LISTING
          </button>
        </form>
      </div>
      <Footer /> {/* Footer component */}
    </>
  );
};

export default CreateListing;
