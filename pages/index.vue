<template>
  <div class="page main">
    <div class="container">
      <movable-component v-for="(element, index) in windows" :key="index" :item="{ ...element, index }" />
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import { mapState } from 'vuex';
import MovableComponent from '@/components/Movable.vue';

export default Vue.extend({
  name: 'index-page',
  computed: {
    ...mapState(['windows']),
  },
  components: {
    MovableComponent,
  },
});
</script>
