// Importing necessary dependencies
import { useParams } from "react-router-dom"; // React hook for accessing route parameters
import "../styles/List.scss"; // Importing stylesheet
import { useSelector, useDispatch } from "react-redux"; // Redux hooks for accessing Redux store and dispatching actions
import { setListings } from "../redux/state"; // Importing Redux action creator
import { useEffect, useState } from "react"; // React hooks for managing component state and lifecycle
import Loader from "../components/Loader"; // Importing Loader component
import Navbar from "../components/Navbar"; // Importing Navbar component
import ListingCard from "../components/ListingCard"; // Importing ListingCard component
import Footer from "../components/Footer"; // Importing Footer component

// SearchPage component definition
const SearchPage = () => {
  // State variable for loading indicator
  const [loading, setLoading] = useState(true);
  // Retrieving search query from route parameters
  const { search } = useParams();
  // Retrieving listings from Redux store
  const listings = useSelector((state) => state.listings);
  // Redux dispatch hook
  const dispatch = useDispatch();

  // Function to fetch search listings from the server
  const getSearchListings = async () => {
    try {
      const response = await fetch(`http://localhost:3001/properties/search/${search}`, {
        method: "GET"
      });

      const data = await response.json();
      // Dispatching action to update listings in Redux store
      dispatch(setListings({ listings: data }));
      setLoading(false); // Setting loading state to false after data is fetched
    } catch (err) {
      console.log("Fetch Search List failed!", err.message);
    }
  };

  // useEffect hook to fetch search listings when component mounts or search query changes
  useEffect(() => {
    getSearchListings(); // Calling getSearchListings function
  }, [search]); // Dependency array includes search, so the effect runs when search changes

  // JSX content to be rendered
  return loading ? ( // If loading state is true, render Loader component
    <Loader />
  ) : ( // If loading state is false, render search results
    <>
      <Navbar /> {/* Rendering Navbar component */}
      <h1 className="title-list">{search}</h1> {/* Title with search query */}
      <div className="list">
        {listings?.map(({ _id, creator, listingPhotoPaths, city, province, country, category, type, price, booking = false }) => (
          <ListingCard // Rendering ListingCard component for each search result
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
        ))}
      </div>
      <Footer /> {/* Rendering Footer component */}
    </>
  );
};

export default SearchPage; // Exporting SearchPage component
