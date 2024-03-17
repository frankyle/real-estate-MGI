// Importing the WishList component stylesheet
import "../styles/List.scss";
// Importing the useSelector hook from react-redux for accessing the Redux store state
import { useSelector } from "react-redux";
// Importing components: Navbar, ListingCard, and Footer
import Navbar from "../components/Navbar";
import ListingCard from "../components/ListingCard";
import Footer from "../components/Footer";

// Definition of the WishList component
const WishList = () => {
  // Retrieving the user's wish list from the Redux store state
  const wishList = useSelector((state) => state.user.wishList);

  // Rendering JSX content
  return (
    <>
      <Navbar /> {/* Rendering the Navbar component */}
      <h1 className="title-list">Your Wish List</h1> {/* Title for the Wish List */}
      <div className="list">
        {/* Mapping through the wishList array and rendering a ListingCard component for each item */}
        {wishList?.map(
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

export default WishList; // Exporting the WishList component for use in other parts of the application
