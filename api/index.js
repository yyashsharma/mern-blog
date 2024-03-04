import express from 'express'
import { connectDb } from '../utils/db.js';
import {config} from 'dotenv'
import userRoutes from './routes/user.route.js'

config();

const app=express();

connectDb();

app.get('/',(req,res)=>{
    res.send("api is working")
})

app.use('/api/v1/user',userRoutes)

app.listen(process.env.PORT,()=>{
    console.log("server is running on 4000!")
})