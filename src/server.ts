import "dotenv/config";
import express from "express";

import router from "./routes/routes";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(router);

app.listen(process.env.PORT, () => console.log("⚡ Server is runnig"));
