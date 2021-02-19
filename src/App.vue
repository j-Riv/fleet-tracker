<template>
  <v-app>
    <v-app-bar app>
      <v-app-bar-nav-icon v-if="isAuth" @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
      <v-toolbar-title class="headline text-uppercase">
        <router-link class="toolbar-title-link" to="/vehicles">
          <span class="font-weight-light">
            <span class="brand-text">{{ name }}</span>
            FLEET
            <span class="version-text">{{ version }}</span>
          </span>
        </router-link>
      </v-toolbar-title>
      <v-spacer></v-spacer>

      <v-btn text @click="changeTheme"><i class="mdi mdi-theme-light-dark"></i></v-btn>
      <v-btn text v-if="isAuth" @click="signout">Sign Out</v-btn>
    </v-app-bar>

    <v-content>
      <router-view
        :authorized="authorized"
        :handleAuthClick="handleAuthClick"
        :getData="getData"
        :createEvent="createEvent"
        :handleSignoutClick="handleSignoutClick"
        :syntaxHighlight="syntaxHighlight"
      />
    </v-content>
    <!-- nav -->
    <v-navigation-drawer v-model="drawer" temporary fixed app>
      <div class="logo">
        <span class="brand-text">SUAVE</span>
        FLEET
        <span class="version-text">{{ version }}</span>
      </div>

      <v-divider></v-divider>

      <v-list if="isAuth">
        <v-list-item @click="() => goTo('/dashboard')">
          <v-list-item-avatar>
            <v-icon class="grey darken-2 white--text">settings</v-icon>
          </v-list-item-avatar>

          <v-list-item-content>
            <v-list-item-title>Dashboard</v-list-item-title>
          </v-list-item-content>
        </v-list-item>

        <v-list-item @click="() => goTo('/vehicles')">
          <v-list-item-avatar>
            <v-icon class="grey darken-2 white--text">directions_car</v-icon>
          </v-list-item-avatar>

          <v-list-item-content>
            <v-list-item-title>Vehicles</v-list-item-title>
          </v-list-item-content>
        </v-list-item>

        <v-list-item @click="() => goTo('/calendar')">
          <v-list-item-avatar>
            <v-icon class="grey darken-2 white--text">calendar_today</v-icon>
          </v-list-item-avatar>

          <v-list-item-content>
            <v-list-item-title>Calendar</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
      <v-list v-if="isAdmin">
        <v-divider></v-divider>
        <v-list-item @click="() => goTo('/users')">
          <v-list-item-avatar>
            <v-icon class="grey darken-2 white--text">group</v-icon>
          </v-list-item-avatar>

          <v-list-item-content>
            <v-list-item-title>Users</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>

      <template v-slot:append>
        <div class="pa-2">
          <v-btn block @click="signout">Sign Out</v-btn>
        </div>
      </template>
    </v-navigation-drawer>
  </v-app>
</template>

<script lang="ts">
import Vue from 'vue';
import { mapGetters, mapActions } from 'vuex';
import router from './router';
import { Event, GoogleEvent } from './types/records';
import { vehicleTracker } from '../src/config';
import { Google } from '../src/config/google';
const { calendarId } = Google;

export default Vue.extend({
  name: 'App',
  data: () => ({
    name: vehicleTracker.name,
    version: vehicleTracker.version,
    // google
    api: undefined,
    authorized: false,
    // drawer
    drawer: null,
    items: '',
  }),
  computed: mapGetters(['isAuth', 'getTheme', 'currentUser', 'isAdmin']),
  created() {
    this.$vuetify.theme.dark = this.getTheme;
    // get current user if not already loaded
    if (this.isAuth && this.currentUser === null) {
      this.$store.dispatch('getCurrentUser');
    }
    this.$gapi.listenUserSignIn(isSignedIn => {
      this.authorized = isSignedIn;
      this.updateSigninStatus(isSignedIn);
    });
  },
  watch: {
    // to , from
    $route(to) {
      document.title = to.meta.title || 'Vehicle Tracker';
    },
  },
  methods: {
    ...mapActions(['signOut', 'authenticateUser', 'setData', 'setTheme', 'setEventLink', 'getCurrentUser']),
    goTo(view) {
      if (this.$route.path !== view) router.push(view);
    },
    /**
     *  Signout - removes JWT
     */
    signout() {
      this.$store.dispatch('signOut');
    },
    updateSigninStatus(isSignedIn) {
      if (isSignedIn) {
        this.authorized = true;
        this.$store.dispatch('authenticateUser', true);
      } else {
        this.authorized = false;
        this.$store.dispatch('authenticateUser', false);
      }
    },
    /**
     *  Sign in the user upon button click.
     */
    handleAuthClick() {
      this.$gapi.login();
    },
    /**
     *  Sign out the user upon button click.
     */
    handleSignoutClick() {
      this.$gapi.logout();
    },
    /**
     * Print the summary and start datetime/date of the next ten events in
     * the authorized user's calendar. If no events are found an
     * appropriate message is printed.
     */
    getData() {
      // const vm = this;
      this.$gapi.getGapiClient().then(gapi => {
        gapi.client.calendar.events
          .list({
            // 'calendarId': 'primary',
            calendarId,
            timeMin: new Date().toISOString(),
            showDeleted: false,
            singleEvents: true,
            maxResults: 10,
            orderBy: 'startTime',
          })
          .then((response: { result: string }) => {
            console.log('GET EVENTS RESPONSE');
            console.log(response);
            this.items = this.syntaxHighlight(response.result);
            this.$store.dispatch('setData', this.items);
          });
      });
    },
    syntaxHighlight(json: string) {
      if (typeof json != 'string') {
        json = JSON.stringify(json, undefined, 2);
      }
      json = json
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;');
      return json.replace(
        /("(\\u[a-zA-Z0-9]{4}|\\[^u]|[^\\"])*"(\s*:)?|\b(true|false|null)\b|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?)/g,
        match => {
          let cls = 'number';
          if (/^"/.test(match)) {
            if (/:$/.test(match)) {
              cls = 'key';
            } else {
              cls = 'string';
            }
          } else if (/true|false/.test(match)) {
            cls = 'boolean';
          } else if (/null/.test(match)) {
            cls = 'null';
          }
          return '<span class="' + cls + '">' + match + '</span>';
        }
      );
    },
    /**
     * Create event in the authorized user's calendar.
     */
    createEvent(event: GoogleEvent, data: Event) {
      this.$gapi.getGapiClient().then(gapi => {
        const request = gapi.client.calendar.events.insert({
          // 'calendarId': 'primary',
          calendarId,
          resource: event,
        });
        request.execute((event: GoogleEvent) => {
          if (event.htmlLink) {
            this.$store.dispatch('setEventLink', event.htmlLink);
            // Only save events of type maintenance or repair to db
            if (data.type === 'Maintenance' || data.type === 'Repair') {
              // add event link to data
              data.event_url = event.htmlLink;
              this.$store.dispatch('createEvent', data);
            }
          } else {
            this.$store.dispatch('eventError', true);
          }
        });
      });
    },
    changeTheme() {
      this.$store.dispatch('setTheme', this.getTheme);
      this.$vuetify.theme.dark = this.getTheme;
    },
  },
});
</script>

<style lang="scss">
html {
  background: #000000;
}
.theme--light {
  .toolbar-title-link {
    color: #000000;
    text-decoration: none;
  }
}
.theme--dark {
  .toolbar-title-link {
    color: #ffffff;
    text-decoration: none;
  }
}
.logo {
  font-size: 2em;
  text-align: center;
  padding: 16px;
}
.nav-link {
  text-decoration: none;
}
.brand-text {
  font-weight: bold;
}
.version-text {
  font-size: 0.5em;
  text-transform: lowercase;
}
</style>
