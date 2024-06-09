const express = require('express');
const cookieParser = require('cookie-parser')
const cors = require('cors')
const authRouter = require('./routes/AuthRouter')
const userRouter = require('./routes/UserRouter');
const productRouter = require('./routes/ProductRouter')
const orderRouter = require('./routes/orderRoute')
const dashRouter = require('./routes/DashRouter')
const path = require('path')
require('dotenv').config();
 
require('./db/db')
const app = express();
app.use(cookieParser());
app.use(express.json());

app.use(cors({
    origin : ['http://localhost:5173,https://keisneaker-8da6.onrender.com/'],
    credentials : true,
}))

const __dir = path.resolve();
app.use('/',authRouter);
app.use('/user',userRouter);
app.use('/product',productRouter);
app.use('/order',orderRouter);
app.use('/dashboard,',dashRouter)
app.use(express.static(path.join(__dir,'client/dist')))
app.use('*',(req,res)=>{
    res.sendFile(path.join(__dir,'client','dist','index.html'))
})
app.listen(3000,()=>{
    console.log('sever is running at port 3000')
})

 