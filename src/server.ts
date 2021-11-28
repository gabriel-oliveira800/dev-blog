import express from "express";
import morgan from "morgan";
import path from "path";
import cors from "cors";
import "dotenv/config";

import "./binds";
import router from "./routes/routes";

const app = express();
app.use(cors());

app.use(express.static(path.join(__dirname, "../uploads")));

app.use(morgan("tiny"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(router);

app.listen(process.env.PORT || 4000, () =>
  console.log(`Server is running on port ${process.env.PORT}`)
);
