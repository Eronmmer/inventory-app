const express = require("express");
const logger = require("./middleware/logger");
const connectDb = require("./config/db");
const path = require("path")

const app = express();

const PORT = process.env.PORT || 3500;

// Connect database
connectDb();

// Initialize Middlewares
app.use(logger);
app.use(express.json({ extended: false }));
app.use(express.urlencoded({ extended: false }));
// The above two work as body parsers

// Badass welcome message 😈
app.get("/", (req, res) => {
  res.send("Hey bitch, welcome to my API 😈😈");
});

// Define all your routes
app.use("/api/users", require("./routes/users"));
app.use("/api/auth", require("./routes/auth"));
app.use("/api/customers", require("./routes/customers"));
app.use("/api/sales", require("./routes/sales"));
app.use("/api/suppliers", require("./routes/suppliers"));
app.use("/api/products", require("./routes/products"));
app.use("/api/purchases", require("./routes/purchases"));
app.use("/api/allUsers", require("./routes/allUsers"));

// 404. For the sake of fun haha
app.use((req, res, next) => {
  res
    .status(404)
    .send(
      "Sorry douchebag, I can't find nothing here. Do well to find your way home or to a know route."
    );
});

// Serve the static bundled React app in production mode
/* Make sure you serve static files after defining your routes */
if (process.env.NODE_ENV === "production") {
  // Set static folder
  app.use(express.static(path.resolve(__dirname, "client", "build")));

  app.get("/", (req, res) =>
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"))
  );
}

// Listen
app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
