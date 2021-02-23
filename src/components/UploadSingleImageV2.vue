<template>
  <form enctype="multipart/form-data">
    <v-container>
      <v-row>
        <v-col col="12">
          <v-file-input ref="file" :label="formTitle" @change="onFileChange"></v-file-input>
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
  name: 'UploadSingleImageV2',
  data: () => ({
    file: '',
  }),
  props: ['vehicle', 'formTitle', 'actionType'],
  methods: {
    ...mapActions(['updateDefaultImage', 'updatePinkSlip']),
    submit() {
      const formData = new FormData();
      if (this.file !== '') {
        formData.append('file', this.file);
        // action type =  updateDefaultImage || updatePinkSlip;
        this.$store.dispatch(this.actionType, { id: this.vehicle.id, formData }).then(response => {
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
      } else {
        alert('Please add file.');
      }
    },
    onFileChange(file) {
      this.file = file;
    },
  },
});
</script>
