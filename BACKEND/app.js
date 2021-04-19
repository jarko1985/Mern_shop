const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");
const morgan = require("morgan");
const mongoose = require("mongoose");
const authJwt = require("./helpers/jwt");
const errorHandler = require("./helpers/errorHandler");
const productRouter = require("./routes/productRoutes");
const categoryRouter = require("./routes/categoryRoutes");
const userRouter = require("./routes/userRoutes");
const orderRouter = require("./routes/orderRoutes");
require("dotenv/config");

const api = process.env.API_URL;

//MiddleWare
app.use(cors());
app.options("*", cors());
app.use(bodyParser.json());
app.use(morgan("short"));
app.use(authJwt());
//app.use(errorHandler);

/** Products Routes **/
app.use(`${api}/users`, userRouter);
app.use(`${api}/products`, productRouter);
app.use(`${api}/categories`, categoryRouter);
app.use(`${api}/orders`, orderRouter);

/** MONGOOSE CONNECTION **/
mongoose
  .connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    dbName: "mern_shop",
  })
  .then(() => {
    console.log("MongoDB Connection Successfull !!!");
  })
  .catch((err) => {
    console.log("====================================");
    console.log(err);
    console.log("====================================");
  });

app.listen(3000, () => {
  console.log("====================================");
  console.log(api);
  console.log("Server Started on http://localhost:3000");
  console.log("====================================");
});
