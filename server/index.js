const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const authRoute = require("./routes/auth");
const accountRoute = require("./routes/account");
const userRoute = require("./routes/user");
const adminRoute = require("./routes/admin")
dotenv.config();
const app = express()

// ket noi database
mongoose.connect(process.env.MONGODB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
    .then(() => {
        console.log("Connected to Database");
    })
    .catch((error) => {
        console.error("Error connecting to database:", error);
    });
const allowedOrigins = ['http://localhost:3000', 'http://localhost:4000'];

app.use(cors({
    origin: allowedOrigins,  // Replace with the actual origin of your client
    credentials: true,
}));
app.use(cookieParser());
app.use(express.json());
//ROUTES
app.use("/v1/auth", authRoute);
app.use("/v1/admin", adminRoute);
app.use("/v1/user", userRoute);
app.listen(process.env.PORT, () => {
    console.log("Server is running");
});
//AUTHENTICATION
