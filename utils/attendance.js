import Entries from "../models/entiresMdl.js";
import User from "../models/userMdl.js";
import asyncError from "./asyncError.js"
import { getDate } from "./date.js"
import { scheduleJob } from "node-schedule";

const giveAutomateAttendance = asyncError(async () => {
    //GIVE AUTOMATIC ATTENDANCE 
    // PROCCESS
    // 1. GET ALL ENTRIES FOR TODAY
    // 2. GET ALL USER (EMPLOYEE)
    // 3. FIND WHO IS NOT ENTRIED
    // 4. POST THEM PRESENT AS ABSENT
    const today = getDate();
    const entries = await Entries.find({ date: today }).select('empId');
    const users = await User.find({ admin: false }).select('empId');
    //CONVERT OBJECT TO empId
    const entriesEmpId = entries.map(entry => entry.empId)
    const usersEmpid = users.map(user => user.empId);
    console.log("users  : ", users);
    console.log("entries  : ", entries);
    for await (let userEmpId of usersEmpid) {
        if (!(entriesEmpId.includes(userEmpId))) {
            await Entries.create({
                empId: userEmpId,
                startTime: null,
                date: today,
                endTime: null,
                present: false
            })
        }
    }
})

export const scheduleAutomateAttendance = () => {
    scheduleJob("0 11 * * *", giveAutomateAttendance);
    console.log("Attendance Scheduled...!");
}
