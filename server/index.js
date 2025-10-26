const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const testHistoryRoutes = require("./routes/testHistory");
const authRoutes = require("./routes/auth");
const tutorialRoute = require("./routes/tutorials");
const app = express();

// Middleware
app.use(cors());

app.use(express.json());

// MongoDB connection
mongoose.connect("mongodb://127.0.0.1:27017/IDEusers", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log("MongoDB Connected"))
.catch((err) => console.error("MongoDB Connection Error:", err));

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/tutorials", tutorialRoute);
app.use("/api/testHistory", testHistoryRoutes);

app.listen(5000, () => {
  console.log("Server running on port 5000");
});
