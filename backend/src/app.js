import express from "express";
import issueRoutes from "./routes/issue.routes.js";
import authRoutes from "./routes/auth.routes.js";
import cors from "cors";


const app = express();
app.use(cors()); // 🔑 THIS LINE FIXES THE ISSUE

app.use(express.json());

app.get("/", (req, res) => res.json({ status: "ok", message: "Student Admin Issue Communicator API is running" }));

app.use("/api/auth", authRoutes);
app.use("/api/issues", issueRoutes);

export default app;