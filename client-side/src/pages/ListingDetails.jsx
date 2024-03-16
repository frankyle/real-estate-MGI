// Importing necessary dependencies and components
import { useEffect, useState } from "react"; // Importing React hooks
import "../styles/ListingDetails.scss"; // Importing component-specific styles
import { useNavigate, useParams } from "react-router-dom"; // Importing hooks for navigation and accessing route parameters
import { facilities } from "../data"; // Importing facilities data
import "react-date-range/dist/styles.css"; // Importing styles for date range picker
import "react-date-range/dist/theme/default.css"; // Importing default theme for date range picker
import { DateRange } from "react-date-range"; // Importing date range picker component
import Loader from "../components/Loader"; // Importing Loader component
import Navbar from "../components/Navbar"; // Importing Navbar component
import { useSelector } from "react-redux"; // Importing Redux hook for accessing state
import Footer from "../components/Footer"; // Importing Footer component

// Define the ListingDetails component
const ListingDetails = () => {
  // State variables
  const [loading, setLoading] = useState(true); // State for loading status
  const { listingId } = useParams(); // Getting listingId from route parameters
  const [listing, setListing] = useState(null); // State for storing listing details
  const [dateRange, setDateRange] = useState([ // State for managing selected date range
    {
      startDate: new Date(),
      endDate: new Date(),
      key: "selection",
    },
  ]);

  // Hook for programmatic navigation
  const navigate = useNavigate();

  // Effect hook to fetch listing details when component mounts
  useEffect(() => {
    const getListingDetails = async () => {
      try {
        const response = await fetch(
          `http://localhost:3001/properties/${listingId}`,
          {
            method: "GET",
          }
        );

        const data = await response.json();
        setListing(data);
        setLoading(false);
      } catch (err) {
        console.log("Fetch Listing Details Failed", err.message);
      }
    };

    getListingDetails();
  }, []);

  // Function to handle date range selection
  const handleSelect = (ranges) => {
    setDateRange([ranges.selection]);
  };

  // Calculating number of days in the selected date range
  const start = new Date(dateRange[0].startDate);
  const end = new Date(dateRange[0].endDate);
  const dayCount = Math.round(end - start) / (1000 * 60 * 60 * 24); // Calculate the difference in day unit

  // Redux hook to get customer ID
  const customerId = useSelector((state) => state?.user?._id);

  // Function to handle booking submission
  const handleSubmit = async () => {
    try {
      const bookingForm = {
        customerId,
        listingId,
        hostId: listing.creator._id,
        startDate: dateRange[0].startDate.toDateString(),
        endDate: dateRange[0].endDate.toDateString(),
        totalPrice: listing.price * dayCount,
      };

      const response = await fetch("http://localhost:3001/bookings/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(bookingForm),
      });

      if (response.ok) {
        navigate(`/${customerId}/trips`); // Redirect to trips page after successful booking
      }
    } catch (err) {
      console.log("Submit Booking Failed.", err.message);
    }
  };

  // Rendering JSX
  return loading ? (
    <Loader /> // Display loader while fetching data
  ) : (
    <>
      <Navbar /> {/* Render Navbar component */}
      
      <div className="listing-details">
        {/* Render listing details */}
        <div className="title">
          <h1>{listing.title}</h1>
          <div></div>
        </div>

        <div className="photos">
          {/* Render listing photos */}
          {listing.listingPhotoPaths?.map((item) => (
            <img
              key={item}
              src={`http://localhost:3001/${item.replace("public", "")}`}
              alt="listing photo"
            />
          ))}
        </div>

        {/* Render listing information */}
        <h2>
          {listing.type} in {listing.city}, {listing.province},{" "}
          {listing.country}
        </h2>
        <p>
          {listing.guestCount} guests - {listing.bedroomCount} bedroom(s) -{" "}
          {listing.bedCount} bed(s) - {listing.bathroomCount} bathroom(s)
        </p>
        <hr />

        <div className="profile">
          <img
            src={`http://localhost:3001/${listing.creator.profileImagePath.replace(
              "public",
              ""
            )}`}
            alt="host profile"
          />
          <h3>
            Hosted by {listing.creator.firstName} {listing.creator.lastName}
          </h3>
        </div>
        <hr />

        {/* Render description */}
        <h3>Description</h3>
        <p>{listing.description}</p>
        <hr />

        <h3>{listing.highlight}</h3>
        <p>{listing.highlightDesc}</p>
        <hr />

        {/* Render booking section */}
        <div className="booking">
          <div>
            <h2>What this place offers?</h2>
            <div className="amenities">
              {/* Render listing amenities */}
              {listing.amenities[0].split(",").map((item, index) => (
                <div className="facility" key={index}>
                  <div className="facility_icon">
                    {
                      facilities.find((facility) => facility.name === item)
                        ?.icon
                    }
                  </div>
                  <p>{item}</p>
                </div>
              ))}
            </div>
          </div>

          <div>
            {/* Render date range calendar */}
            <h2>How long do you want to stay?</h2>
            <div className="date-range-calendar">
              <DateRange ranges={dateRange} onChange={handleSelect} />
              {dayCount > 1 ? (
                <h2>
                  ${listing.price} x {dayCount} nights
                </h2>
               ) : (
                <h2>
                  ${listing.price} x {dayCount} night
                </h2>
              )}

              <h2>Total price: ${listing.price * dayCount}</h2>
              <p>Start Date: {dateRange[0].startDate.toDateString()}</p>
              <p>End Date: {dateRange[0].endDate.toDateString()}</p>

              {/* Render booking button */}
              <button className="button" type="submit" onClick={handleSubmit}>
                BOOKING
              </button>
            </div>
          </div>
        </div>
      </div>

      <Footer /> {/* Render Footer component */}
    </>
  );
};

export default ListingDetails; // Export ListingDetails component
