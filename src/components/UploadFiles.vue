<template>
  <form enctype="multipart/form-data">
    <v-container>
      <v-row>
        <v-col col="12">
          <p>Please name files before uploading.</p>
          <v-file-input multiple ref="files" label="File input" @change="onFileChange" clearable></v-file-input>
          <v-btn class="mr-4" @click="submit">Upload</v-btn>
        </v-col>
      </v-row>
    </v-container>
  </form>
</template>

<script lang="ts">
import Vue from 'vue';
import { mapGetters } from 'vuex';

export default Vue.extend({
  name: 'UploadFiles',
  data: () => ({
    files: [],
  }),
  props: ['type', 'vehicleId'],
  computed: mapGetters(['currentRecord']),
  methods: {
    submit() {
      if (this.files.length) {
        const formData = new FormData();
        if (this.type === 'maintenance') formData.append('maintenance_id', this.currentRecord.id);
        if (this.type === 'repairs') formData.append('repair_id', this.currentRecord.id);
        formData.append('vehicle_id', this.vehicleId);
        this.files.forEach(file => {
          formData.append('files', file);
        });
        // for (var [key, value] of formData.entries()) {
        //   console.log(key, value);
        // }
        this.$store
          .dispatch('uploadFiles', {
            type: this.type,
            id: this.currentRecord.id,
            formData,
          })
          .then(response => {
            console.log(response.status);
            if (response.status === 201) {
              console.log('we good');
              this.$store.dispatch('getRecord', {
                type: this.type,
                id: this.currentRecord.id,
              });
              (this.files = []), (this.$refs.files = []);
            }
            this.clear();
          });
      }
    },
    onFileChange(files: []) {
      console.log(files);
      this.files = files;
    },
    clear() {
      this.files = [];
    },
  },
});
</script>
