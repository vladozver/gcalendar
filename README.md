### DEMO
https://gcalendar.vladozver.com/

### Fake gmail account
```bash
user: doe303790
pass: qwerty666_
```

### Server

Server is made using nodejs. To install and run use:

```bash
# cd server
# npm install
# node index.js
```
Dependencies I use are:
		
- cors
- dotenv
- express
- googleapi
- moment

Server got 3 routes:
```bash
- GET  /          - running server message
- GET  /gcalendar - getting reminders
- POST /gcalendar - saving reminder
```

When getting all reminders the result is list with max 10 active reminders, order by start time. Activ reminders are reminders that starts after current date time.

When posting, there is check for posting data. Required data are name, phone, email, date and time. Also there is check for reminder start date time. You can not send reminder wich starts in the past.

### Client

Client is made with vue. To install and run use:

```bash
# cd client
# npm install
# npm run serve
```

Dependencies and technique I use are:
		
- moment, for manipulation with date types data,
- **[Honeypot](https://en.wikipedia.org/wiki/Honeypot_(computing))** technique to protect forms against spammers/robots.
- vuelidate, for validating phone number and email,

Vuelidate do not have phone validation, so I made it with Vuelidate helpers using regex:
```js
const phone = helpers.regex("phone", /^[+]{0,1}[(]{0,1}[0-9]{1,4}[)]{0,1}[/\s\-0-9]{6,15}$/);

// 011/3-713-713    PASS
// 063/408-208      PASS
// +381 63 408-208   PASS
// 0800 300 199     PASS
// (750) 932-3498   PASS
```
**[check @ regexr.com](https://regexr.com/5ce81)**


---

### Progress

#### Front-end
Input fields (all required except note):<br/>
[x] Name<br/>
[x] Phone<br/>
[x] Email<br/>
[x] Time (time picker)<br/>
[x] Date (date picker)<br/>
[-] Note<br/>
    
[x] Form should have some spam/robot protection.<br/>
[x] Email and Phone fields should have standard validation<br/>
[x] Form should have success/fail messages<br/>

#### Back-end
[x] After SUBMIT, the form will connect to the google calendar account via Google calendar API<br/>
[x] create the calendar event and the reminder with provided information by the form user/client.<br/>
[x] client should receive remainders 15 and 30 mins before the meeting.

#### Note 
[x] Task should be hosted on Github and shared a link over email  job@lltms.co.rs.<br/>
[x] Event should have all entered data.<br/>
[x] Notification that event is created should be delivered to entered email.<br/>
[x] Create some fake google account to store calendar events.<br/>
[x] Task should include ReadMe.md file within the documentation.<br/>
