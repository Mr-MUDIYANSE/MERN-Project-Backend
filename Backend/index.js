import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import userRouter from './router/userRoute.js';
import galleryItemRouter from './router/galleryItemRoute.js';
import jwt from 'jsonwebtoken';

const app = express();

app.use(bodyParser.json());

const uri = "mongodb+srv://merntest:123@cluster0.tjauo.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

app.use((req, res, next) => {
    
    const token = req.header("Authorization")?.replace("Bearer", "").trim();

    if (token) {
        jwt.verify(token, "secret-key", (err, decoded) => {
            if (decoded) {
                req.user = decoded;
            }
            next();
        });
    } else {
        next();
    }
});


mongoose.connect(uri).then(
    () => {
        console.log("Database connection established");
    }
).catch(
    () => {
        console.log("Database connection fail");
    }
);

app.use("/api/users", userRouter);
app.use("/api/gallery", galleryItemRouter);

app.listen(5000, (req, res) => {
    console.log("Server in running on port 5000");
});