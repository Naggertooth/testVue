<template>
  <client-only>
    <div class="tableContainer">
      <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/semantic-ui/2.2.14/semantic.min.css" />
      <vuetable
        ref="vuetable"
        :api-mode="false"
        :data-manager="dataManager"
        :fields="fields"
        :per-page="perPage"
        pagination-path="pagination"
        @vuetable:pagination-data="onPaginationData"
      ></vuetable>
      <div class="pagination ui basic segment grid tableControls">
        <vuetable-pagination-info ref="paginationInfo"></vuetable-pagination-info>

        <vuetable-pagination
          class="paginationMenu"
          ref="pagination"
          @vuetable-pagination:change-page="onChangePage"
        ></vuetable-pagination>
      </div>
    </div>
  </client-only>
</template>

<script lang="ts">
import Vue from 'vue';
// @ts-ignore
import Vuetable from 'vuetable-2/src/components/Vuetable.vue';
// @ts-ignore
import VuetablePagination from 'vuetable-2/src/components/VuetablePagination.vue';
// @ts-ignore
import VuetablePaginationInfo from 'vuetable-2/src/components/VuetablePaginationInfo.vue';
// @ts-ignore
import _ from 'lodash';

export default Vue.extend({
  name: 'Table',
  components: {
    Vuetable,
    VuetablePagination,
    VuetablePaginationInfo,
  },
  props: {
    transactions: { type: Array, required: true },
  },
  data: () => ({
    // @ts-ignore
    txs: this?.transactions || [],
    fields: [
      {
        name: 'from',
        title: 'From',
        width: '33%',
        sortField: 'from',
      },
      {
        name: 'to',
        title: 'To',
        width: '33%',
        sortField: 'to',
      },
      {
        name: 'summ',
        title: 'Summ',
        width: '33%',
        sortField: 'summ',
      },
    ],
    perPage: 5,
  }),
  methods: {
    onPaginationData(paginationData: any) {
      // @ts-ignore
      this.$refs.pagination.setPaginationData(paginationData);
      // @ts-ignore
      this.$refs.paginationInfo.setPaginationData(paginationData);
    },
    onChangePage(page: any) {
      // @ts-ignore
      this.$refs.vuetable.changePage(page);
    },
    dataManager(sortOrder: any, pagination: any) {
      if (this.txs.length < 1) return;

      let local = this.txs;

      if (sortOrder.length > 0) {
        local = _.orderBy(local, sortOrder[0].sortField, sortOrder[0].direction);
      }

      // @ts-ignore
      pagination = this.$refs.vuetable.makePagination(local.length, this.perPage);
      let from = pagination.from - 1;
      let to = from + this.perPage;

      return {
        pagination: pagination,
        data: _.slice(local, from, to),
      };
    },
  },
  watch: {
    transactions: function(newTxs) {
      this.txs = newTxs;
      // @ts-ignore
      this.$refs.vuetable.refresh();
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

.pagination {
  margin-top: 1rem;
}

.vuetable-head-wrapper table.vuetable th.sortable {
  cursor: pointer;
}

.buttonContainer {
  margin-bottom: 30px;
}

.tableContainer {
  max-width: 700px;
  overflow: auto;
  border: 1px solid gray;

  @media (min-width: 800px) {
    width: 100%;
  }

  .tableControls {
    display: flex;
    flex-direction: column;
    * {
      margin: 0.2em auto;
    }

    .paginationMenu {
      width: fit-content;
      padding: 0;
    }
  }
}
</style>
