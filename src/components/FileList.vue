<template>
  <v-container>
    <v-list two-line subheader>
      <v-subheader>Files</v-subheader>
      <v-list-item v-if="!files.length">No Files Available</v-list-item>
      <v-list-item v-for="file in files" v-bind:key="file.id" @click="() => openFile(file.file_url)">
        <v-list-item-avatar>
          <v-icon class="grey lighten-1 white--text">file_copy</v-icon>
        </v-list-item-avatar>

        <v-list-item-content>
          <v-list-item-title>{{ file.file_url | formatFileName }}</v-list-item-title>
          <v-list-item-subtitle>{{ file.file_type }}</v-list-item-subtitle>
        </v-list-item-content>

        <v-list-item-action>
          <v-btn icon>
            <v-icon color="grey lighten-1">info</v-icon>
          </v-btn>
        </v-list-item-action>
      </v-list-item>
    </v-list>
  </v-container>
</template>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
  name: 'FileList',
  data: () => ({}),
  props: ['files'],
  filters: {
    formatFileName: function(value: string) {
      if (value) {
        return value.split('.')[0];
      }
    },
  },
  methods: {
    openFile(url) {
      const file_url = 'https://fleet.suavecito.com/public/uploads/vehicles/records/' + url;
      window.open(file_url, '_blank');
    },
  },
});
</script>
