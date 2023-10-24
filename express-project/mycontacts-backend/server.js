const express = require("express");
const errorHandler = require("./middelware/errorHandler");
const connectDb = require("./config/dbConnection");
const dotenv = require("dotenv").config();
const contectRoutes = require("./routes/contactRoutes");
const userRoutes = require("./routes/userRoutes");

connectDb();
const app = express();
const port = process.env.PORT || 5000;

app.use(express.json());
app.use("/api/contacts", contectRoutes);
app.use("/api/user", userRoutes);


app.use(errorHandler);

app.listen(port, () => {
  console.log(`listening on port ${port}`);
});
