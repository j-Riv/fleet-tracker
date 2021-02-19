<template>
  <v-row justify="center">
    <v-dialog v-model="dialog" persistent max-width="800">
      <template v-slot:activator="{ on }">
        <v-btn color="primary" dark v-on="on">Update Vehicle</v-btn>
      </template>
      <v-card>
        <v-card-title class="headline">Add a Vehicle</v-card-title>
        <v-card-text>Please fill out the form below to update a Vehicle.</v-card-text>
        <v-container>
          <v-layout>
            <v-flex>
              <UpdateVehicleForm v-bind:vehicle="vehicle" />
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
import UpdateVehicleForm from './UpdateVehicleForm.vue';

export default Vue.extend({
  name: 'VehicleModal',
  data() {
    return {
      dialog: false,
    };
  },
  props: ['vehicle'],
  components: {
    UpdateVehicleForm,
  },
});
</script>
