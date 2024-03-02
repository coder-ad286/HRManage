import moment from "moment";



//GET TODAY DATE STRING
export const getDate = () => {
    const today = new Date();
    const date = today.getDate();
    const month = today.getMonth() + 1;
    const year = today.getFullYear();
    return {
        date,
        month,
        year,
    };
}

//GET GIVEN DATE STRING
export const getDateString = (date, month, year) => {
    const dateStr = `${year}-${month}-${date}`;
    return dateStr;
}

//CONVERT DATE OBJECT INTO TIME STRING
export const convertDateIntoTime = (day) => {
    const dateString = day.toISOString();
    const dateParts = dateString.split('T')[1].split(':');
    let hour = parseInt(dateParts[0], 10);
    let minute = parseInt(dateParts[1], 10);
    //24HRS TO 12HRS
    hour = hour > 12 ? hour - 12 : hour;
    hour = hour === 0 ? 12 : hour;
    //ADD PREFIX ZERO WHEN <9
    hour = hour <= 9 ? `0${hour}` : hour;
    minute = minute <= 9 ? `0${minute}` : minute;
    const timeStr = `${hour}:${minute} `
    return timeStr;
}

//ADD WORKINGS HOURS TO ENTRY TIME
export const getTime = () => {

    const start = new Date(getIST());
    const end = new Date(getIST());
    end.setHours(end.getHours() + 8);
    return {
        start, end
    }
}

//GET LEFT TIME = ENDTIME - CURRENTTIME
export const getLeftTime = (endTime) => {
    // const startTime = new Date(getIST());
    // const timeDifference = Math.abs(endTime - startTime);
    // const hours = Math.floor(timeDifference / (1000 * 60 * 60));
    // const minutes = Math.floor((timeDifference % (1000 * 60 * 60)));
    // const leftTime = `${hours}:${minutes}`;
    var now = moment(new Date(getIST())); //todays date
    var end = moment(endTime); // another date
    var duration = moment.duration(end.diff(now));
    var hours = duration.asHours();
    return hours;
}

export const getIST = () => {
    const date = new Date();
    const offset = date.getTimezoneOffset() == 0 ? 0 : -1 * date.getTimezoneOffset();
    let normalized = new Date(date.getTime() + (offset) * 60000);
    let indiaTime = new Date(normalized.toLocaleString("en-US", { timeZone: "Asia/Calcutta" }));
    return indiaTime.toISOString()
}