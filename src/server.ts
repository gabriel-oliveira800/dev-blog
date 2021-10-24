import "dotenv/config";
import express from "express";
import morgan from "morgan";

import "./binds";
import router from "./routes/routes";
import { Strings } from "./helpers";

const app = express();

app.use(morgan("tiny"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(router);

app.listen(process.env.PORT, () =>
  console.log(`Server is running on port ${process.env.PORT}`)
);
