import Leave from "../models/leaveMdl.js";
import User from "../models/userMdl.js";
import ErrorHandler from "../utils/ErrorHandler.js";
import asyncError from "../utils/asyncError.js";
import sendResponse from "../utils/sendResponse.js";
import { checkEmpty, validateId } from "../utils/validate.js";
import status from '../data/status.json' assert { type: "json" };

export const requestLeave = asyncError(async (req, res, next) => {
    if (req.user.leave <= 0) return next(new ErrorHandler("Your Leave Days Are Finished...!", 400))
    const { empId } = req.user;
    const { date ,message} = req.body;
    if(checkEmpty([date,message])) return next(new ErrorHandler("All Fields are REquired...!",400))
    const isExists = await Leave.findOne({ empId, date });
    if (isExists) return next(new ErrorHandler("Request Is Already Exists On This Date...!"));
    const leave = await Leave.create({empId,date,message})
    sendResponse(res, 201, "Leave Requested To Admin...!", leave)
})

export const fetchRequests = asyncError(async (req, res, next) => {
    const { empId } = req.user;
    const requests = await Leave.find({ empId });
    sendResponse(res, 200, "Request Fetched Successfully...!", requests)
})

export const fetchRequestsForAdmin = asyncError(async (req, res, next) => {
    const requests = await Leave.find();
    sendResponse(res, 200, "Request Fetched Successfully...!", requests)
})

export const changeStatus = asyncError(async (req, res, next) => {
    const { reqId, status: statusMsg, empId } = req.body;
    if (checkEmpty([reqId,statusMsg,empId])) return next(new ErrorHandler("All Fields Are Required...!", 400))
    if (!(status.includes(statusMsg))) return next(new ErrorHandler("Invalid Status...!", 400))
    if (!validateId(reqId)) return next(new ErrorHandler("Invalid Request Id...!", 400))
    const resMsg = statusMsg === "ACCEPTED" ? "Request Accepted Successfully...!" : "Request Rejected Successfully...!";
    const request = await Leave.findByIdAndUpdate(reqId, { status: statusMsg }, { new: true })
    if (!request) return next(new ErrorHandler("Request Doesn't Exists...!", 400))
    if (request.status === "ACCEPTED") {
        await User.findOneAndUpdate({ empId: request.empId }, {
            $inc: { 'leave': -1 }
        })
    }
    sendResponse(res, 201, resMsg, request)
})