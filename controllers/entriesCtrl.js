import Entries from "../models/entiresMdl.js";
import asyncError from "../utils/asyncError.js";
import tokenData from '../data/token.json' assert { type: "json" };
import { verifyJWT } from "../utils/jwt.js";
import ErrorHandler from "../utils/ErrorHandler.js";
import { convertDateIntoTime, getDate, getDateString, getLeftTime, getTime } from "../utils/date.js";
import sendResponse from "../utils/sendResponse.js";
import { checkEmpty } from "../utils/validate.js";

export const createEntry = asyncError(async (req, res, next) => {
    const { qrToken } = req.body;
    if (!qrToken) return next(new ErrorHandler("QR Scan is Required...!", 400))
    const { empId } = req.user;
    const { token } = tokenData;
    const { date, month, year } = getDate();
    if (new Date().getDay() === 0) return next(new ErrorHandler("Not Allowed On Sunday...!", 400))
    //RETURN TRUE WHEN ERROR ,OTHERWISE FALSE
    if (verifyJWT(qrToken)) return next(new ErrorHandler("Invalid QR Code...!", 400))
    if (!(qrToken === token)) return next(new ErrorHandler("Invalid QR Code...!", 400))
    const isExists = await Entries.findOne({ empId, date, month, year })
    if (isExists) return next(new ErrorHandler("Already Entries Registered...!", 400))
    const { start, end } = getTime();
    const newEntry = await Entries.create({
        empId,
        startTime: start,
        endTime: end,
        present: true,
        date,
        month,
        year,
    })
    sendResponse(res, 201, "Entry Created Successfully...!", newEntry)
})

export const fetchMonthStatus = asyncError(async (req, res, next) => {
    const { empId } = req.user;
    const { month, year } = req.body;
    if (checkEmpty([month, year])) return next(new ErrorHandler("Month and Year is Required...!", 400))
    const entries = await Entries.find({ month, year, empId });
    let present = 0, absent = 0;
    entries.forEach((entry) => {
        if (entry.present) present++; else absent++;
    })
    sendResponse(res, 200, "Month Status Fetched Successfully...!", { empId, present, absent })
})

export const fetchEntry = asyncError(async (req, res, next) => {
    const { empId } = req.user;
    const { date, month, year } = req.body;
    if (checkEmpty([date, month, year])) return next(new ErrorHandler("Month and Year is Required...!", 400))
    const entry = await Entries.findOne({ empId, date, month, year })
    if (!entry) return next(new ErrorHandler("No Entry Exists...!", 400))
    //CONVERT DATE OBJ INTO TIME STRING
    const startTime = convertDateIntoTime(entry.startTime)
    const endTime = convertDateIntoTime(entry.endTime)
    const leftTime = getLeftTime(entry.endTime);
    sendResponse(res, 400, "Entry Fetched Succesfully...!", { startTime, endTime, leftTime })
})