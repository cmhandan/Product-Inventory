const express = require("express");
const fs = require("fs");
const app = express();
require('dotenv').config();
const port = process.env.PORT || 3000;
const {productRouter} = require('./routes/ProductsRoutes.js')
const {connectDb} = require('./config/dbConnection.js');
const { userRouter } = require("./routes/UserRoutes.js");

app.use(express.json());
app.use('/api', productRouter)
app.use('/api/user', userRouter);
app.listen(port, (err) => {
  if (err) {
    console.error("Server Crash: ", err);
  }
  connectDb();
  console.log(`server running at port ${port}`);
});
