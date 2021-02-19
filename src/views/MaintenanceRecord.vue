<template>
  <div id="maintenance-record">
    <v-container v-if="vehicleLoaded && recordLoaded">
      <Breadcrumbs :items="crumbs" />
      <v-row v-if="recordLoaded">
        <v-col cols="12">
          <h1>Maintenance</h1>
          <p>Description: {{ currentRecord.description }}</p>
          <p>
            Date: {{ currentRecord.start_date | formatDate }} -
            {{ currentRecord.end_date | formatDate }}
          </p>
          <a class="calender-event-link" :href="currentRecord.event_url" target="_blank">Event Link</a>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="12">
          <v-expansion-panels v-model="panel">
            <v-expansion-panel>
              <v-expansion-panel-header>Vehicle Info</v-expansion-panel-header>
              <v-expansion-panel-content>
                <VehicleInfo v-if="vehicleLoaded" :currentVehicle="currentVehicle" />
              </v-expansion-panel-content>
            </v-expansion-panel>
            <v-expansion-panel>
              <v-expansion-panel-header>Files</v-expansion-panel-header>
              <v-expansion-panel-content>
                <FileList v-if="recordLoaded" :files="currentRecord.Maintenance_Files" />
                <UploadFiles v-if="vehicleLoaded" type="maintenance" :vehicleId="currentVehicle.id" />
              </v-expansion-panel-content>
            </v-expansion-panel>
            <v-expansion-panel>
              <v-expansion-panel-header>Update Record</v-expansion-panel-header>
              <v-expansion-panel-content>
                <UpdateEventForm
                  v-if="recordLoaded"
                  :vehicle="currentVehicle"
                  :record="currentRecord"
                  eventType="maintenance"
                />
              </v-expansion-panel-content>
            </v-expansion-panel>
          </v-expansion-panels>
        </v-col>
      </v-row>
    </v-container>
    <Loading v-if="!vehicleLoaded || !recordLoaded" msg="Maintenance Record" />
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import { mapGetters, mapActions } from 'vuex';
import { Crumbs } from '../types/crumbs';
import dayjs from 'dayjs';
import VehicleInfo from '@/components/VehicleInfo.vue';
import FileList from '@/components/FileList.vue';
import UploadFiles from '@/components/UploadFiles.vue';
import UpdateEventForm from '@/components/UpdateEventForm.vue';
import Breadcrumbs from '@/components/Breadcrumbs.vue';
import Loading from '@/components/Loading.vue';

export default Vue.extend({
  name: 'Maintenance',
  data: () => ({
    vehicleLoaded: false,
    recordLoaded: false,
    crumbs: [] as Crumbs[],
    panel: [1, 1, 1],
    readonly: false,
  }),
  computed: mapGetters(['currentVehicle', 'currentRecord', 'vehiclesLoading', 'recordsLoading']),
  // watch: {
  //   vehicleLoaded: function(value) {
  //     this.vehicleLoaded = value;
  //   },
  //   recordLoaded: function(value) {
  //     this.recordLoaded = value;
  //   }
  // },
  filters: {
    formatDate: function(value) {
      if (value) {
        return dayjs(value).format('MM/DD/YYYY hh:mm');
      }
    },
  },
  created() {
    if (this.currentVehicle === null || this.currentVehicle.id !== this.$route.params.vehicleId) {
      this.$store.dispatch('getVehicle', this.$route.params.vehicleId).then(loaded => {
        // this.vehicleLoaded = loaded;
        setTimeout(() => {
          this.vehicleLoaded = loaded;
        }, 500);
      });
    }
    if (this.currentRecord === null || this.currentRecord.id !== this.$route.params.recordId) {
      this.$store
        .dispatch('getRecord', {
          type: 'maintenance',
          id: this.$route.params.recordId,
        })
        .then(loaded => {
          // this.recordLoaded = loaded;
          setTimeout(() => {
            this.recordLoaded = loaded;
          }, 500);
        });
    }
    if (this.currentVehicle && this.currentRecord) {
      // this.vehicleLoaded = true;
      // this.recordLoaded = true;
      setTimeout(() => {
        this.vehicleLoaded = true;
        this.recordLoaded = true;
      }, 500);
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
        text: 'Maintenance',
        disabled: false,
        href: '/vehicles/' + this.$route.params.vehicleId + '/maintenance/all',
      },
      {
        text: 'Record',
        disabled: true,
        href: '/vehicles/' + this.$route.params.vehicleId + '/maintenance/record/' + this.$route.params.recordId,
      },
    ];
  },
  methods: {
    ...mapActions(['getRecord']),
  },
  components: {
    VehicleInfo,
    FileList,
    UploadFiles,
    UpdateEventForm,
    Breadcrumbs,
    Loading,
  },
});
</script>

<style lang="scss">
.calender-event-link {
  text-decoration: none;
}
</style>
