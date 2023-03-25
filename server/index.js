import mongoose from "mongoose";
import cors from 'cors';
import express from 'express';
import bodyParser from "body-parser";
import PostRouter from './routes/posts.js';
import UserRouter from './routes/user.js';
import dotenv from 'dotenv';

const app = express();
dotenv.config();

app.use(bodyParser.json({ limit: '30mb', extended: true }));
app.use(bodyParser.urlencoded({ limit: '30mb', extended: true }));
app.use(cors());

app.use('/posts', PostRouter);
app.use('/user', UserRouter);


mongoose.connect(process.env.CONNECTION_URL, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => app.listen(process.env.PORT, () => console.log('Server Worked successfully !!!')))
    .catch((error) => console.log(error))