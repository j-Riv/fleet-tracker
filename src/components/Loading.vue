<template>
  <v-container id="loader">
    <v-content>
      <v-container fluid>
        <v-row align="center" justify="center">
          <v-col cols="12">
            <p class="text-center">Loading {{ msg }}...</p>
            <v-progress-linear color="primary accent-4" indeterminate rounded height="6"></v-progress-linear>
          </v-col>
        </v-row>
      </v-container>
    </v-content>
  </v-container>
</template>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
  name: 'Loading',
  props: ['msg'],
});
</script>
