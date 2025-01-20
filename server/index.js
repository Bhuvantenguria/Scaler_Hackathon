const express = require("express");
const app = express();
const cors = require("cors");
const dotenv = require("dotenv");
const morgan = require('morgan');
const mongoose = require('mongoose');
const methodOverride = require('method-override');
const connectDb = require('./config/db');
const authRouter = require("./routes/authRoutes");
const userRouter = require("./routes/userRoutes");
const orderRouter = require("./routes/orderRoutes");
const categoryRouter = require("./routes/categoryRoutes");
const productRoutes = require("./routes/productRoutes");
const path = require("path");

dotenv.config();

connectDb();

app.use(cors());

app.use(methodOverride('_method'));
app.use(morgan('dev'));
app.use(express.json());


app.use('/api/v1/auth', authRouter);
app.use('/api/v1/user', userRouter);
app.use('/api/v1/order', orderRouter);
app.use('/api/v1/category', categoryRouter);
app.use("/api/v1/product", productRoutes);



const Port = process.env.PORT || 8000;

app.listen(Port, () => {
    console.log('Listening on port ' + Port);
});