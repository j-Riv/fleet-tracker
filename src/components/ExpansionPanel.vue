<template>
  <v-container>
    <v-expansion-panels v-model="panel" :disabled="expansionDisabled">
      <v-expansion-panel>
        <v-expansion-panel-header>Add Vehicle</v-expansion-panel-header>
        <v-expansion-panel-content>
          <p class="text-left">Fill out the form below to add a vehicle to the database.</p>
          <VehicleForm />
        </v-expansion-panel-content>
      </v-expansion-panel>
      <v-expansion-panel v-bind:disabled="eventDisabled">
        <v-expansion-panel-header>
          Create Event
          <span v-if="eventDisabled">(Please select a vehicle)</span>
        </v-expansion-panel-header>
        <v-expansion-panel-content>
          <p class="text-left">Fill out the form below to create an event for the selected vehicle.</p>
          <EventForm v-bind:createEvent="createEvent" />
        </v-expansion-panel-content>
      </v-expansion-panel>
    </v-expansion-panels>
  </v-container>
</template>

<script lang="ts">
import Vue from 'vue';
import VehicleForm from './VehicleForm.vue';
import EventForm from './EventForm.vue';

export default Vue.extend({
  name: 'ExpansionPanel',
  data: () => ({
    panel: [1, 1],
    readonly: false,
  }),
  props: ['expansionDisabled', 'eventDisabled', 'createEvent'],
  components: {
    VehicleForm,
    EventForm,
  },
  methods: {
    emitEvent(data) {
      this.$emit('event', data);
    },
  },
});
</script>
