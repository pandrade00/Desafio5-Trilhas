import express from "express";
import routes from "./routes/index.js";
import cors from "cors";

const app = express();

routes(app);

app.use(cors({
origin: ["http://localhost:5173", "https://front.vercel.app"],
credentials: true
}));

export default app;
