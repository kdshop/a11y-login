import express, { Express, Request, Response } from "express";
import path from "node:path";
import db from "./db";
import bcrypt from "bcrypt-nodejs";
import cors from "cors";

// create table accounts
// (
//   "id" SERIAL PRIMARY KEY,
//   "username" TEXT NOT NULL,
//   "password" TEXT NOT NULL
// );

const app: Express = express();

app.use(express.json());
app.use(cors());
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

app.post("/login", async function (request: Request, response: Response) {
  const username = request.body.username;
  const password = request.body.password;

  if (!username || !password) {
    response.status(400).send("Bad request!");
  }

  const [user] = await db`SELECT * FROM accounts WHERE username=${username}`;

  if (!user) {
    response.status(401).send("Wrong username or password");
    response.end();
    return;
  }

  const correctLogin = bcrypt.compareSync(password, user?.password);

  if (correctLogin) {
    const { password, ...loginResponse } = user;
    response.status(200).send(loginResponse);
  } else {
    response.status(401).send("Wrong username or password");
  }
  response.end();
});

app.put("/register", async function (request: Request, response: Response) {
  const username = request.body.username;
  const password = request.body.password;

  if (!username || !password) {
    response.status(400).send("Bad request!");
  }

  const [user] =
    await db`SELECT EXISTS(SELECT 1 FROM accounts WHERE username=${username})`;

  if (user.exists) {
    response.status(409).send("User exists!");
  } else {
    const hash = bcrypt.hashSync(password);
    await db`INSERT INTO accounts (id, username, password) VALUES (DEFAULT, ${username}, ${hash})`;

    response.status(201).send({ username });
  }

  response.end();
});

app.listen(3000);
