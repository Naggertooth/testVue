<template>
  <div class="page main">
    <div class="container">
      <div class="buttonContainer">
        <button class="button" v-on:click="startTrack">Запуск</button>
        <button class="button" v-on:click="stopTrack">Остановка</button>
        <button class="button" v-on:click="clear">Сброс</button>
      </div>
      <table-component ref="table" :transactions="txs" />
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import TableComponent from '@/components/Table.vue';

export default Vue.extend({
  name: 'track-transactions-page',
  components: {
    TableComponent,
  },
  data: () => ({
    txs: [],
    btcs: null,
  }),
  methods: {
    startTrack() {
      try {
        this.$data.btcs.send(JSON.stringify({ op: 'unconfirmed_sub' }));
      } catch (error) {
        console.error(error);
      }
    },
    stopTrack() {
      try {
        this.$data.btcs.send(JSON.stringify({ op: 'unconfirmed_unsub' }));
      } catch (error) {
        console.error(error);
      }
    },
    clear() {
      this.$data.txs = [];
      // @ts-ignore
      this.$refs.table.$refs.vuetable.resetData();
      // @ts-ignore
      this.$refs.table.$refs.pagination.setPaginationData(null);
      // @ts-ignore
      this.$refs.table.$refs.paginationInfo.setPaginationData(null);
      // @ts-ignore
      this.$refs.table.$forceUpdate();
      this.$forceUpdate();
    },
  },
  created() {
    if (process.browser) {
      try {
        this.$data.btcs = new WebSocket('wss://ws.blockchain.info/inv');
        this.$data.btcs.onopen = () => {
          this.$data.btcs.onmessage = (data: any) => {
            const d = JSON.parse(data.data);

            this.$data.txs = [
              ...this.txs,
              {
                from: d.x.inputs.reduce(
                  (acc: any, item: any, index: number) => acc + `${index > 0 ? ', ' : ''}${item.prev_out.addr}`,
                  '',
                ),
                to: d.x.out.reduce(
                  (acc: any, item: any, index: number) => acc + `${index > 0 ? ', ' : ''}${item.addr}`,
                  '',
                ),
                summ: d.x.out.reduce(
                  (acc: any, item: any, index: number) => acc + `${index > 0 ? ', ' : ''}${item.value / 1e8}`,
                  '',
                ),
              },
            ];
          };
        };
      } catch (error) {
        console.error(error);
      }
    }
  },
  watch: {
    txs: function(newTxs) {
      this.txs = newTxs;
    },
  },
});
</script>

<style lang="scss" scoped>
.container {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 20px auto;
}

.buttonContainer {
  margin-bottom: 30px;
}

.button {
  color: white;
  border: none;
  outline: none;
  padding: 1em 3em;
  opacity: 0.95;
  transition: opacity 0.1s, box-shadow 0.1s;
  &:nth-child(1) {
    background: green;
  }
  &:nth-child(2) {
    background: firebrick;
  }
  &:nth-child(3) {
    background: goldenrod;
  }

  &:hover {
    opacity: 1;
  }
  &:active {
    box-shadow: inset 0 0 5px rgba(black, 0.7);
  }
}
</style>
