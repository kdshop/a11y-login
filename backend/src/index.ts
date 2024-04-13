import express, { Express, Request, Response } from "express";
import path from "node:path";
import db from "./db";

const app: Express = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "static")));

app.get("/", async function (request: Request, response: Response) {
  const users =
    // await db`create table a11y_login.users (id int PRIMARY KEY, user text, password text);`;

    response.send("Very nice! " + JSON.stringify({ konrad: "password" }));
  response.end();
});

app.post("/auth", function (request: Request, response: Response) {
  const username = request.body.username;
  const password = request.body.password;

  if (username && password) {
    response.send("Nice!");
  } else {
    response.send("Not nice!");
  }

  response.end();
});

app.listen(3000);
