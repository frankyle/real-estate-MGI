// Importing necessary dependencies and components from React and other files
import { useEffect, useState } from "react";
import { categories } from "../data"; // Importing categories data from a file
import "../styles/Listings.scss"; // Importing component-specific styles
import ListingCard from "./ListingCard"; // Importing ListingCard component
import Loader from "./Loader"; // Importing Loader component
import { useDispatch, useSelector } from "react-redux"; // Importing Redux hooks for dispatching actions and accessing state
import { setListings } from "../redux/state"; // Importing action creator to set listings in Redux state

// Define the Listings component
const Listings = () => {
  const dispatch = useDispatch(); // Initializing dispatch hook to dispatch actions
  const [loading, setLoading] = useState(true); // State to manage loading state
  const [selectedCategory, setSelectedCategory] = useState("All"); // State to manage selected category
  const listings = useSelector((state) => state.listings); // Accessing listings from Redux state

  // Function to fetch listings based on selected category
  const getFeedListings = async () => {
    try {
      const response = await fetch(
        // Fetching listings based on selected category from a local server
        selectedCategory !== "All"
          ? `http://localhost:3001/properties?category=${selectedCategory}`
          : "http://localhost:3001/properties",
        {
          method: "GET",
        }
      );

      const data = await response.json(); // Parsing response data
      dispatch(setListings({ listings: data })); // Dispatching action to set listings in Redux state
      setLoading(false); // Updating loading state to false after fetching data
    } catch (err) {
      console.log("Fetch Listings Failed", err.message); // Logging error if fetching listings fails
    }
  };

  // useEffect hook to fetch listings when selectedCategory changes
  useEffect(() => {
    getFeedListings();
  }, [selectedCategory]);

  // Rendering JSX
  return (
    <>
      {/* Rendering category list */}
      <div className="category-list">
        {categories?.map((category, index) => (
          <div
            // Adding selected class if category is selected
            className={`category ${category.label === selectedCategory ? "selected" : ""}`}
            key={index}
            onClick={() => setSelectedCategory(category.label)} // Updating selectedCategory onClick
          >
            <div className="category_icon">{category.icon}</div> {/* Rendering category icon */}
            <p>{category.label}</p> {/* Rendering category label */}
          </div>
        ))}
      </div>

      {/* Rendering Loader component if loading, otherwise rendering listings */}
      {loading ? (
        <Loader />
      ) : (
        <div className="listings">
          {/* Mapping through listings array and rendering ListingCard component for each listing */}
          {listings.map(
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
              booking=false
            }) => (
              <ListingCard
                key={_id} // Unique key for each ListingCard
                listingId={_id}
                creator={creator}
                listingPhotoPaths={listingPhotoPaths}
                city={city}
                province={province}
                country={country}
                category={category}
                type={type}
                price={price}
                booking={booking}
              />
            )
          )}
        </div>
      )}
    </>
  );
};

export default Listings; // Exporting Listings component
