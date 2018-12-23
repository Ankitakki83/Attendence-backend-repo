import { route } from "./";

import UserModel from "../db/UserModel";
import { ApplicationError } from "../lib/errors";

export const create = route(async (req, res) => {
  const userModel = new UserModel();
  try {
    const userInformation = req.body;
    const user = await userModel.create(userInformation);
    res.send({ results: user });
  } catch (error) {
    throw new ApplicationError(error, 500, {});
  }
});
export const get = route(async (req, res) => {
  const userModel = new UserModel();
  try {
    const users = await userModel.get();
    res.send({ results: users });
  } catch (error) {
    throw new ApplicationError(error, 500, {});
  }
});

export const getById = route(async (req, res) => {
  const userModel = new UserModel();
  try {
    let userId = req.params.Id;
    const user = await userModel.getById(userId);
    res.send({ results: user });
  } catch (error) {
    throw new ApplicationError(error, 500, {});
  }
});
