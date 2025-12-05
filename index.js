const express = require("express");
const fs = require("fs");
const app = express();
const port = process.env.PORT || 3000;
const {productRouter} = require('./routes/ProductsRoutes.js')

app.use(express.json());
app.use('/api', productRouter)
app.listen(port, (err) => {
  if (err) {
    console.error("Server Crash: ", err);
  }
  console.log(`server running at port ${port}`);
});
