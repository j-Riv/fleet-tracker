<template>
  <v-container>
    <v-select
      v-model="type"
      :items="types"
      item-text="text"
      item-value="value"
      label="Vehicle Type"
      @change="() => selectType(type)"
    ></v-select>
  </v-container>
</template>

<script lang="ts">
import Vue from 'vue';
import { mapActions } from 'vuex';

export default Vue.extend({
  name: 'VehicleSelect',
  data: () => ({
    types: [
      { text: 'All', value: 'all' },
      { text: 'Cars', value: 'car' },
      { text: 'Motorcycles', value: 'motorcycle' },
      { text: 'Recreational', value: 'recreational' },
      { text: 'Trailers', value: 'trailer' },
      { text: 'Trucks', value: 'truck' },
      { text: 'Vans', value: 'van' },
    ],
  }),
  computed: {
    type: {
      get() {
        return this.$store.state.vehicles.vehicleType;
      },
      set(value) {
        this.$store.commit('setVehicleType', value);
      },
    },
  },
  methods: {
    ...mapActions(['getVehiclesByType']),
    selectType(type: string) {
      this.type = type;
      this.$emit('startLoader');
      if (type === 'all') {
        this.$store.dispatch('getVehicles');
      } else {
        this.$store.dispatch('getVehiclesByType', type);
      }
    },
  },
});
</script>

<style lang="scss"></style>
