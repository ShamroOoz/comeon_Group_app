import "dotenv/config";
import express from "express";
import cors from "cors";
import userRouter from "./routes/userRouter.js";
import noteRouter from "./routes/noteRouter.js";

const app = express();

//Middlewares
app.use(cors());
app.use(express.json());
app.use(morgan("tiny"));

// Routes
app.get("/", (req, res) =>
  res.send("Welcome to Comeon Group App Backend Panel ✈ ")
);

app.use("/api/users", userRouter);
app.use("/api/notes", noteRouter);

// Listen Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log("Server is running on port", PORT);
});
