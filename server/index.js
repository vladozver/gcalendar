const express = require("express");
const app = express();
const cors = require("cors");
const bodyParser = require("body-parser");
const calendar = require("./routes/calendarRouter");
const port = 9003;

app.use(cors());

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.get("/", (req, res) => {
  res.json({ server: "running" });
});

app.use("/calendar", calendar);

app.listen(port, console.log(`http://localhost:${port}`));
