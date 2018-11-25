import { select } from "easy-peasy";
import uuidv4 from "uuid/v4";
import { FONTS } from "../constants/constants";

export default {
  settings: {
    open: false,
    font: FONTS[0],
    fontSize: 16,
    nightmode: false,
    edit: (state, payload) => {
      const { field, value } = payload;
      state[field] = value;
    },
    closeSettings: state => {
      state.open = false;
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
  notes: {
    listOpen: false,
    currentIndex: 0,
    list: [
      {
        id: uuidv4(),
        title: "Note 1",
        content: undefined,
      },
      {
        id: uuidv4(),
        title: "Note 2",
        content: null,
      },
    ],
    deleteCurrent: state => {
      const oldIndex = state.currentIndex;
      state.currentIndex = oldIndex === 0 ? 0 : state.currentIndex - 1;
      state.list.splice(oldIndex, 1);
    },
    deleteNote: (state, id) => {
      const index = state.list.findIndex(n => n.id === id);
      state.list.splice(index, 1);
    },
    setTitle: (state, { id, title }) => {
      const index = state.list.findIndex(n => n.id === id);
      state.list[index].title = title;
    },
    select: (state, id) => {
      const index = state.list.findIndex(n => n.id === id);
      state.currentIndex = index;
    },
    create: state => {
      const newLength = state.list.push({
        id: uuidv4(),
        title: `Note ${state.list.length + 1}`,
        content: null,
      });
      state.currentIndex = newLength - 1;
    },
    setCurrentNote: (state, contentStateRaw) => {
      state.list[state.currentIndex].content = contentStateRaw;
    },
    closeList: state => {
      state.listOpen = false;
    },
    toggleList: state => {
      state.listOpen = !state.listOpen;
    },
    currentNote: select(state => {
      return state.list[state.currentIndex];
    }),
  },
};
