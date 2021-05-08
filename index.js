const fs = require("fs");
const express = require("express");
const path = require("path");

const app = express();
const PORT = 8080;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("./public"));

app.get("/", (req, res) =>
  res.sendFile(path.join(__dirname, "/public/index.html"))
);

app.get("/notes", (req, res) =>
  res.sendFile(path.join(__dirname, "/public/notes.html"))
);

app.get("/api/notes", (req, res) => {
  let notesData = JSON.parse(fs.readFileSync("./db/db.json", "utf8"));
  res.send(notesData)
})

app.post("/api/notes", (req, res) => {
  let notesData = JSON.parse(fs.readFileSync("./db/db.json", "utf8"));
  let newNote = req.body;
  let noteId = notesData.length.toString();
  newNote.id = noteId;
  notesData.push(newNote);

  fs.writeFileSync("./db/db.json", JSON.stringify(notesData));
  res.json(notesData);
});

app.get("*", (req, res) =>
  res.sendFile(path.join(__dirname, "/public/index.html"))
);

app.listen(PORT, () => {
  console.log(`App listening on PORT: ${PORT}`);
});