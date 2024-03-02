import { model,Schema } from "mongoose";

const userSchema = new Schema({
    empId : {
        type : String,
        required :[true,"Employee ID is Required...!"]
    },
    name : {
        type : String,
        required :[true,"Name is Required...!"]
    },
    email : {
        type : String,
        required :[true,"Email is Required...!"]
    },
    gender : {
        type : String,
        required :[true,"Gender is Required...!"],
        enum :{
            values :["MALE","FEMALE"],
            message : "Invalid Value..!"
        }
    },
    dob : {
        type : String,
        required :[true,"DOB is Required...!"]
    },
    phone : {
        type : Number,
        required :[true,"Phone Number is Required...!"]
    },
    address : {
        type : String,
        required :[true,"Address is Required...!"]
    },
    role : {
        type : String,
        required :[true,"Employee ID is Required...!"],
        enum :{
            values :["DEVELOPER","TESTER","ADMIN","DESIGNER"],
            message : "Invalid Value..!"
        }
    },
    password:{
        type:String,
        required:[true,"Password Is Must Required...!"],
        select:false
    },
    admin:{
        type : Boolean,
        default:false
    },
    leave : {
        type : Number,
        default : 10,
    }
})


const User =model('User',userSchema)
export default User;