<template>
  <form enctype="multipart/form-data">
    <v-container>
      <v-row>
        <v-col col="12">
          <v-file-input multiple ref="photos" label="Add Photos" @change="onFileChange"></v-file-input>
          <v-btn class="mr-4" @click="submit">Upload</v-btn>
        </v-col>
      </v-row>
    </v-container>
  </form>
</template>

<script lang="ts">
import Vue from 'vue';
import { mapActions } from 'vuex';
import router from '../router';

export default Vue.extend({
  name: 'UploadImages',
  data: () => ({
    photos: [],
    files: [],
  }),
  props: ['vehicle'],
  methods: {
    ...mapActions(['uploadImages']),
    submit() {
      const formData = new FormData();
      formData.append('vehicle_id', this.vehicle.id);
      this.files.forEach(file => {
        formData.append('photos', file);
      });
      // for (const [key, value] of formData.entries()) {
      //   console.log(key, value);
      // }
      this.$store.dispatch('uploadImages', { id: this.vehicle.id, formData }).then(response => {
        console.log('vehicle loaded lets move');
        if (response.status === 201) {
          this.$store.dispatch('getVehicle', this.vehicle.id).then(loaded => {
            if (loaded) {
              router.push('/vehicles/' + this.vehicle.id);
            } else {
              console.log('Error loading vehicle');
            }
          });
        }
      });
    },
    onFileChange(files: []) {
      this.files = files;
    },
  },
});
</script>
