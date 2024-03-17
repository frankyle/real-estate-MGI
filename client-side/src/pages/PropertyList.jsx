// Importing the PropertyList component stylesheet
import "../styles/List.scss";
// Importing necessary hooks from react-redux: useDispatch for dispatching actions and useSelector for accessing the Redux store state
import { useDispatch, useSelector } from "react-redux";
// Importing components: Navbar, ListingCard, Loader, and Footer
import Navbar from "../components/Navbar";
import ListingCard from "../components/ListingCard";
import { useEffect, useState } from "react"; // Importing useEffect and useState hooks from React
import { setPropertyList } from "../redux/state"; // Importing the setPropertyList action creator
import Loader from "../components/Loader"; // Importing the Loader component
import Footer from "../components/Footer"; // Importing the Footer component

// Definition of the PropertyList component
const PropertyList = () => {
  // State variable to manage loading state
  const [loading, setLoading] = useState(true);
  // Accessing user data from the Redux store state
  const user = useSelector((state) => state.user);
  // Accessing the property list from the user data
  const propertyList = user?.propertyList;

  // Redux dispatch function
  const dispatch = useDispatch();

  // Function to fetch the property list data from the server
  const getPropertyList = async () => {
    try {
      // Sending a GET request to fetch property list data for the current user
      const response = await fetch(`http://localhost:3001/users/${user._id}/properties`, {
        method: "GET"
      });
      // Parsing the response JSON data
      const data = await response.json();
      // Dispatching the setPropertyList action to update the Redux store state with the fetched property list data
      dispatch(setPropertyList(data));
      // Updating the loading state to false after data fetching is complete
      setLoading(false);
    } catch (err) {
      // Handling errors if data fetching fails
      console.log("Fetch all properties failed", err.message);
    }
  }

  // useEffect hook to fetch property list data when the component mounts
  useEffect(() => {
    getPropertyList();
  }, []);

  // Rendering JSX content
  return loading ? ( // If loading state is true, render the Loader component
    <Loader />
  ) : (
    <> {/* Fragment shorthand syntax */}
      <Navbar /> {/* Rendering the Navbar component */}
      <h1 className="title-list">Your Property List</h1> {/* Title for the Property List */}
      <div className="list">
        {/* Mapping through the propertyList array and rendering a ListingCard component for each property */}
        {propertyList?.map(
          ({
            _id,
            creator,
            listingPhotoPaths,
            city,
            province,
            country,
            category,
            type,
            price,
            booking = false,
          }) => (
            <ListingCard
              key={_id} // Key prop for optimization and unique identification
              listingId={_id} // Listing ID
              creator={creator} // Creator ID
              listingPhotoPaths={listingPhotoPaths} // Photo paths for listing
              city={city} // City of listing
              province={province} // Province of listing
              country={country} // Country of listing
              category={category} // Category of listing
              type={type} // Type of listing
              price={price} // Price of listing
              booking={booking} // Booking status
            />
          )
        )}
      </div>

      <Footer /> {/* Rendering the Footer component */}
    </>
  );
};

export default PropertyList; // Exporting the PropertyList component for use in other parts of the application
