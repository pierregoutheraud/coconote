// Roboto Mono is linked in the html, the other fonts are loaded on demand
const loadedFonts = new Set(["Roboto Mono"]);

// The body is hidden until html.wf-active is set (see index.css)
function showPage() {
  document.documentElement.classList.add("wf-active");
}

export function loadFont(font) {
  if (loadedFonts.has(font)) {
    return showPage();
  }
  loadedFonts.add(font);

  const link = document.createElement("link");
  link.rel = "stylesheet";
  link.href = `https://fonts.googleapis.com/css?family=${encodeURIComponent(
    font
  )}:400,400i,700`;
  link.onload = () => document.fonts.load(`1em "${font}"`).finally(showPage);
  link.onerror = showPage;
  document.head.appendChild(link);

  // Never leave the page hidden if the font is slow or unreachable (offline)
  setTimeout(showPage, 3000);
}
