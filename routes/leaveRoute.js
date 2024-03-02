import { Router } from "express";
import { isAuthenticatedUser } from "../middlewares/authenticate.js";
import { changeStatus, fetchRequests, fetchRequestsForAdmin, requestLeave } from "../controllers/leaveCtrl.js";
import authenicateRole from "../middlewares/authenicateRole.js";
const leavesRoute = Router();

leavesRoute.post('/request',isAuthenticatedUser,requestLeave)
leavesRoute.get('/requests',isAuthenticatedUser,fetchRequests)
leavesRoute.get('/admin-requests',isAuthenticatedUser,authenicateRole("ADMIN"),fetchRequestsForAdmin)
leavesRoute.put('/request',isAuthenticatedUser,authenicateRole("ADMIN"),changeStatus)


export default leavesRoute