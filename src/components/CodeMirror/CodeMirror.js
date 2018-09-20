import React, { Component } from "react";
import CodeMirror from "codemirror";
import "codemirror/lib/codemirror.css";
import "codemirror/keymap/vim";
import "codemirror/theme/monokai.css";
import "codemirror/mode/gfm/gfm";
import "codemirror/mode/javascript/javascript";
import "./CodeMirror.css";

export default class _CodeMirror extends Component {
  static defaultProps = {
    onChange: () => {},
  };

  // only render once
  shouldComponentUpdate() {
    return false;
  }

  componentWillUnmount() {
    this.codemirror.off("change", this.handleChange);
  }

  textareaDidMount = el => {
    if (!el) {
      return;
    }
    this.codemirror = CodeMirror.fromTextArea(el, {
      mode: "gfm",
      tabSize: 2,
      theme: "monokai",
      lineWrapping: true,
      keyMap: "vim",
    });
    const { defaultValue } = this.props;
    this.codemirror.setValue(defaultValue);

    // Watch changes
    this.codemirror.on("change", this.handleChange);
  };

  handleChange = e => {
    this.props.onChange(e.getValue());
  };

  render() {
    const { className } = this.props;
    return (
      <div className={className}>
        <textarea ref={this.textareaDidMount} />
      </div>
    );
  }
}
