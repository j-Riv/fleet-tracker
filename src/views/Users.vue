<template>
  <div id="users">
    <v-container v-if="usersLoaded">
      <h1>Users</h1>
      <v-list two-line subheader>
        <v-subheader>All</v-subheader>

        <v-list-item v-for="user in allUsers" v-bind:key="user.id" @click="() => displayModal(user)">
          <v-list-item-avatar>
            <v-icon class="grey lighten-1 white--text">face</v-icon>
          </v-list-item-avatar>

          <v-list-item-content>
            <v-list-item-title v-text="user.email"></v-list-item-title>
            <v-list-item-subtitle>{{ user.displayName }}</v-list-item-subtitle>
          </v-list-item-content>

          <v-list-item-action>
            <v-btn icon>
              <v-icon color="grey lighten-1">update</v-icon>
            </v-btn>
          </v-list-item-action>
        </v-list-item>
      </v-list>
      <UpdateUserModal :user="thisUser" :userId="id" :display="display" @close="close" />
    </v-container>
    <Loading v-if="!usersLoaded" msg="Users" />
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import { mapGetters, mapActions } from 'vuex';
import Loading from '@/components/Loading.vue';
import UpdateUserModal from '@/components/UpdateUserModal.vue';

export default Vue.extend({
  name: 'Users',
  data: () => ({
    usersLoaded: false,
    display: false,
    id: null,
    thisUser: {
      email: null,
      displayName: null,
      admin: null,
      id: null,
    },
  }),
  computed: mapGetters(['allUsers']),
  methods: {
    ...mapActions(['getAllUsers']),
    displayModal(user) {
      this.display = true;
      this.thisUser = user;
      this.id = user.id;
    },
    close() {
      this.display = false;
    },
  },
  created() {
    // get users if not already loaded
    if (this.allUsers === null) {
      this.$store.dispatch('getAllUsers').then(loaded => {
        if (loaded) {
          setTimeout(() => {
            this.usersLoaded = true;
          }, 500);
        }
      });
    } else {
      this.usersLoaded = true;
    }
  },
  components: {
    Loading,
    UpdateUserModal,
  },
});
</script>
