<template>
  <div id="repairs">
    <v-container v-if="vehicleLoaded">
      <Breadcrumbs :items="crumbs" />
      <v-row>
        <v-col col="12">
          <h1>Repairs</h1>
          <VehicleInfo :currentVehicle="currentVehicle" />
        </v-col>
      </v-row>
      <v-row>
        <v-col col="12">
          <List :records="currentVehicle.Repairs" :vehicleId="currentVehicle.id" type="repairs" />
        </v-col>
      </v-row>
    </v-container>
    <Loading v-if="!vehicleLoaded" msg="Repair Records" />
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import { mapGetters, mapActions } from 'vuex';
import { Crumbs } from '../types/crumbs';
import VehicleInfo from '@/components/VehicleInfo.vue';
import List from '@/components/List.vue';
import Breadcrumbs from '@/components/Breadcrumbs.vue';
import Loading from '@/components/Loading.vue';

export default Vue.extend({
  name: 'Repairs',
  data: () => ({
    vehicleLoaded: false,
    crumbs: [] as Crumbs[],
  }),
  computed: mapGetters(['currentVehicle']),
  // watch: {
  //   vehicleLoaded: function(value) {
  //     this.vehicleLoaded = value;
  //   },
  //   recordLoaded: function(value) {
  //     this.recordLoaded = value;
  //   }
  // },
  created() {
    if (this.currentVehicle === null || this.currentVehicle.id !== this.$route.params.vehicleId) {
      this.$store.dispatch('getVehicle', this.$route.params.vehicleId).then(() => {
        // this.vehicleLoaded = loaded;
        setTimeout(() => {
          this.vehicleLoaded = true;
        }, 500);
      });
    }
    if (this.currentVehicle) {
      this.vehicleLoaded = true;
    }
    // load crumbs
    this.crumbs = [
      {
        text: 'Vehicles',
        disabled: false,
        href: '/vehicles',
      },
      {
        text: 'Vehicle',
        disabled: false,
        href: '/vehicles/' + this.$route.params.vehicleId,
      },
      {
        text: 'Repairs',
        disabled: true,
        href: '/vehicles/' + this.$route.params.vehicleId + '/repairs',
      },
    ];
  },
  methods: {
    ...mapActions(['getRecord']),
  },
  components: {
    VehicleInfo,
    List,
    Breadcrumbs,
    Loading,
  },
});
</script>
