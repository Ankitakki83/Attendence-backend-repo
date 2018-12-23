import { route } from ".";
import AttendanceModel from "../db/AttendanceModel";
import { ApplicationError } from "../lib/errors";

export const create = route(async (req, res) => {
  const attendanceModel = new AttendanceModel();
  try {
    const commentInformation = req.body;

    const comment = await attendanceModel.create(commentInformation);

    res.send({ results: comment });
  } catch (error) {
    throw new ApplicationError(error, 500, {});
  }
});

export const getByUserId = route(async (req, res) => {
  const attendanceModel = new AttendanceModel();
  try {
    let userId = req.params.userId;
    // let userId = "";
    const attendances = await attendanceModel.getByUserId(userId);
    res.send({ results: attendances });
  } catch (error) {
    throw new ApplicationError(error, 500, {});
  }
});
