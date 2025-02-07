const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");

dotenv.config(); 

const app = express();
app.use(express.json());
app.use(cors({
  origin: "http://localhost:3000", // Allow requests from frontend
  credentials: true,
}));

// ✅ Import & Use Routes
const userRoute = require("./routes/userRoute");
app.use("/api", userRoute);  // ✅ Now API is under `/api/user`

// MongoDB Connection
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log("✅ Connected to MongoDB"))
.catch(err => console.error("❌ MongoDB Connection Error:", err));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server is running on http://localhost:${PORT}`);
});
