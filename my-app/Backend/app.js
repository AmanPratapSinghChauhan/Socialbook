import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import bodyParser from 'body-parser';
import userRoutes from './Routes/userRoutes.js';


dotenv.config({path:'./Config/config.env'});
const app=express();
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.json());
app.use(express.static('public'));
app.use(cors({
    origin:'http://localhost:3000',
    credentials:true,
    method:['POST','GET','PUT']
}));
app.use('/api/s1',userRoutes);



export default app;

