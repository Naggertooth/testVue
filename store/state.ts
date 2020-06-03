export const initialState = {
  windows: [
    {
      x: 200,
      y: 20,
      width: 300,
      height: 100,
      title: 'Title',
      text: 'text',
      opened: true,
      z: 1,
    },
    {
      x: 220,
      y: 40,
      width: 300,
      height: 100,
      title: 'Title',
      text: 'text',
      opened: true,
      z: 2,
    },
    {
      x: 240,
      y: 60,
      width: 300,
      height: 100,
      title: 'Title',
      text: 'text',
      opened: true,
      z: 3,
    },
    {
      x: 260,
      y: 80,
      width: 300,
      height: 100,
      title: 'Title',
      text: 'text',
      opened: false,
      z: 4,
    },
    {
      x: 280,
      y: 100,
      width: 300,
      height: 100,
      title: 'Title',
      text: 'text',
      opened: true,
      z: 5,
    },
  ],
  maxWindows: 5,
};

const state = () => ({
  ...initialState,
});

export default state;
