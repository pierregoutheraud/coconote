import { ContentState, EditorState } from "draft-js";
import { DEFAULT_TEXT } from "../constants/constants";

export default {
  settings: {
    open: false,
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
  editor: {
    contentStateRaw: undefined,
    setContentStateRaw: (state, contentStateRaw) => {
      state.contentStateRaw = contentStateRaw;
    },
  },
};
