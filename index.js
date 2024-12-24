const express = require("express");
const app = express();
var methodOverride = require("method-override");
const port = 3000;
const { v4: uuidv4, parse, stringify } = require("uuid");
const path = require("node:path");
app.use(methodOverride("_method"));

app.use(express.urlencoded({ extended: true }));
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.static(path.join(__dirname, "public")));

app.listen(port, () => {
  console.log(`Port Started ${port}`);
});

let posts = [
  {
    id: uuidv4(),
    username: "Laxmi",
    age: 12,
  },
  {
    id: uuidv4(),
    username: "Lolly",
    age: 17,
  },
  {
    id: uuidv4(),
    username: "Lax",
    age: 15,
  },
  {
    id: uuidv4(),
    username: "Dolly",
    age: 22,
  },
];

app.get("/posts/new", (req, res) => {
  res.render("new.ejs");
});

app.post("/posts", (req, res) => {
  let id = uuidv4();
  let { username, age } = req.body;
  posts.push({ id, username, age });
  res.redirect("/posts");
});
app.get("/posts", (req, res) => {
  res.render("index.ejs", { posts });
});

app.get("/posts/:id", (req, res) => {
  let { id } = req.params;
  id = id.toString();

  let post = posts.find((p) => id === p.id);
  res.render("viewPost.ejs", { post });
});

app.get("/posts/:id/edit", (req, res) => {
  let { id } = req.params;
  let post = posts.find((p) => id === p.id);
  res.render("edit.ejs", { post });
});

app.patch("/posts/:id", (req, res) => {
  let { id } = req.params;
  let post = posts.find((p) => id === p.id);
  let newAge = req.body.content;
  post.age = newAge;
  console.log(newAge);
  console.log(post);
  res.redirect("/posts");
});

app.delete("/posts/:id", (req, res) => {
  let { id } = req.params;
  posts = posts.filter((p) => id !== p.id);
  res.redirect("/posts");
});
