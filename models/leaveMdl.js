import { model,Schema } from "mongoose";

const leaveSchema = new Schema({
    empId : {
        type : String,
        required :[true,"Employee ID is Required...!"]
    },
    date : {
        type : String,
        required :[true,"Date is Required...!"]
    },
    status : {
        type : String,
       default : "PENDING",
        enum :{
            values :["ACCEPTED","REJECTED","PENDING"],
            message : "Invalid Value..!"
        }
    },
    message : {
        type : String,
        required :[true,"Message is Required...!"]
    },
})


const Leave =model('Leave',leaveSchema)
export default Leave;