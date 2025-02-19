import express from "express";
import ErrorHandler from "./utils/errorHandler.js";
import errorMiddleware from "./middlewares/error.middleware.js";

const app = express();

app.use(express.json({ limit: "16kb" }));

// catch undefined route
app.use((req, res, next) => {
    next(new ErrorHandler(`Cannot ${req.method} ${req.originalUrl}`, 404));
});

// middleware for errors
app.use(errorMiddleware);

export default app;
