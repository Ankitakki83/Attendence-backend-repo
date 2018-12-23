// Defines an express app that runs the boilerplate codebase.

import "babel-polyfill";
import express from "express";

import http from "http";

import createRouter from "./router";

const app = express();

app.use(createRouter());

http
  .createServer(app)
  .listen(3001, () => console.log(`Listening on port ${3001}`));
