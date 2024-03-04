import express from 'express'
import { connectDb } from '../utils/db.js';
import {config} from 'dotenv'

config();

const app=express();

connectDb();

app.listen(process.env.PORT,()=>{
    console.log("server is running on 4000!")
})