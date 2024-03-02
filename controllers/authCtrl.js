import User from "../models/userMdl.js";
import ErrorHandler from "../utils/ErrorHandler.js";
import asyncError from "../utils/asyncError.js";
import { generateToken } from "../utils/jwt.js";
import { comaparePassword, hashPassword } from "../utils/password.js";
import sendResponse from "../utils/sendResponse.js";
import { checkEmpty, validateId } from "../utils/validate.js";


export const registerUser = asyncError(async (req, res, next) => {
    const {
        empId,
        password,
        name,
        email,
        gender,
        role,
        dob,
        phone,
        address
    } = req.body;
    if (checkEmpty([
        empId,
        password,
        name,
        email,
        gender,
        role,
        dob,
        phone,
        address
    ])) return next(new ErrorHandler("All Fields Are Required...!", 400))
    const userExists = await User.findOne({ empId })
    if (userExists) return next(new ErrorHandler("User Already Exists...!", 400))
    const hashedPassword = await hashPassword(password);
    const newUser = await User.create({ ...req.body, password: hashedPassword });
    sendResponse(res, 201, "User Registered Successfully...!", newUser);
})

export const loginUser = asyncError(async (req, res, next) => {
    const { empId, password } = req.body;
    if (checkEmpty([empId, password])) return next(new ErrorHandler("All Fields Are Required...!", 400))
    const user = await User.findOne({ empId }).select('password role')
    if (!user) return next(new ErrorHandler("Invalid Credentials...!", 400))
    //IF ADMIN LOGGGED IN NO NEED COMPARE PASSWORD 
    //JUST CHECK PASSWORD 
    if (user.role === "ADMIN") {
        if (password !== user.password) return next(new ErrorHandler("Invalid Credentials...!", 400))
        
    } else {
        if (!(await comaparePassword(password, user.password))) return next(new ErrorHandler("Invalid Credentials...!", 400))
    }
    const token = generateToken({ id: user._id })
    sendResponse(res, 200, "User Loggged In Successfully...!", { token });
})

export const updateUser = asyncError(async (req, res, next) => {
    const { id } = req.params;
    const{
        name,
        email,
        gender,
        role,
        dob,
        phone,
        address
    } = req.body;
    if (checkEmpty([
        name,
        email,
        gender,
        role,
        dob,
        phone,
        address
    ])) return next(new ErrorHandler("All Fields Are Required...!", 400))
    if (!validateId(id)) return next(new ErrorHandler("Invalid Id...!", 400))
    const updatedUser = await User.findByIdAndUpdate(id, req.body, { new: true });
    if (!updatedUser) return next(new ErrorHandler("User Doesn't Exists...!", 400))
    sendResponse(res, 201, "User Upadted Successfully...!", updatedUser);
})

export const deleteUser = asyncError(async (req, res, next) => {
    const { id } = req.params;
    if (!validateId(id)) return next(new ErrorHandler("Invalid Id...!", 400))
    const deletedUser = await User.findByIdAndDelete(id,{ new: true });
    if (!deletedUser) return next(new ErrorHandler("User Doesn't Exists...!", 400))
    sendResponse(res, 201, "User Deleted Successfully...!", deletedUser);
})

export const fetchUser = asyncError(async (req, res, next) => {
    const { id } = req.params;
    if (!validateId(id)) return next(new ErrorHandler("Invalid Id...!", 400))
    const user = await User.findById(id);
    if (!user) return next(new ErrorHandler("User Doesn't Exists...!", 400))
    sendResponse(res, 200, "User Fetched Successfully...!", user);
})

export const fetchUsers = asyncError(async (req, res, next) => {
    const users = await User.find({ admin: false });
    sendResponse(res, 200, "User Fetched Successfully...!", users);
})
