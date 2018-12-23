import mongoose from "mongoose";
import uuid from "uuid";
import validator from "validator";

const User = new mongoose.Schema(
  {
    userId: { type: String, default: uuid.v1 },
    name: String,
    email: {
      type: String,
      validate: {
        validator: v => validator.isEmail(v)
      },
      message: "{VALUE} is not a valid email",
      required: true
    },
    statusFlag: {
      type: Boolean,
      default: true
    },
    createdAt: { type: Date, default: null },
    updatedAt: { type: Date, default: null }
  },
  {
    timestamps: true
  }
);

export default User;
