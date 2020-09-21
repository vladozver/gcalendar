require("dotenv").config();
const express = require("express");
const router = express.Router();
const { google } = require("googleapis");
const { OAuth2 } = google.auth;
const moment = require("moment");

const oAuth2Client = new OAuth2(
  process.env.CLIENT_ID,
  process.env.CLIENT_SECRET
);

oAuth2Client.setCredentials({
  refresh_token: process.env.REFRESH_TOKEN,
});

const calendar = google.calendar({ version: "v3", auth: oAuth2Client });

router.get("/", (req, res) => {
  calendar.events.list(
    {
      calendarId: "primary",
      timeMin: new Date().toISOString(),
      maxResults: 10,
      singleEvents: true,
      orderBy: "startTime",
    },
    (err, { data }) => {
      if (err) return console.log("API error:", err);
      res.json(data.items);
    }
  );
});

router.post("/", (req, res) => {
  if (
    !req.body.name ||
    !req.body.phone ||
    !req.body.email ||
    !req.body.date ||
    !req.body.time ||
    req.body.name == "" ||
    req.body.phone == "" ||
    req.body.email == "" ||
    req.body.date == "" ||
    req.body.time == ""
  ) {
    console.log("didn't get all required fields!");
    return res.status(400).json({ err: "didn't get all required fields!" });
  }

  const data = req.body;
  const dateTime = moment(`${data.date} ${data.time}`);
  const currentTime = moment();

  if (dateTime.isBefore(currentTime)) {
    console.log(
      "reminder date is set in the past, you can only add reminder in the future!"
    );
    return res.status(400).json({
      err:
        "reminder date is set in the past, you can only add reminder in the future!",
    });
  }

  const event = {
    summary: data.name,
    description: `phone: ${data.phone}\nemail: ${data.email}`,
    start: {
      dateTime: dateTime,
    },
    end: {
      dateTime: dateTime,
    },
    reminders: {
      useDefault: false,
      overrides: [
        { method: "popup", minutes: 15 },
        { method: "popup", minutes: 30 },
      ],
    },
    attendees: [{ email: data.email }],
  };

  calendar.events.insert(
    { calendarId: "primary", resource: event, sendNotifications: true },
    (err) => {
      if (err)
        return res.status(500).json({ err: "calendar insert error: " + err });

      return res.status(200).json({ ok: 1 });
    }
  );
});

module.exports = router;
