const mongoose = require("mongoose");

const userObject = {};
// this addresses both auth20 and user innitated account creation
userObject.userSchema = new mongoose.Schema(
  {
    status: {
      type: String,
      enum: ["enabled", "disabled"],
      default: "enabled",
    },
    authDetail: {
      authProvider: {
        type: String,
        enum: ["google", "instagram", "facebook", "user"], //user  refers to situation where user creates account as against oauth authentication
        required: true,
      },
      authId: {
        type: String, //this is blank for user auth
      },
    },

    email: {
      address: { type: String, required: true, index: true, unique: true },
      verified: {
        //oauth email is auto verified. As such, default is true. but for user signup, false shoukd be passed
        type: Boolean,
        default: true,
      },
      verifiedDate: {
        type: Date,
        default: new Date(), // date defaulted for oauth but passed for user signup
      },
    },
    //this parameters are mostly blank for user initiated account
    firstName: { type: String },
    lastName: { type: String },
    photoIcon: { type: String },
    //stops here

    // password is blank for outh20 account created
    password: {
      type: String, //email only provided for user signup
    },

    //indicates whether application is complete or not. should be null for non tutors
    appStatusForTutor: {
      isComplete: {
        type: Boolean,
      },
      completionDate: {
        type: Date,
      },
    },

    role: [
      {
        type: String,
        enum: ["student", "tutor", "admin"],
      },
    ],
  },
  { timestamps: true }
);

userObject.userModel = mongoose.model("User", userObject.userSchema);

module.exports = userObject;
