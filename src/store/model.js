export default {
  settings: {
    open: true,
    font: "Roboto Mono",
    fontSize: 16,
    edit: (state, payload) => {
      const { field, value } = payload;
      state[field] = value;
    },
    setFont: (state, font) => {
      window.WebFont.load({
        google: {
          families: [font],
        },
      });
      state.font = font;
    },
    biggerFontSize: state => {
      state.fontSize++;
    },
    smallerFontSize: state => {
      state.fontSize--;
    },
  },
};
