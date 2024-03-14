const mongoose = require("mongoose")

const UserSchema = new mongoose.Schema(
  {

    // These are inputs during Registration of the user
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    profileImagePath: {
      type: String,
      default: "",
    },
    // ****************************************
    
    // These are details of the user after login
    tripList: {
      type: Array,
      default: [],
    },
    wishList: {
      type: Array,
      default: [],
    },
    propertyList: {
      type: Array,
      default: [],
    },
    reservationList: {
      type: Array,
      default: [],
    }
    // ****************************************

  },
  { timestamps: true }
)

const User = mongoose.model("User", UserSchema)
module.exports = User