import express from "express";
import dotenv from "dotenv";

const port = process.env.PORT || 5000;

const app = express();

dotenv.config();

app.get("/", (req, res) => {
  res.json({
    status: "OK",
    version: "1.0.0",
    port: port,
  });
});

app.get("/about", (req, res) => {
  res.send("About page");
});

app.post("/about", (req, res) => {
  res.send("Create data on about page");
});

app.get("/products", (req, res) => {
  res.send("Products");
});

app.get("/products/:id", (req, res) => {
  const id = req.params.id;
  const query = req.query;

  console.log(query);

  res.send(`Product of id: ${id}`);
});

app.listen(port, () => {
  console.log(`Server started at port ${port}...`);
});
