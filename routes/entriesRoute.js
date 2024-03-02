import { Router } from "express";
import { isAuthenticatedUser } from "../middlewares/authenticate.js";
import { createEntry, fetchEntry, fetchMonthStatus } from "../controllers/entriesCtrl.js";
const entriesRoute = Router();

entriesRoute.post('/entry',isAuthenticatedUser,createEntry)
entriesRoute.get('/entry',isAuthenticatedUser,fetchEntry)
entriesRoute.get('/fetch-month-status',isAuthenticatedUser,fetchMonthStatus)

export default entriesRoute