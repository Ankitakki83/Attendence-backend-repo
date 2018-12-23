import BaseModel from "./BaseModel";
import { ApplicationError } from "../lib/errors";
import { default as attendanceSchema } from "../schemas/attendance.schema";
import { default as userSchema } from "../schemas/user.schema";

export default class ComplaintModel extends BaseModel {
  constructor(connection) {
    super("attendance", connection);
    this.schema = attendanceSchema;
    this.name = "attendance";
    this.model = this.connection.model(this.name, this.schema);
    this.userModel = this.connection.model("user", userSchema);
  }
  async create(attendanceObj) {
    try {
      let isAttendenceAvail = await this.model.findOne({
        userId: attendanceObj.userId,
        date: attendanceObj.date
      });

      if (isAttendenceAvail) {
        return { errorMsg: "ATTEN100" };
      }
      const attendance = await this.model.create(attendanceObj);

      if (!attendance) {
        return null;
      }

      return attendance._doc;
    } catch (error) {
      throw new ApplicationError(error, 500, {});
    }
  }

  async getByUserId(userId) {
    try {
      const attendances = await this.model.find({
        userId: userId
      });
      return attendances;
    } catch (error) {
      throw new ApplicationError(error, 500, {});
    }
  }
}
