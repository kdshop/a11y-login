import express, { Express, Request, Response } from "express";
import path from "node:path";
import db from "./db";
import bcrypt from "bcrypt";

const app: Express = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "static")));

app.get("/", async function (request: Request, response: Response) {
  // const users =
  //   await db`create table users (id int PRIMARY KEY, user text, password text);`;
  const users2 = await db`SELECT * FROM Persons`;
  console.log("dsad");
  response.send(JSON.stringify(users2));
  response.end();
});

app.post("/login", function (request: Request, response: Response) {
  const username = request.body.username;
  const password = request.body.password;

  if (!username || !password) {
    response.status(400).send("Bad request!");
  } else {
    response.send("Not nice!");
  }

  response.end();
});

app.put("/register", function (request: Request, response: Response) {
  const email = request.body.password;
  const username = request.body.username;
  const password = request.body.password;

  if (!username || !password) {
    response.status(400).send("Bad request!");
  } else {
    response.send("Not nice!");
  }

  response.end();
});

app.listen(3000);
