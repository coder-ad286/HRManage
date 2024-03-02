import jwt from "jsonwebtoken";
import ErrorHandler from "../utils/ErrorHandler.js";
import asyncError from "../utils/asyncError.js";
import { validateId } from "../utils/validate.js";
import User from "../models/userMdl.js";

export const isAuthenticatedUser = asyncError(async (req, res, next) => {

    //GET TOKEN FROM "bearer token"
    const authorization = req.headers["authorization"] || req.headers["Authorization"];
    if (!authorization) {
        return next(new ErrorHandler('Login first to handle this resource...!', 401))
    }
    const token = authorization.split(' ')[1];
    if (!token) {
        return next(new ErrorHandler('Login first to handle this resource...!', 401))
    }

    jwt.verify(
        token,
        process.env.JWT_TOKEN_SECRET,
        async (error, decoded) => {
            if (error) {
                return next(new ErrorHandler('Login first , Invalid Token...!', 401))
            }
            if (decoded) {
                if (!validateId(decoded.id)) return next(new ErrorHandler('Login first , Invalid Token...!', 401))
                const user = await User.findById(decoded.id)
                if (!user) return next(new ErrorHandler('Login first , Invalid Token...!', 401))
                req.user = user
                next();
            }
        }
    );

})
