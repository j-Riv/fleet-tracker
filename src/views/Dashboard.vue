<template>
  <v-container id="dashboard" v-if="currentUser !== null">
    <v-row>
      <v-col col="12">
        <p class="text-center">Hello {{ currentUser.displayName }}</p>
      </v-col>
    </v-row>
    <v-row>
      <v-col col="12">
        <div class="authentification">
          <h2>Google Calendar Authentication</h2>
          <button v-if="!isGoogleAuth" @click="handleAuthClick">
            <img src="/images/btn_google_signin_light_normal_web.png" alt="Sign In With GOOGLE" />
          </button>
          <v-btn text v-if="isGoogleAuth" @click="handleSignoutClick">
            <i class="mdi mdi-google"></i>
            - Sign Out
          </v-btn>
          <v-btn
            text
            v-if="isGoogleAuth"
            href="https://calendar.google.com/calendar?cid=c3VhdmVjaXRvcG9tYWRlLmNvbV82dWZpYzdqcjAyMHNncmwwbThxZjZxc3Vlc0Bncm91cC5jYWxlbmRhci5nb29nbGUuY29t"
            target="_blank"
          >
            <i class="mdi mdi-calendar-today"></i>
            View Calendar
          </v-btn>
        </div>
        <hr />
        <v-btn class="mb-5" v-if="isGoogleAuth" @click="getData">
          <i class="mdi mdi-calendar"></i>
          Get Calendar Data
        </v-btn>
        <div class="item-container" v-if="isGoogleAuth && getItems">
          <pre v-html="getItems"></pre>
        </div>
      </v-col>
    </v-row>
    <hr />
    <v-row class="mb-8">
      <v-col cols="12">
        <h2>Current State</h2>
        <div class="item-container mt-5" v-if="currentState">
          <pre v-html="currentState"></pre>
        </div>
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts">
import Vue from 'vue';
import { mapGetters } from 'vuex';

export default Vue.extend({
  name: 'Dashboard',
  data() {
    return {
      items: undefined,
    };
  },
  props: ['authorized', 'handleAuthClick', 'getData', 'createEvent', 'handleSignoutClick', 'syntaxHighlight'],
  computed: {
    ...mapGetters(['currentVehicle', 'getItems', 'isGoogleAuth', 'currentUser']),
    currentState: {
      get() {
        return this.syntaxHighlight(this.$store.state);
      },
      set(value) {
        this.syntaxHighlight(value);
      },
    },
  },
});
</script>

<style lang="scss">
body {
  font-family: 'Open Sans', sans-serif;
  font-size: 14px;
  font-weight: 300;
  line-height: 1em;
}
.item-container {
  background-color: #263238;
  .string {
    color: #b8db87;
  }
  .number {
    color: #d86a70;
  }
  .boolean {
    color: #d86a70;
  }
  .null {
    color: #d86a70;
  }
  .key {
    color: #6d5c86;
  }
}
.authentification {
  margin: 20px;
  text-align: center;
}
.item-container {
  height: 50vh;
  overflow-y: scroll;
  pre {
    outline: 1px solid #263238;
    padding: 5px;
    margin: 5px;
    overflow-x: hidden;
  }
}
hr {
  border: 1px solid black;
  margin: 30px;
}
</style>
