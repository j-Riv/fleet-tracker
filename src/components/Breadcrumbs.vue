<template>
  <ul class="breadcrumb">
    <li v-for="(item, i) in items" :key="i">
      <router-link :to="item.href" :class="item.disabled ? 'breadcrumb-item breadcrumb-disabled' : 'breadcrumb-item'">
        {{ item.text }}
      </router-link>
      <span class="breadcrumb-divider" v-if="i !== Object.keys(items).length - 1">></span>
    </li>
  </ul>
</template>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
  name: 'Breadcrumbs',
  props: ['items'],
});
</script>

<style lang="scss">
.breadcrumb {
  padding-left: 0 !important;
  li {
    -webkit-box-align: center;
    -ms-flex-align: center;
    align-items: center;
    display: -webkit-inline-box;
    display: -ms-inline-flexbox;
    display: inline-flex;
    font-size: 1.5em;
    &:nth-child(even) {
      padding: 0 12px;
    }
    a {
      cursor: pointer;
    }
    .breadcrumb-item {
      -webkit-box-align: center;
      -ms-flex-align: center;
      align-items: center;
      display: -webkit-inline-box;
      display: -ms-inline-flexbox;
      display: inline-flex;
      text-decoration: none;
      -webkit-transition: 0.3s cubic-bezier(0.25, 0.8, 0.5, 1);
      transition: 0.3s cubic-bezier(0.25, 0.8, 0.5, 1);
      &.breadcrumb-disabled {
        pointer-events: none;
        color: rgba(255, 255, 255, 0.5);
      }
    }
    .breadcrumb-divider {
      padding: 0 6px 0 12px;
      color: rgba(255, 255, 255, 0.5);
    }
  }
}
</style>
