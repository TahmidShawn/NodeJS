const express = require("express");
const app = express();

// middleware
app.use(express.json());

const authRouter = require("./routes/auth.route");
const homeRouter = require("./routes/home.route");
const adminRouter = require("./routes/admin.route");
const imageRouter = require("./routes/image.route");

app.use("/api/v1/auth", authRouter);
app.use("/api/v1/home", homeRouter);
app.use("/api/v1/admin", adminRouter);
app.use("/api/v1/image", imageRouter);

module.exports = app;
