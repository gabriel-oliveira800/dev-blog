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

//TODO: Add a route in front end project
app.get("/github", (request, response) => {
  const url = Strings.gitHubAuthenticateUrl(process.env.GITHUB_CLIENT_ID);
  return response.redirect(url);
});

//TODO: Add a route in front end project
app.get("/signin/calback", (request, response) => {
  const { code } = request.query;

  return response.json(code);
});
