<template>
  <div id="app">
    <img src="./assets/calendar-flip-animation.gif" alt="notification" />
    <h1>Google Calendar Reminder</h1>
    <Event />
    <br />
  </div>
</template>

<script>
import Event from "./components/Event";

export default {
  name: "App",
  components: {
    Event
  }
};
</script>

<style>
@import url("https://fonts.googleapis.com/css2?family=Open+Sans&display=swap");

html,
body {
  width: 100%;
  height: 100%;
  margin: 0;
}

body {
  display: flex;
  justify-content: center;
  font-family: "Open Sans", sans-serif;
  background-color: #fafafa;
  color: #111;
  margin: 0;
}

#app {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  margin: 30px 0;
}

img {
  width: 150px;
}

h1 {
  color: #4586ef;
}
</style>
