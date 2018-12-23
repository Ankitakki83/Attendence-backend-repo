import mongoose from "mongoose";
import uuid from "uuid";

const Attendance = new mongoose.Schema(
  {
    attendanceId: { type: String, default: uuid.v1 },
    userId: {
      type: String,
      default: null
    },
    attendanceType: { type: String, enum: ["PRESENT", "ABSENT"] },
    date: { type: Date }
  },
  {
    timestamps: true,
    toObject: { virtuals: true },
    toJSON: { virtuals: true }
  }
);
Attendance.virtual("user", {
  ref: "user",
  localField: "userId",
  foreignField: "userId"
});
export default Attendance;
