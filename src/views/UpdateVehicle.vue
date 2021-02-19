<template>
  <v-container id="update-vehicle" v-if="currentVehicle">
    <Breadcrumbs :items="crumbs" />
    <v-row>
      <v-col cols="12">
        <h1>Edit / Update Vehicle</h1>
        <UpdateVehicleForm :vehicle="currentVehicle" />
      </v-col>
    </v-row>
    <hr />
    <v-row class="pt-8">
      <v-col cols="12" lg="4" md="4">
        <h2>Update Pink Slip</h2>
        <UploadSingleImageV2 :vehicle="currentVehicle" formTitle="Pink Slip" actionType="updatePinkSlip" />
      </v-col>
      <v-col cols="12" lg="4" md="4">
        <h2>Update Default Image</h2>
        <UploadSingleImage :vehicle="currentVehicle" />
      </v-col>
      <v-col cols="12" lg="4" md="4">
        <h2>Add Images</h2>
        <UploadImages :vehicle="currentVehicle" />
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12">
        <v-btn @click="goBack">Cancel</v-btn>
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts">
import Vue from 'vue';
import { mapGetters, mapActions } from 'vuex';
import router from '../router';
import { Crumbs } from '../types/crumbs';
import UpdateVehicleForm from '@/components/UpdateVehicleForm.vue';
import UploadImages from '@/components/UploadImages.vue';
import Breadcrumbs from '@/components/Breadcrumbs.vue';
import UploadSingleImage from '@/components/UploadSingleImage.vue';
import UploadSingleImageV2 from '@/components/UploadSingleImageV2.vue';

export default Vue.extend({
  name: 'UpdateVehicle',
  data: () => ({
    crumbs: [] as Crumbs[],
  }),
  computed: mapGetters(['currentVehicle']),
  methods: {
    ...mapActions(['getVehicle']),
    goBack() {
      router.push('/vehicles/' + this.currentVehicle.id);
    },
  },
  created() {
    // get vehicle if its not already loaded
    if (this.currentVehicle === null || this.currentVehicle.id !== this.$route.params.recordId) {
      this.$store.dispatch('getVehicle', this.$route.params.vehicleId);
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
        text: 'Edit/Update',
        disabled: true,
        href: '#',
      },
    ];
  },
  components: {
    UpdateVehicleForm,
    UploadImages,
    Breadcrumbs,
    UploadSingleImage,
    UploadSingleImageV2,
  },
});
</script>

<style lang="scss">
.expansion-no-border {
  position: inherit;
}
</style>
