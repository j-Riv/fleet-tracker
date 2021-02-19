<template>
  <div id="vehicle">
    <v-container v-if="vehicleLoaded">
      <Breadcrumbs :items="crumbs" />
      <v-container>
        <v-row>
          <v-col cols="12" md="6" lg="6">
            <v-img
              :src="currentVehicle.image ? `${baseUrl}/${currentVehicle.image}` : '/images/no-photo-available.png'"
              aspect-ratio="1.25"
            ></v-img>
          </v-col>
          <v-col cols="12" md="6" lg="6">
            <v-row>
              <VehicleInfo :currentVehicle="currentVehicle" @setImageModalUrl="viewImage" />
            </v-row>
            <v-row>
              <v-col cols="6">
                <v-btn :to="`/vehicles/edit/${currentVehicle.id}`">Update / Edit</v-btn>
              </v-col>
              <v-col cols="6">
                <v-btn :to="`/vehicles/${currentVehicle.id}/event/create`">Add Event</v-btn>
              </v-col>
            </v-row>
          </v-col>
        </v-row>
      </v-container>

      <v-expansion-panels v-model="panel">
        <v-expansion-panel>
          <v-expansion-panel-header>Maintenance</v-expansion-panel-header>
          <v-expansion-panel-content>
            <List :records="currentVehicle.Maintenance.slice(0, 5)" :vehicleId="currentVehicle.id" type="maintenance" />
          </v-expansion-panel-content>
        </v-expansion-panel>
        <v-expansion-panel>
          <v-expansion-panel-header>Repairs</v-expansion-panel-header>
          <v-expansion-panel-content>
            <List :records="currentVehicle.Repairs.slice(0, 5)" :vehicleId="currentVehicle.id" type="repairs" />
          </v-expansion-panel-content>
        </v-expansion-panel>
        <v-expansion-panel>
          <v-expansion-panel-header>Images</v-expansion-panel-header>
          <v-expansion-panel-content>
            <ImageGrid
              :images="currentVehicle.Images"
              :pinkSlip="currentVehicle.pink_slip"
              :defaultPhotoUrl="currentVehicle.image"
              @setImageModalUrl="viewImage"
            />
          </v-expansion-panel-content>
        </v-expansion-panel>
      </v-expansion-panels>
    </v-container>
    <Loading v-if="!vehicleLoaded" msg="Vehicle" />
    <ImageModal :image_url="imageUrl" :display="display" @close="close" />
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import { mapGetters, mapActions } from 'vuex';
import { Crumbs } from '../types/crumbs';
import VehicleInfo from '@/components/VehicleInfo.vue';
import List from '@/components/List.vue';
import ImageGrid from '@/components/ImageGrid.vue';
import Breadcrumbs from '@/components/Breadcrumbs.vue';
import Loading from '@/components/Loading.vue';
import ImageModal from '@/components/ImageModal.vue';
import { baseImageUrl } from '../config';

export default Vue.extend({
  name: 'Vehicle',
  data: () => ({
    baseUrl: baseImageUrl,
    vehicleLoaded: false,
    crumbs: [] as Crumbs[],
    panel: [1, 1],
    readonly: false,
    imageUrl: '',
    display: false,
  }),
  computed: mapGetters(['currentVehicle']),
  methods: {
    ...mapActions(['getVehicle']),
    viewImage(url) {
      this.imageUrl = url;
      this.display = true;
    },
    close() {
      this.display = false;
      this.imageUrl = '';
    },
    setImageModalUrl(url) {
      this.viewImage(url);
      this.display = true;
    },
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
        disabled: true,
        href: '/vehicle/' + this.$route.params.vehicleId,
      },
    ];
  },
  components: {
    VehicleInfo,
    List,
    ImageGrid,
    ImageModal,
    // VehicleModal,
    Breadcrumbs,
    Loading,
  },
});
</script>

<style lang="scss">
.expansion-no-border {
  position: inherit;
}
</style>
