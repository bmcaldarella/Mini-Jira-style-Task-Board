import express from "express";
import cors from "cors";
import taskRoutes from "./routes/tasks";
import memberRoutes from "./routes/members";

const app = express();

app.use(cors());
app.use(express.json());

app.get("/health", (_req, res) => res.json({ ok: true }));

app.use("/api", taskRoutes);
app.use("/api", memberRoutes);

const PORT = Number(process.env.PORT) || 3000;
app.listen(PORT, () => {
  console.log(`API running on http://localhost:${PORT}`);
});
