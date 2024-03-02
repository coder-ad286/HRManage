import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import connectDatabase from './config/connectDatabase.js';
import error from './middlewares/error.js';
import cookieParser from 'cookie-parser';
import morgan from 'morgan';
import { fileURLToPath } from 'url';
import path, { dirname } from 'path';
import authRoute from './routes/authRoute.js';
import entriesRoute from './routes/entriesRoute.js';
import leavesRoute from './routes/leaveRoute.js';
import { generateJWT } from './utils/jwt.js';
import { scheduleAutomateAttendance } from './utils/attendance.js';
import tokenData from './data/token.json' assert { type: "json" };

const app = express();


// CONFIGURATION


const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

//app.use(express.static(path.join(__dirname, 'public')))
dotenv.config()
app.use(morgan('dev'))
dotenv.config()
app.use(express.json())
app.use(cookieParser())
app.use(cors({credentials: true, origin: true}))


//CONNECT DATABASE
connectDatabase();

//AUTOMATIC ATTENDANCE
scheduleAutomateAttendance();

//CONTROLLERS
app.use('/api/v1/auth',authRoute)
app.use('/api/v1/entries',entriesRoute)
app.use('/api/v1/leave',leavesRoute)
app.get('/api/v1/qr',(req,res)=>{
    res.status(200).json(tokenData)
})

//ERROR
app.use(error)

//PORT
const PORT = process.env.PORT || 5000


app.listen(PORT, () => {
    console.log(`App Litening ${PORT} Port at ${process.env.ENVIROMENT} ...`);
})