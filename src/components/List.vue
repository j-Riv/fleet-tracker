<template>
  <v-container>
    <v-list two-line subheader>
      <v-subheader>
        <router-link class="list-title-link" :to="`/vehicles/${vehicleId}/${type}/all`">
          {{ type }}
        </router-link>
      </v-subheader>

      <v-list-item v-if="!records.length">No Records Available</v-list-item>

      <v-list-item v-for="item in records" v-bind:key="item.id" @click="() => viewRecord(item.id)">
        <v-list-item-avatar>
          <v-icon class="grey lighten-1 white--text">subject</v-icon>
        </v-list-item-avatar>

        <v-list-item-content>
          <v-list-item-title v-text="item.description"></v-list-item-title>
          <v-list-item-subtitle>{{ item.start_date | formatDate }}</v-list-item-subtitle>
        </v-list-item-content>

        <!-- <v-list-item-action>
          <v-btn icon>
            <v-icon color="grey lighten-1">info</v-icon>
          </v-btn>
        </v-list-item-action> -->
      </v-list-item>
    </v-list>
  </v-container>
</template>

<script lang="ts">
import Vue from 'vue';
import dayjs from 'dayjs';
import router from '../router';

export default Vue.extend({
  name: 'List',
  data: () => ({}),
  props: ['records', 'vehicleId', 'type'],
  filters: {
    formatDate: function(value: string) {
      if (value) {
        return dayjs(value).format('MM/DD/YYYY hh:mm');
      }
    },
  },
  methods: {
    viewRecord(id: string) {
      const url = '/vehicles/' + this.vehicleId + '/' + this.type + '/record/' + id;
      this.$store.dispatch('getRecord', { type: this.type, id }).then(loaded => {
        if (loaded) {
          router.push(url);
        }
      });
    },
  },
});
</script>

<style lang="scss">
.list-title-link {
  text-transform: uppercase;
  text-decoration: none;
}
</style>
