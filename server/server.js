import express from 'express'
import cors from 'cors'
import connectDB from './config/mongodb.js';
import userRouter from './routes/userRoutes.js';
import imageRouter from './routes/imageRoutes.js';
import config from './config/config.js';

const PORT = config.PORT;
const app=express()

app.use(express.json());
app.use(cors());
const start = async () => {
    try {
        await connectDB()
        app.listen( PORT,()=>console.log('server running on port '+PORT));
    } catch (err) {
        console.error('Failed to start server:', err)
        process.exit(1)
    }
}

app.use('/api/user',userRouter );
app.use('/api/image',imageRouter);


app.get('/',(req,res)=>res.send("API WORKING FINE"));
start()