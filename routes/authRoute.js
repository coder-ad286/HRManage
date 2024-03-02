import { Router } from "express";
import { deleteUser, fetchUser, fetchUsers, loginUser,  registerUser, updateUser } from "../controllers/authCtrl.js";
import { isAuthenticatedUser } from "../middlewares/authenticate.js";
import authenicateRole from "../middlewares/authenicateRole.js";
const authRoute = Router();

authRoute.post('/register',isAuthenticatedUser,authenicateRole("ADMIN"),registerUser)
authRoute.post('/login',loginUser)
authRoute.put('/update/:id',isAuthenticatedUser,authenicateRole("ADMIN"),updateUser)
authRoute.delete('/delete/:id',isAuthenticatedUser,authenicateRole("ADMIN"),deleteUser)
authRoute.get('/fetch-user/:id',isAuthenticatedUser,fetchUser)
authRoute.get('/fetch-users',isAuthenticatedUser,authenicateRole("ADMIN"),fetchUsers)

export default authRoute;