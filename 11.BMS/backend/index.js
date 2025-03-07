const express = require("express");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();
const PORT = process.env.PORT || 8000;
const UserRoute = require("./routes/Userroute");
const AdminRoute = require("./routes/AdminRoute");
const MovieRoute = require("./routes/MovieRote");
const BookingRoute = require("./routes/BookingRoute");
const cors = require("cors");

app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.send("Hello World!");
});
app.use("/user", UserRoute);
app.use("/admin", AdminRoute);
app.use("/movie", MovieRoute);
app.use("/book", BookingRoute);

mongoose
  .connect(process.env.MONGO_URL)
  .then(() => console.log("database connected"))
  .catch((err) => console.log(err));
app.listen(PORT, () => console.log(`server is running on port ${PORT}`));
