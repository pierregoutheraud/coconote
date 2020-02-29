export function loadFont(font) {
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
}
