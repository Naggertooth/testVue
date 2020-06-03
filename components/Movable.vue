<template>
  <div>
    <client-only>
      <vue-draggable-resizable
        class="movable"
        :w="itemData.width || 300"
        :h="itemData.height || 100"
        :x="itemData.x"
        :y="itemData.y"
        :z="itemData.z"
        :grid="[10, 10]"
        @dragging="onDrag"
        @resizing="onResize"
        @activated="onActivated"
      >
        <div class="container" v-if="itemData.opened">
          <div class="head">
            <button class="closeButton" v-on:click="onOpenedActivity(false)">-</button>
            {{ itemData.title }}
          </div>
          <div class="inner">
            {{ itemData.text }}
          </div>
        </div>
        <div class="container" v-else>
          <div class="inner inner_closed">
            <button class="openButton" v-on:click="onOpenedActivity(true)">
              + Return item to trading desk
            </button>
          </div>
        </div>
      </vue-draggable-resizable>
    </client-only>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import { mapActions, mapMutations } from 'vuex';

export default Vue.extend({
  name: 'MovableComponent',
  props: {
    item: { type: Object },
  },
  data: function() {
    return {
      timeout: null,
      itemData: {
        ...this.item,
      },
    };
  },
  watch: {
    item: function(newItem) {
      this.itemData = newItem;
    },
  },
  methods: {
    ...mapMutations(['setActivatedWindow', 'setWindowState']),
    onResize: function(x: number, y: number, width: number, height: number) {
      // @ts-ignore
      clearTimeout(this.timeout);
      // @ts-ignore
      this.timeout = setTimeout(() => {
        this.itemData.x = x;
        this.itemData.y = y;
        this.itemData.width = width;
        this.itemData.height = height;
        this.setWindowState({ index: this.itemData.index, patcher: { x, y, width, height } });
      }, 200);
    },
    onDrag: function(x: number, y: number) {
      // @ts-ignore
      clearTimeout(this.timeout);
      // @ts-ignore
      this.timeout = setTimeout(() => {
        this.itemData.x = x;
        this.itemData.y = y;
        this.setWindowState({ index: this.itemData.index, patcher: { x, y } });
      }, 200);
    },
    onActivated: function() {
      this.setActivatedWindow(this.itemData.z);
    },
    onOpenedActivity: function(value: boolean) {
      this.itemData.opened = value;
      this.setWindowState({ index: this.itemData.index, patcher: { opened: value } });
    },
  },
});
</script>

<style lang="scss" scoped>
.container {
  height: 100%;
}

.head {
  background: #888;
  height: 2em;
  padding: 5px 20px;
  text-align: center;
}
.inner {
  background: #ddd;
  height: calc(100% - 2em);
  padding: 5px;

  &_closed {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100%;
    text-decoration: underline;
  }
}

.openButton {
  background: transparent;
  padding: 0;
  margin: 0;
  outline: none;
  border: none;
}
.closeButton {
  position: absolute;
  left: 10px;
  top: 11px;
  line-height: 1px;
  letter-spacing: 0;
  padding: 3px 2px 4px;
}

.movable {
  border-style: solid;
}
</style>
