<template>
  <div id="event">
    <v-container v-if="vehicleLoaded">
      <Breadcrumbs :items="crumbs" />
      <v-row>
        <v-col col="12">
          <EventForm :createEvent="createEvent" :vehicle="currentVehicle" />
        </v-col>
      </v-row>
    </v-container>
    <Loading v-if="!vehicleLoaded" msg="Vehicle" />
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import { mapGetters, mapActions } from 'vuex';
import { Crumbs } from '../types/crumbs';
import Breadcrumbs from '@/components/Breadcrumbs.vue';
import Loading from '@/components/Loading.vue';
import EventForm from '@/components/EventForm.vue';

export default Vue.extend({
  name: 'Event',
  data: () => ({
    vehicleLoaded: false,
    crumbs: [] as Crumbs[],
  }),
  computed: mapGetters(['currentVehicle']),
  props: ['createEvent'],
  methods: {
    ...mapActions(['getVehicle']),
  },
  created() {
    // get vehicle if its not already loaded
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
        text: 'Event',
        disabled: true,
        href: '#',
      },
    ];
  },
  components: {
    Breadcrumbs,
    Loading,
    EventForm,
  },
});
</script>

<style lang="scss">
.expansion-no-border {
  position: inherit;
}
</style>
