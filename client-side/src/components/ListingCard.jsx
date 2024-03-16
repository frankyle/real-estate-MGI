// Importing necessary dependencies and components
import { useState } from "react"; // Importing useState hook from React
import "../styles/ListingCard.scss"; // Importing component-specific styles
import { ArrowForwardIos, ArrowBackIosNew, Favorite } from "@mui/icons-material"; // Importing icons from MUI
import { useNavigate } from "react-router-dom"; // Importing useNavigate hook from react-router-dom
import { useSelector, useDispatch } from "react-redux"; // Importing Redux hooks for accessing state and dispatching actions
import { setWishList } from "../redux/state"; // Importing action creator to set wishlist in Redux state

// Define the ListingCard component
const ListingCard = ({
  listingId,
  creator,
  listingPhotoPaths,
  city,
  province,
  country,
  category,
  type,
  price,
  startDate,
  endDate,
  totalPrice,
  booking,
}) => {
  // State for managing current index of the image slider
  const [currentIndex, setCurrentIndex] = useState(0);

  // Function to navigate to the previous slide in the image slider
  const goToPrevSlide = () => {
    setCurrentIndex(
      (prevIndex) =>
        (prevIndex - 1 + listingPhotoPaths.length) % listingPhotoPaths.length
    );
  };

  // Function to navigate to the next slide in the image slider
  const goToNextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % listingPhotoPaths.length);
  };

  // Hook for programmatic navigation
  const navigate = useNavigate();

  // Redux hooks for accessing user and dispatch function
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  
  // Accessing wishlist from user state
  const wishList = user?.wishList || [];

  // Checking if the listing is already in the wishlist
  const isLiked = wishList?.find((item) => item?._id === listingId);

  // Function to add or remove listing from wishlist
  const patchWishList = async () => {
    if (user?._id !== creator._id) {
      const response = await fetch(
        `http://localhost:3001/users/${user?._id}/${listingId}`,
        {
          method: "PATCH",
          header: {
            "Content-Type": "application/json",
          },
        }
      );
      const data = await response.json();
      dispatch(setWishList(data.wishList));
    } else {
      return;
    }
  };

  // Rendering JSX
  return (
    <div
      className="listing-card"
      onClick={() => {
        navigate(`/properties/${listingId}`); // Navigating to property details page on click
      }}
    >
      {/* Image slider */}
      <div className="slider-container">
        <div
          className="slider"
          style={{ transform: `translateX(-${currentIndex * 100}%)` }}
        >
          {listingPhotoPaths?.map((photo, index) => (
            <div key={index} className="slide">
              <img
                src={`http://localhost:3001/${photo?.replace("public", "")}`}
                alt={`photo ${index + 1}`}
              />
              {/* Previous button */}
              <div
                className="prev-button"
                onClick={(e) => {
                  e.stopPropagation();
                  goToPrevSlide(e);
                }}
              >
                <ArrowBackIosNew sx={{ fontSize: "15px" }} />
              </div>
              {/* Next button */}
              <div
                className="next-button"
                onClick={(e) => {
                  e.stopPropagation();
                  goToNextSlide(e);
                }}
              >
                <ArrowForwardIos sx={{ fontSize: "15px" }} />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Listing details */}
      <h3>
        {city}, {province}, {country}
      </h3>
      <p>{category}</p>
      {!booking ? (
        <>
          {/* Regular listing details */}
          <p>{type}</p>
          <p>
            <span>${price}</span> per night
          </p>
        </>
      ) : (
        <>
          {/* Booking details */}
          <p>
            {startDate} - {endDate}
          </p>
          <p>
            <span>${totalPrice}</span> total
          </p>
        </>
      )}

      {/* Wishlist button */}
      <button
        className="favorite"
        onClick={(e) => {
          e.stopPropagation();
          patchWishList();
        }}
        disabled={!user}
      >
        {/* Rendering different icon based on whether the listing is liked */}
        {isLiked ? (
          <Favorite sx={{ color: "red" }} />
        ) : (
          <Favorite sx={{ color: "white" }} />
        )}
      </button>
    </div>
  );
};

export default ListingCard; // Exporting ListingCard component
