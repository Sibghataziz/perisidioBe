import mongoose from "mongoose";

const FlatSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
      required: true,
    },
    address1: {
      type: String,
      required: true,
    },
    address2: {
      type: String,
    },
    city: {
      type: String,
      required: true,
    },
    state: {
      type: String,
      required: true,
    },
    country: {
      type: String,
      required: true,
    },
    postCode: {
      type: String,
      required: true,
    },
    area: {
      type: Number,
      required: true,
    },
    numberOfBedrooms: {
      type: String,
      required: true,
    },
    numberOfWashroom: {
      type: Number,
      default: 1,
    },
    nearestHospitalDistance: {
      type: Number,
    },
    nearestCollegeDistance: {
      type: Number,
    },
  },
  {
    versionKey: false,
    timestamps: true,
  }
);
const FlatModel = mongoose.model("flat", FlatSchema);

export default FlatModel;
