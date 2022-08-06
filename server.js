const express = require("express");
const path = require("path");
const fs = require("fs");
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

const PORT = process.env.PORT || 3001;

app.get("/notes", (req, res) => {
  res.sendFile(path.join(__dirname, "./public/notes.html"));
});
app.get("/api/notes", (req, res) => {
  res.sendFile(path.join(__dirname, "./db", "db.json"));
});
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "./public/index.html"));
});

app.post("/api/notes", (req, res) => {
  var newNote = req.body;

  fs.readFile("./Develop/db/db.json", "utf8", (err, data) => {
    if (err) {
      console.error(err);
    } else {
      var allNotes = JSON.parse(data);

      allNotes.push(newNote);

      fs.writeFile(
        "./Develop/db/db.json",
        JSON.stringify(allNotes, null, 4),
        (writeErr) =>
          writeErr
            ? console.error(writeErr)
            : console.info("Successfully updated notes!")
      );
    }
  });
});

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
