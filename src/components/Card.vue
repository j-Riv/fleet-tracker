<template>
  <v-card
    class="mx-auto"
    :loading="loading"
    @click="
      () => {
        loader = 'loadingBtn';
        setVehicle(vehicle);
      }
    "
  >
    <v-img
      :src="vehicle.image ? `${baseUrl}/${vehicle.image}` : '/images/no-photo-available.png'"
      height="200px"
    ></v-img>

    <v-card-title>
      <div>{{ vehicle.name }}</div>
      <span class="grey--text subtitle-1">{{ vehicle.type }}</span>
    </v-card-title>
    <v-card-actions>
      <v-container>
        <v-row>
          <v-col cols="12">
            <v-btn
              block
              :loading="loadingBtn"
              :disabled="loadingBtn"
              @click="
                () => {
                  loader = 'loadingBtn';
                  setVehicle(vehicle);
                }
              "
            >
              View
              <template v-slot:loader>
                <span>Loading...</span>
              </template>
            </v-btn>
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="12">
            <v-btn icon @click="show = !show">
              <v-icon>{{ show ? 'keyboard_arrow_up' : 'keyboard_arrow_down' }}</v-icon>
            </v-btn>
          </v-col>
        </v-row>
      </v-container>
    </v-card-actions>

    <v-expand-transition>
      <div v-show="show">
        <v-card-text>
          <v-row>
            <v-col cols="6">
              Make:
              <span class="titles">{{ vehicle.make }}</span>
            </v-col>
            <v-col cols="6">
              Model:
              <span class="titles">{{ vehicle.model }}</span>
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="6">
              License Plate:
              <span class="titles">{{ vehicle.license_plate }}</span>
            </v-col>
            <v-col col="6">
              Vin:
              <span class="titles">{{ vehicle.vin }}</span>
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="6">
              Color:
              <span class="titles">{{ vehicle.color }}</span>
            </v-col>
            <v-col cols="6">
              Non Op:
              <span class="titles">{{ vehicle.non_op }}</span>
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="6">
              Registration Exp:
              <span class="titles">{{ vehicle.registration_exp }}</span>
            </v-col>
            <v-col cols="6">
              Insurance Exp:
              <span class="titles">{{ vehicle.insurance_exp }}</span>
            </v-col>
          </v-row>
        </v-card-text>
      </div>
    </v-expand-transition>
  </v-card>
</template>

<script lang="ts">
import Vue from 'vue';
import { mapGetters, mapActions } from 'vuex';
import router from '../router';
import { baseImageUrl } from '../config';

export default Vue.extend({
  name: 'Card',
  data: () => ({
    baseUrl: baseImageUrl,
    show: false,
    file: null,
    loading: false,
    loader: null,
    loadingBtn: false,
  }),
  props: ['vehicle'],
  computed: mapGetters(['vehicleLoading']),
  watch: {
    loader() {
      const l: any = this.loader;
      this[l] = !this[l];
    },
  },
  methods: {
    ...mapActions(['getVehicle', 'updateVehicle']),
    setVehicle(vehicle) {
      this.loading = true;
      this.$store.dispatch('getVehicle', vehicle.id).then(loaded => {
        if (loaded) {
          setTimeout(() => {
            this.loading = false;
            router.push('/vehicles/' + vehicle.id);
          }, 1000);
        } else {
          console.log('Error loading vehicle');
        }
      });
    },
  },
});
</script>

<style lang="scss">
.subtitle-1 {
  width: 100%;
}
</style>
