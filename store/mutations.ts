const mutations = {
  setActivatedWindow(state: any, payload: number) {
    const { windows, maxWindows } = state;
    const newWindows = windows.map((item: any) => {
      if (item.z === payload) {
        return {
          ...item,
          z: maxWindows,
        };
      } else if (item.z > payload) {
        return {
          ...item,
          z: item.z - 1,
        };
      }
      return item;
    });
    state.windows = newWindows;
  },
  setWindowState(state: any, payload: { index: number; patcher: any }) {
    state.windows[payload.index] = {
      ...state.windows[payload.index],
      ...payload.patcher,
    };
  },
};

export default mutations;
