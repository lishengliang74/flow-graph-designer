import React, { Component } from "react";
import getDesigner, { colors } from "../src";
import ReactDOM from 'react-dom/client';
import jsBeautify from "js-beautify";
import process from "immer";
import template from "./template";

const Designer = getDesigner({ lang: "zh_CN" });

function beautifyConfig(code) {
  return jsBeautify(code, {
    indent_size: 2,
    indent_char: " ",
    wrap_line_length: 100,
  });
}
class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: { id: "root", children: [] },
      actions: [],
      theme: "theme-1",
    };
    this.onChange = this.onChange.bind(this);
    this.onClick = this.onClick.bind(this);
    this.onChangeTheme = this.onChangeTheme.bind(this);
  }

  // fire when flow has been changed.
  onChange({ data, detail }) {
    const actions = process(this.state.actions, draft => {
      draft.splice(0, 0, {
        index: draft.length + 1,
        ...detail,
      });
    });
    this.setState({
      data,
      actions,
    });
  }
  // fire when node has been clicked.
  onClick(node) {
    const actions = process(this.state.actions, draft => {
      draft.splice(0, 0, {
        index: draft.length + 1,
        action: "click",
        nodes: [node],
      });
    });
    this.setState({
      actions,
    });
  }

  onChangeTheme(e) {
    this.setState({
      theme: e.target.value,
    });
  }
  render() {
    const tableStyle = { border: "1px solid lightblue", textAlign: "center" };
    const flowStr = JSON.stringify(this.state.data || {});
    const flowText = beautifyConfig(flowStr);
    return (
      <div>
        <div>
          <h3 style={{ margin: "10px", display: "inline-block" }}>
            flow graph designer
          </h3>
          <select onChange={this.onChangeTheme} value={this.state.theme}>
            {[1, 2, 3, 4, 5, 6, 7, 8].map(v => {
              return (
                <option value={`theme-${v}`} key={v}>
                  主题{v}
                </option>
              );
            })}
          </select>
          <div>
            <h4 style={{ marginLeft: "10px", display: "inline-block" }}>
              template中可定义节点颜色，可选颜色：
            </h4>
            {colors.map(x => (
              <div
                key={x.name}
                style={{
                  backgroundColor: x.value,
                  margin: "2px",
                  padding: "2px",
                  display: "inline-block",
                  border: 0,
                  color: "white",
                }}>
                {x.name}
              </div>
            ))}
          </div>
        </div>
        <div style={{ display: "flex", flexDirection: "row", height: "800px" }}>
          <div
            style={{
              flexGrow: 0,
              border: "1px solid red",
              margin: "10px",
              width: "30%",
            }}>
            <Designer
              template={template}
              data={this.state.data}
              theme={this.state.theme}
              onChange={this.onChange}
              onClick={this.onClick}
              iconWritingMode="horizontal-tb"
            />
          </div>
          <div
            style={{
              flexGrow: 0,
              border: "1px solid red",
              margin: "10px",
              padding: "1px",
              overflow: "auto",
              width: "30%",
            }}>
            输出流程对象：
            <pre>{flowText}</pre>
          </div>
          <div
            style={{
              flexGrow: 0,
              border: "1px solid red",
              margin: "10px",
              padding: "1px",
              overflow: "auto",
              width: "30%",
            }}>
            操作历史记录：
            <table style={{ ...tableStyle, width: "100%" }}>
              <thead>
                <tr style={tableStyle}>
                  <th style={tableStyle}>序号</th>
                  <th style={tableStyle}>动作</th>
                  <th style={tableStyle}>位置</th>
                  <th style={tableStyle}>节点</th>
                  <th style={tableStyle}>位置2</th>
                  <th style={tableStyle}>节点2</th>
                </tr>
              </thead>
              <tbody>
                {this.state.actions.map(x => (
                  <tr style={tableStyle} key={x.index}>
                    <td style={tableStyle}>{x.index}</td>
                    <td style={tableStyle}>{x.action}</td>
                    <td style={tableStyle}>
                      {x.position
                        ? `${x.position.id}[${x.position.index}]`
                        : ""}
                    </td>
                    <td style={tableStyle}>{(x.nodes || []).join(",")}</td>
                    <td style={tableStyle}>
                      {x.position2
                        ? `${x.position2.id}[${x.position2.index}]`
                        : ""}
                    </td>
                    <td style={tableStyle}>{(x.nodes2 || []).join(",")}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        <p style={{ textAlign: "center" }}>
          Powered by
          <a href="https://github.com/censoft-corp/flow-graph-designer">
            flow-graph-designer
          </a>.
        </p>
      </div>
    );
  }
}

const root = ReactDOM.createRoot(document.getElementById('app'));
root.render(<App />);
