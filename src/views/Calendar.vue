<template>
  <v-container>
    <v-row>
      <v-col cols="12">
        <div class="responsiveCal">
          <iframe
            src="https://calendar.google.com/calendar/embed?src=suavecitopomade.com_6ufic7jr020sgrl0m8qf6qsues%40group.calendar.google.com&ctz=America%2FLos_Angeles"
            style="border: 0"
            width="800"
            height="600"
            frameborder="0"
            scrolling="no"
          ></iframe>
        </div>
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
  name: 'Calendar',
});
</script>

<style lang="scss">
.responsiveCal {
  position: relative;
  padding-bottom: 75%;
  height: 0;
  overflow: hidden;
  iframe {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
  }
}
</style>
