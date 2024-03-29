// Importing the createSlice function from the Redux Toolkit library
import { createSlice } from "@reduxjs/toolkit";

// This is the initial state of our Redux store, where we define what data we want to manage globally
const initialState = {
  user: null,   // Represents the logged-in user
  token: null   // Represents the authentication token for the user
};

// Creating a slice of our Redux store called 'userSlice' using the createSlice function
export const userSlice = createSlice({
  name: "user",   // The name of the slice
  initialState,   // The initial state defined above
  reducers: {
    // Action to set user login details (user and token) into the Redux store
    setLogin: (state, action) => {
      state.user = action.payload.user;   // Set the user
      state.token = action.payload.token; // Set the token
    },

    // Action to clear user login details (user and token) from the Redux store, essentially logging out the user
    setLogout: (state) => {
      state.user = null;   // Clear the user
      state.token = null;  // Clear the token
    },

    // Action to set listings data into the Redux store
    setListings: (state, action) => {
      state.listings = action.payload.listings;  // Set the listings data
    },

    // Action to set trip list data for a specific user into the Redux store
    setTripList: (state, action) => {
      state.user.tripList = action.payload;  // Set the trip list data for the user
    },

    // Action to set wishlist data for a specific user into the Redux store
    setWishList: (state, action) => {
      state.user.wishList = action.payload;  // Set the wishlist data for the user
    },

    // Action to set property list data for a specific user into the Redux store
    setPropertyList: (state, action) => {
      state.user.propertyList = action.payload;  // Set the property list data for the user
    },

    // Action to set reservation list data for a specific user into the Redux store
    setReservationList: (state, action) => {
      state.user.reservationList = action.payload;  // Set the reservation list data for the user
    }
  }
});

// Extracting the action creators generated by createSlice for easier use
export const { setLogin, setLogout, setListings, setTripList, setWishList, setPropertyList, setReservationList } = userSlice.actions;

// Exporting the reducer function generated by createSlice
export default userSlice.reducer;
