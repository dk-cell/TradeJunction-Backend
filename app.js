const express = require("express");
const app = express();
const cookieParser = require("cookie-parser");
const ErrorHandler = require("./middleware/error");
const bodyParser = require("body-parser");
const cors = require("cors");
const path = require("path");
app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: "*",
    credentials: true,
  })
);

app.use("/", express.static(path.join(__dirname, "./uploads")));
app.use(bodyParser.urlencoded({ extended: true, limit: "50mb" }));
// config
if (process.env.NODE_ENV !== "PRODUCTION") {
  require("dotenv").config({
    path: ".env",
  });
}

const user = require("./controller/userController");
const shop = require("./controller/shopController");
const product = require("./controller/productController");
const event = require("./controller/eventController");
const coupon = require("./controller/couponController");
const payment = require("./controller/paymentController");
const order = require("./controller/orderController");
const chat = require("./controller/chatController");
const message = require("./controller/messageController");
const withdraw = require("./controller/withdrawController")

app.use("/test", (req, res) => {
  res.send("Hello world!");
});

app.use("/api/v2/user", user);
app.use("/api/v2/shop", shop);
app.use("/api/v2/product", product);
app.use("/api/v2/event", event);
app.use("/api/v2/coupon", coupon);
app.use("/api/v2/payment", payment);
app.use("/api/v2/order", order);
app.use("/api/v2/chat", chat);
app.use("/api/v2/message", message);
app.use("/api/v2/withdraw", withdraw);

app.get("/", (req, res) => {
  res.send("Server Running...");
});

app.use(ErrorHandler);

module.exports = app;
