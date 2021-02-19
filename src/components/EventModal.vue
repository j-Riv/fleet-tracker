<template>
  <v-row>
    <v-dialog v-model="dialog" persistent max-width="800">
      <template v-slot:activator="{ on }">
        <v-btn dark v-on="on">CREATE EVENT</v-btn>
      </template>
      <v-card justify="center">
        <v-card-title class="headline">Add a Vehicle</v-card-title>
        <v-card-text>Please fill out the form below to add a Vehicle to the database.</v-card-text>
        <v-container>
          <v-layout>
            <v-flex>
              <EventForm />
            </v-flex>
          </v-layout>
        </v-container>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="green darken-1" text @click="dialog = false">Cancel</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-row>
</template>

<script lang="ts">
import Vue from 'vue';
import EventForm from './EventForm.vue';
export default Vue.extend({
  name: 'EventModal',
  data() {
    return {
      dialog: false,
    };
  },
  components: {
    EventForm,
  },
});
</script>
