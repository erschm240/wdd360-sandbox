// NodeJS Review completed by Emma Schmitz

import express from "express";

const app = express();

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.get("/users/:id", (req, res) => {
  res.send("Hello User route!");

  console.log("Body: ", req.body);
  console.log("Params: ", req.params);
  console.log("query: ", req.query);
  console.log("method: ", req.method);
  console.log("url: ", req.url);
  console.log("ip: ", req.ip);
  console.log("cookies: ", req.cookies);
});

app.post("/users", (req, res) => {
  res.json({ userId: req.params.id, message: "Hello User route!" });
});

app.listen(3000, () => {
  console.log("Server is running on port 3000");
  console.log("Server Link: http://localhost:3000");
  console.log("Request Tester: http://localhost:3000/users/1?some=param");
});