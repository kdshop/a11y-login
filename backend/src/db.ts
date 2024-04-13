import postgres from "postgres";

const db = postgres({
  host: "localhost", // Postgres ip address[s] or domain name[s]
  port: 5432, // Postgres server port[s]
  database: "example", // Name of database to connect to
  username: "example", // Username of database user
  password: "password", // Password of database user
});

export default db;
