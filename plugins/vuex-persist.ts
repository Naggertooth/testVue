import VuexPersistence from 'vuex-persist';
import { mapMutations } from 'vuex';

export default ({ store }: any) => {
  // @ts-ignore
  window.onNuxtReady(() => {
    new VuexPersistence({
      /* your options */
    }).plugin(store);
  });
};
