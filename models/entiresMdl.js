import { model,Schema } from "mongoose";

const entriesSchema = new Schema({
    empId : {
        type : String,
        required :[true,"Employee ID is Required...!"]
    },
    startTime : {
        type : Date,
    },
    endTime : {
        type : Date
    },
    present : {
        type : Boolean,
        required : [true,"Present is Required...!"]
    },
    date:{
        type:Number,
        required : [true,"Date is Required...!"]
    },
    month:{
        type:Number,
        required : [true,"Month is Required...!"]
    },
    year:{
        type:Number,
        required : [true,"Year is Required...!"]
    }
})


const Entries =model('Entries',entriesSchema)
export default Entries;