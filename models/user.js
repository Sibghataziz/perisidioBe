import mongoose from "mongoose";
import { UserTypes } from "../Constants/user.js";

const userSchema = new mongoose.Schema(
  {
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
    },
    phoneNumber: {
        type: String,
        required: true,
    },
    userType: {
        type: String,
        enum: Object.values(UserTypes),
        required: true,
    },
    password: {
      type: String,
      required: true,
    }
  },
  {
    versionKey: false,
    timestamps: true
  }
);
const UserModel = mongoose.model("users", userSchema);

export default UserModel;
