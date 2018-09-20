import React, { Component } from "react";
import CodeMirror from "./components/CodeMirror/CodeMirror";
import styles from "./App.css";

export default class App extends Component {
  state = {
    text: null,
  };

  defaultText = `# Vim-notes

Write anything here using vim.

*Italic text*
**Bold text**
~~Mistaken text~~
*You **can** ~~not~~ combine them*

1. Item
2. Item

- Item
- Item
  - Sub item

* Item
* Item
  * Sub item

- [x] Completed task list item
- [ ] Incomplete task list item

\`\`\`javascript
for (var i = 0; i < items.length; i++) {
  console.log(items[i], i); // log them
}
\`\`\``;

  componentDidMount() {
    // window.chrome.storage.sync.remove(["text"]);
    window.chrome.storage.sync.get(["text"], result => {
      const text = !("text" in result) ? this.defaultText : result.text;
      this.setState({ text });
    });
  }

  handleChange = text => {
    window.chrome.storage.sync.set({ text });
  };

  render() {
    const { text } = this.state;

    if (text === null) {
      return null;
    }

    return (
      <div className={styles.container}>
        <CodeMirror
          className={styles.editor}
          defaultValue={text}
          onChange={this.handleChange}
        />
      </div>
    );
  }
}
