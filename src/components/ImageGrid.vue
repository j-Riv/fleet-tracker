<template>
  <v-container fluid>
    <v-row>
      <!-- Default Photo -->
      <v-col class="d-flex child-flex" cols="4">
        <v-card flat tile class="d-flex">
          <v-img
            :src="`${baseUrl}/${defaultPhotoUrl}`"
            :lazy-src="`https://picsum.photos/10/6?image=${1 * 5 + 10}`"
            aspect-ratio="1"
            class="view-image grey lighten-2"
            @click="() => viewImage(`${baseUrl}/${defaultPhotoUrl}`)"
          >
            <template v-slot:placeholder>
              <v-row class="fill-height ma-0" align="center" justify="center">
                <v-progress-circular indeterminate color="grey lighten-5"></v-progress-circular>
              </v-row>
            </template>
          </v-img>
        </v-card>
      </v-col>
      <!-- Default Photo -->
      <!-- <v-col col="12" v-if="!images.length">No Other Images Available</v-col> -->
      <v-col v-for="image in images" :key="image.id" class="d-flex child-flex" cols="4">
        <v-card flat tile class="d-flex">
          <v-img
            :src="`${baseUrl}/${image.file_url}`"
            :lazy-src="`https://picsum.photos/10/6?image=${1 * 5 + 10}`"
            aspect-ratio="1"
            class="view-image grey lighten-2"
            @click="() => viewImage(`${baseUrl}/${image.file_url}`)"
          >
            <template v-slot:placeholder>
              <v-row class="fill-height ma-0" align="center" justify="center">
                <v-progress-circular indeterminate color="grey lighten-5"></v-progress-circular>
              </v-row>
            </template>
          </v-img>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts">
import Vue from 'vue';
import { baseImageUrl } from '../config/';

export default Vue.extend({
  name: 'ImageGrid',
  data: () => ({
    baseUrl: baseImageUrl,
    imageUrl: null,
    display: false,
  }),
  props: ['images', 'pinkSlip', 'defaultPhotoUrl'],
  methods: {
    viewImage(url: string) {
      this.$emit('setImageModalUrl', url);
    },
  },
});
</script>

<style lang="scss" scoped>
.view-image {
  cursor: pointer;
}
</style>
