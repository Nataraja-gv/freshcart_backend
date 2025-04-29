const express = require("express");
require("dotenv").config();
const ConnectDB = require("./config/database");
const authRouter = require("./routers/authRouter");
const sellerAuthRouter = require("./routers/sellerRouter");
const categoryRouter = require("./routers/categoryRouter");
const productRouter = require("./routers/productRouter");
const cookieParser = require("cookie-parser");
const cartRouter = require("./routers/cartRouter");
const app = express();
const cors = require("cors");
const profileRouter = require("./routers/profileRouter");

const PORT = process.env.PORT;
app.use(express.json());
app.use(cookieParser());

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

app.use("/", authRouter);
app.use("/", sellerAuthRouter);
app.use("/", categoryRouter);
app.use("/", productRouter);
app.use("/", cartRouter);
app.use("/", profileRouter);

const startServer = async () => {
  try {
    await ConnectDB();
    console.log("✅ Database connected successfully");

    app.listen(PORT, () => {
      console.log(`🚀 Server running on http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error("❌ Failed to connect to the database:", error.message);
    process.exit(1);
  }
};

startServer();
