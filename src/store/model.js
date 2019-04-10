import { select, action } from "easy-peasy";
import uuidv4 from "uuid/v4";
import { FONTS } from "../constants/constants";

export default {
  settings: {
    open: false,
    font: FONTS[0],
    fontSize: 16,
    nightmode: false,
    edit: action((state, payload) => {
      const { field, value } = payload;
      state[field] = value;
    }),
    closeSettings: action(state => {
      state.open = false;
    }),
    setFont: action((state, font) => {
      state.font = font;

      // Roboto Mono is loaded in the html
      // and should already be loaded at this point
      if (font === "Roboto Mono") {
        return document.documentElement.classList.add("wf-active");
      }

      window.WebFont.load({
        google: {
          families: [font],
        },
      });
    }),
    biggerFontSize: action(state => {
      state.fontSize++;
    }),
    smallerFontSize: action(state => {
      state.fontSize--;
    }),
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
    moveNote: action((state, { oldIndex, newIndex }) => {
      const currentNoteId = state.currentNote.id;
      const item = state.list.splice(oldIndex, 1)[0];
      state.list.splice(newIndex, 0, item);
      const index = state.list.findIndex(n => n.id === currentNoteId);
      state.currentIndex = index;
    }),
    deleteCurrent: action(state => {
      const oldIndex = state.currentIndex;
      state.currentIndex = oldIndex === 0 ? 0 : state.currentIndex - 1;
      state.list.splice(oldIndex, 1);
    }),
    deleteNote: action((state, id) => {
      const index = state.list.findIndex(n => n.id === id);
      state.list.splice(index, 1);
    }),
    setTitle: action((state, { id, title }) => {
      const index = state.list.findIndex(n => n.id === id);
      state.list[index].title = title;
    }),
    select: action((state, id) => {
      const index = state.list.findIndex(n => n.id === id);
      state.currentIndex = index;
    }),
    create: action(state => {
      const newLength = state.list.push({
        id: uuidv4(),
        title: `Note ${state.list.length + 1}`,
        content: null,
      });
      state.currentIndex = newLength - 1;
    }),
    setCurrentNote: action((state, contentStateRaw) => {
      state.list[state.currentIndex].content = contentStateRaw;
    }),
    closeList: action(state => {
      state.listOpen = false;
    }),
    toggleList: action(state => {
      state.listOpen = !state.listOpen;
    }),
    currentNote: select(state => {
      return state.list[state.currentIndex];
    }),
  },
};
