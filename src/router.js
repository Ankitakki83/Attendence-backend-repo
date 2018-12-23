// Defines an express app that runs the boilerplate codebase.

import bodyParser from "body-parser";
import express from "express";
import cors from "cors";
import { ApplicationError } from "./lib/errors";

import {
  create as createUserRoutes,
  get as getUserRoutes
} from "./routes/user";

import { create as addAttendance, getByUserId } from "./routes/attendance";

export default function createRouter() {
  const router = express.Router();
  router.use(bodyParser.json({ limit: "250mb" }));
  router.use(bodyParser.urlencoded({ extended: false, limit: "250mb" }));
  router.use(cors({ origin: "*" }));
  router.get("/*", (req, res, next) => {
    res.set({
      "Last-Modified": new Date().toUTCString(),
      Expires: -1,
      "Cache-Control": "must-revalidate, private"
    });
    next();
  });

  router.post("/user", createUserRoutes);
  router.get("/users", getUserRoutes);

  router.get("/attendance/:userId", getByUserId);
  router.post("/attendance", addAttendance);

  // ******************
  // * ERROR HANDLING *
  // ******************

  // 404 route
  router.all("/*", (req, res, next) => {
    next(new ApplicationError("Not Found", 404));
  });

  // catch all ApplicationErrors, then output proper error responses.
  //
  // NOTE: express relies on the fact the next line has 4 args in
  // the function signature to trigger it on errors. So, don't
  // remove the unused arguments!
  router.use((err, req, res, next) => {
    if (err instanceof ApplicationError) {
      res.status(err.statusCode).send({
        data: err.data || {},
        message: { errMsg: err.message, errCode: err.statusCode }
      });
      return;
    }
    // If we get here, the error could not be handled.
    // Log it for debugging purposes later.

    res.status(500).send({
      message: "Uncaught error"
    }); // uncaught exception
  });

  // *******************
  // * CATCH ALL ROUTE *
  // *******************

  /**
   * If you want all other routes to render something like a one-page
   * frontend app, you can do so here; else, feel free to delete
   * the following comment.
   */
  /*
   * function renderFrontendApp(req, res, next) {
   *   // TODO: add code to render something here
   * }
   * // all other pages route to the frontend application.
   * router.get('/*', renderFrontendApp);
   */

  return router;
}
