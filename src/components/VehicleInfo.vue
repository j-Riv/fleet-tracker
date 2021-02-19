<template>
  <v-container>
    <v-row>
      <v-col cols="12">
        <h1>{{ currentVehicle.name }}</h1>
        <p :class="`availability ${currentVehicle.active ? 'available' : 'unavailable'}`">
          {{ currentVehicle.active ? 'Available' : 'Unavailable' }}
        </p>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12">
        <span class="titles">Owner:</span>
        <span class="values">{{ currentVehicle.owner }}</span>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="6">
        <span class="titles">Type:</span>
        <span class="values">{{ currentVehicle.type }}</span>
      </v-col>
      <v-col cols="6">
        <span class="titles">Year:</span>
        <span class="values">{{ currentVehicle.year }}</span>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="6">
        <span class="titles">Make:</span>
        <span class="values">{{ currentVehicle.make }}</span>
      </v-col>
      <v-col cols="6">
        <span class="titles">Model:</span>
        <span class="values">{{ currentVehicle.model }}</span>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12" md="6">
        <span class="titles">License Plate:</span>
        <span class="values">{{ currentVehicle.license_plate }}</span>
      </v-col>
      <v-col cols="12" md="6">
        <span class="titles">Vin:</span>
        <span class="values">{{ currentVehicle.vin }}</span>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="6">
        <span class="titles">Color:</span>
        <span class="values">{{ currentVehicle.color }}</span>
      </v-col>
      <v-col cols="6">
        <span class="titles">Non Op:</span>
        <span class="values">{{ currentVehicle.non_op }}</span>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="6">
        <span class="titles">Registration Exp:</span>
        <span class="values">{{ currentVehicle.registration_exp }}</span>
      </v-col>
      <v-col cols="6">
        <span class="titles">Insurance Exp:</span>
        <span class="values">{{ currentVehicle.insurance_exp }}</span>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="6">
        <span class="titles">Use Type:</span>
        <span class="values">{{ currentVehicle.use }}</span>
      </v-col>
      <v-col cols="6">
        <span class="titles">Key #:</span>
        <span class="values">{{ currentVehicle.key_number }}</span>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="6">
        <span class="titles">Location:</span>
        <span class="values">{{ currentVehicle.location }}</span>
      </v-col>
      <v-col cols="6">
        <span class="titles">Cost (New):</span>
        <span class="values">${{ currentVehicle.cost_new }}</span>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12">
        <span class="titles">Note:</span>
        <span class="values">{{ currentVehicle.note }}</span>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12">
        <span class="titles">Pink Slip:</span>
        <span class="values">
          <button v-if="currentVehicle.pink_slip" @click="() => viewImage(`${baseUrl}/${currentVehicle.pink_slip}`)">
            View
          </button>
          <span v-else>N/A</span>
        </span>
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts">
import Vue from 'vue';
import { baseImageUrl } from '../config/';

export default Vue.extend({
  name: 'VehicleInfo',
  data: () => ({
    baseUrl: baseImageUrl,
  }),
  props: ['currentVehicle'],
  methods: {
    viewImage(url: string) {
      this.$emit('setImageModalUrl', url);
    },
  },
});
</script>

<style lang="scss">
.availability {
  font-style: italic;
  &.available {
    color: green;
  }
  &.unavailable {
    color: red;
  }
}
.titles {
  padding-right: 15px;
  text-transform: uppercase;
  font-weight: bold;
}
</style>
