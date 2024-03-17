// Importing necessary dependencies
import { useEffect, useState } from "react"; // React hooks for managing component state and lifecycle
import "../styles/List.scss"; // Importing stylesheet
import Loader from "../components/Loader"; // Importing Loader component
import Navbar from "../components/Navbar"; // Importing Navbar component
import { useDispatch, useSelector } from "react-redux"; // Redux hooks for accessing Redux store
import { setReservationList } from "../redux/state"; // Importing Redux action creator
import ListingCard from "../components/ListingCard"; // Importing ListingCard component
import Footer from "../components/Footer"; // Importing Footer component

// ReservationList component definition
const ReservationList = () => {
  // State variable for loading indicator
  const [loading, setLoading] = useState(true);
  // Retrieving user ID from Redux store
  const userId = useSelector((state) => state.user._id);
  // Retrieving reservation list from Redux store
  const reservationList = useSelector((state) => state.user.reservationList);

  // Redux dispatch hook
  const dispatch = useDispatch();

  // Function to fetch reservation list from the server
  const getReservationList = async () => {
    try {
      const response = await fetch(
        `http://localhost:3001/users/${userId}/reservations`,
        {
          method: "GET",
        }
      );

      const data = await response.json();
      // Dispatching action to update reservation list in Redux store
      dispatch(setReservationList(data));
      setLoading(false); // Setting loading state to false after data is fetched
    } catch (err) {
      console.log("Fetch Reservation List failed!", err.message);
    }
  };

  // useEffect hook to fetch reservation list when component mounts
  useEffect(() => {
    getReservationList(); // Calling getReservationList function
  }, []);

  // JSX content to be rendered
  return loading ? ( // If loading state is true, render Loader component
    <Loader />
  ) : ( // If loading state is false, render reservation list
    <>
      <Navbar /> {/* Rendering Navbar component */}
      <h1 className="title-list">Your Reservation List</h1> {/* Title for reservation list */}
      <div className="list">
        {reservationList?.map(({ listingId, hostId, startDate, endDate, totalPrice, booking=true }) => (
          <ListingCard // Rendering ListingCard component for each reservation
            key={listingId._id} // Key prop for optimization and unique identification
            listingId={listingId._id} // Listing ID
            creator={hostId._id} // Host ID
            listingPhotoPaths={listingId.listingPhotoPaths} // Photo paths for listing
            city={listingId.city} // City of listing
            province={listingId.province} // Province of listing
            country={listingId.country} // Country of listing
            category={listingId.category} // Category of listing
            startDate={startDate} // Start date of reservation
            endDate={endDate} // End date of reservation
            totalPrice={totalPrice} // Total price of reservation
            booking={booking} // Booking status
          />
        ))}
      </div>
      <Footer /> {/* Rendering Footer component */}
    </>
  );
};

export default ReservationList; // Exporting ReservationList component
