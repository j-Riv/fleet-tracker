<template>
  <div id="vehicles">
    <v-container v-if="!vehiclesLoading">
      <v-row>
        <v-col cols="12">
          <VehicleSelect />
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="12">
          <v-expansion-panels v-model="panel">
            <v-expansion-panel>
              <v-expansion-panel-header>Add Vehicle</v-expansion-panel-header>
              <v-expansion-panel-content>
                <VehicleForm @added="close" />
              </v-expansion-panel-content>
            </v-expansion-panel>
          </v-expansion-panels>
        </v-col>
      </v-row>
      <v-row text-center wrap>
        <v-col cols="12" v-if="!allVehicles.length">
          <p class="text-center">No Vehicles Available</p>
        </v-col>
        <v-col cols="12" lg="3" md="3" v-for="vehicle in allVehicles" :key="vehicle.id">
          <Card :vehicle="vehicle" />
        </v-col>
      </v-row>
    </v-container>
    <Loading v-if="vehiclesLoading" msg="Vehicles" />
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import { mapGetters, mapActions } from 'vuex';
import VehicleSelect from '@/components/VehicleSelect.vue';
import VehicleForm from '@/components/VehicleForm.vue';
import Card from '@/components/Card.vue';
import Loading from '@/components/Loading.vue';

export default Vue.extend({
  name: 'Vehicles',
  data: () => ({
    panel: [0],
  }),
  methods: {
    ...mapActions(['getVehicles']),
    close() {
      this.panel = [0];
    },
  },
  created() {
    this.$store.dispatch('getVehicles');
  },
  computed: mapGetters(['allVehicles', 'vehiclesLoading']),
  components: {
    VehicleSelect,
    VehicleForm,
    Card,
    Loading,
  },
});
</script>

<style lang="scss">
#vehicles {
  .titles {
    font-weight: bold;
  }
}
</style>
