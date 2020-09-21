<template>
  <div class="root">
    <form @submit.prevent="onSubmit">
      <div class="input-div">
        <input
          id="name"
          type="text"
          placeholder="Name"
          autocomplete="off"
          v-model="event.name"
        />
      </div>
      <div class="input-div" :class="{ invalid: $v.event.phone.$error }">
        <input
          id="phone"
          type="tel"
          placeholder="Phone"
          autocomplete="off"
          v-model="event.phone"
          @blur="$v.event.phone.$touch()"
        />
        <p v-if="!$v.event.phone.required">This field must not be empty.</p>
        <p v-if="!$v.event.phone.phone">Please provide a valid phone number.</p>
      </div>

      <div class="input-div" :class="{ invalid: $v.event.email.$error }">
        <input
          id="email"
          type="email"
          placeholder="email"
          autocomplete="off"
          v-model="event.email"
          @blur="$v.event.email.$touch()"
        />
        <p v-if="!$v.event.email.required">This field must not be empty.</p>
        <p v-if="!$v.event.email.email">
          Please provide a valid email address.
        </p>
      </div>

      <div class="input-div">
        <input id="date" type="date" v-model="event.date" />
      </div>

      <div class="input-div">
        <input id="time" type="time" v-model="event.time" />
      </div>

      <div class="input-div fake">
        <input
          id="fake"
          type="text"
          placeholder="fake"
          tabindex="-1"
          v-model="fake"
        />
      </div>

      <button type="submit">Submit</button>
    </form>

    <hr />

    <p v-if="Object.keys(events).length === 0">No Events</p>
    <p v-for="event in events" :key="event.id">
      {{ event.start.dateTime | formatDate }} - {{ event.summary }}
    </p>
    <div
      class="notification"
      :class="{
        succes: notification == 'succes',
        failed: notification == 'failed',
      }"
    >
      {{ notification }}
    </div>
  </div>
</template>

<script>
import Vue from "vue";
import CalendarService from "@/services/calendarService";
import moment from "moment";

import Vuelidate from "vuelidate";

Vue.use(Vuelidate);

import { required, email, helpers } from "vuelidate/lib/validators";

const phone = helpers.regex(
  "phone",
  /^[+]{0,1}[(]{0,1}[0-9]{1,4}[)]{0,1}[/\s\-0-9]{6,15}$/
);

export default {
  name: "AddEvent",
  data() {
    return {
      events: [],
      event: {
        name: "",
        phone: "",
        email: "",
        date: null,
        time: null,
      },
      notification: "",
      sitekey: "6Ld-RM4ZAAAAALTaDssF4TI2-Nrlr1ZIC1U4tz60",
      fake: "",
    };
  },
  filters: {
    formatDate(val) {
      if (val) {
        return moment(String(val)).format("MM/DD/YYYY @ hh:mm");
      }
    },
  },
  created() {
    this.resetEvent();
    this.retrieveEvents();
  },
  validations: {
    event: {
      email: {
        required,
        email,
      },
      phone: {
        required,
        phone,
      },
    },
  },

  methods: {
    resetEvent() {
      this.event.name = "";
      this.event.phone = "";
      this.event.email = "";
      this.event.date = moment(new Date()).format("YYYY-MM-DD");
      this.event.time = moment(new Date()).format("HH:mm");
    },
    retrieveEvents() {
      CalendarService.getAll()
        .then((response) => {
          this.events = response.data;
        })
        .catch((err) => {
          console.log(err);
        });
    },
    onSubmit: function() {
      if (this.fake) {
        console.log("fake");
        return;
      }

      this.$v.$touch();
      if (this.$v.$invalid) {
        return;
      }

      CalendarService.create(this.event)
        .then(() => {
          this.resetEvent();
          this.$v.$reset();
          this.setNotification("succes");
          this.retrieveEvents();
        })
        .catch((err) => {
          this.setNotification("failed");
          console.error(err);
        });
    },
    setNotification(str) {
      this.notification = str;
      setTimeout(() => {
        this.notification = "";
      }, 2000);
    },
  },
};
</script>

<style scoped>
.root {
  text-align: center;
}

form {
  display: inline-block;
}

.input-div {
  height: 53px;
  margin: 3px;
  text-align: left;
}
.input-div p {
  color: #ff3232;
  font-size: 13px;
}

input {
  width: 270px;
  background: transparent;
  border: 2px solid #9a9a9a;
  color: #111;
  font-family: inherit !important;
  font-size: 16px !important;
  padding: 5px;
}

input::placeholder {
  color: #999;
}

input:focus {
  outline-color: #4586ef;
}

.input-div.invalid input {
  border: 2px solid #ff3232;
  border-radius: 4px;
}

.input-div.invalid input:focus {
  outline-color: #ff3232;
}

.input-div p {
  display: none;
}

.input-div.invalid p {
  display: block;
}

.fake {
  position: absolute;
  top: -100px;
}

button {
  font-family: inherit !important;
  font-size: 16px !important;
  padding: 6px 12px;
  margin: 15px;
  background-color: #4586ef;
  border-radius: 7px;
  cursor: pointer;
  font-weight: 600;
  color: #eee;
  border: 2px solid transparent;
}

button:focus {
  outline-color: #2263ee;
}

button:active {
  background: #fafafa;
  color: #1278be;
  border: 2px solid #1278be;
  outline: none;
}

.notification {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  margin: 0 auto;
  padding: 6px;
  font-size: 14px;
  font-weight: bold;
}

.succes {
  background: #85bf85;
  color: #228b22;
}

.failed {
  background: #df9a9a;
  color: #a82e2e;
}

hr {
  width: 80%;
  border: 1px solid #9a9a9a;
  margin-top: 20px;
}

p {
  margin: 0;
}
</style>
