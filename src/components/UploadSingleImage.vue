<template>
  <form enctype="multipart/form-data">
    <v-container>
      <v-row>
        <v-col col="12">
          <v-file-input ref="file" label="Update Photo" @change="onFileChange"></v-file-input>
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
  name: 'UploadSingleImage',
  data: () => ({
    file: '',
  }),
  props: ['vehicle'],
  methods: {
    ...mapActions(['updateDefaultImage']),
    submit() {
      const formData = new FormData();
      if (this.file !== null) formData.append('file', this.file);
      this.$store.dispatch('updateDefaultImage', { id: this.vehicle.id, formData }).then(response => {
        if (response.status === 200) {
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
    onFileChange(file) {
      this.file = file;
    },
  },
});
</script>
