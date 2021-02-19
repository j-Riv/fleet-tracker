<template>
  <v-row justify="center">
    <v-dialog v-model="show" persistent max-width="800" v-bind:light="true">
      <v-card>
        <v-container>
          <v-layout>
            <v-flex>
              <v-img v-bind:src="image_url"></v-img>
            </v-flex>
          </v-layout>
        </v-container>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="primary darken-1" text @click="close">Close</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-row>
</template>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
  name: 'Modal',
  data() {
    return {};
  },
  props: ['image_url', 'display'],
  methods: {
    close() {
      this.$emit('close');
    },
  },
  computed: {
    show() {
      return this.display;
    },
  },
});
</script>
