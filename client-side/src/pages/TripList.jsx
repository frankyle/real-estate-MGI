// Importing necessary dependencies
import { useEffect, useState } from "react"; // React hooks for managing component state and lifecycle
import "../styles/List.scss"; // Importing stylesheet
import Loader from "../components/Loader"; // Importing Loader component
import Navbar from "../components/Navbar"; // Importing Navbar component
import { useDispatch, useSelector } from "react-redux"; // Redux hooks for accessing Redux store
import { setTripList } from "../redux/state"; // Importing Redux action creator
import ListingCard from "../components/ListingCard"; // Importing ListingCard component
import Footer from "../components/Footer"; // Importing Footer component

// TripList component definition
const TripList = () => {
  // State variables using useState hook
  const [loading, setLoading] = useState(true); // State for loading indicator
  // Retrieving user ID from Redux store
  const userId = useSelector((state) => state.user._id); 
  // Retrieving trip list from Redux store
  const tripList = useSelector((state) => state.user.tripList);

  // Redux dispatch hook
  const dispatch = useDispatch();

  // Function to fetch trip list from server
  const getTripList = async () => {
    try {
      const response = await fetch(
        `http://localhost:3001/users/${userId}/trips`,
        {
          method: "GET",
        }
      );

      const data = await response.json();
      // Dispatching action to update trip list in Redux store
      dispatch(setTripList(data));
      setLoading(false); // Setting loading state to false after data is fetched
    } catch (err) {
      console.log("Fetch Trip List failed!", err.message);
    }
  };

  // useEffect hook to fetch trip list when component mounts
  useEffect(() => {
    getTripList(); // Calling getTripList function
  }, []);

  // JSX content to be rendered
  return loading ? ( // If loading state is true, render Loader component
    <Loader />
  ) : ( // If loading state is false, render trip list
    <>
      <Navbar /> {/* Rendering Navbar component */}
      <h1 className="title-list">Your Trip List</h1> {/* Title for trip list */}
      <div className="list">
        {tripList?.map(({ listingId, hostId, startDate, endDate, totalPrice, booking=true }) => (
          <ListingCard // Rendering ListingCard component for each trip
            key={listingId._id} // Key prop for optimization and unique identification
            listingId={listingId._id} // Listing ID
            creator={hostId._id} // Host ID
            listingPhotoPaths={listingId.listingPhotoPaths} // Photo paths for listing
            city={listingId.city} // City of listing
            province={listingId.province} // Province of listing
            country={listingId.country} // Country of listing
            category={listingId.category} // Category of listing
            startDate={startDate} // Start date of trip
            endDate={endDate} // End date of trip
            totalPrice={totalPrice} // Total price of trip
            booking={booking} // Booking status
          />
        ))}
      </div>
      <Footer /> {/* Rendering Footer component */}
    </>
  );
};

export default TripList; // Exporting TripList component
