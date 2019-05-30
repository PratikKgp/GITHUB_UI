import React, { Component } from "react";
import Layout from "antd/lib/layout";
import Menu from "antd/lib/menu";
//import Breadcrumb from "antd/lib/breadcrumb";
import Icon from "antd/lib/icon";
//import Button from "antd/lib/button";
import Typography from "antd/lib/typography";
import MenuItem from "antd/lib/menu/MenuItem";
import ReactFileReader from "react-file-reader";
import TreeSelect from "antd/lib/tree-select";

const N3 = require("n3");
const parser = new N3.Parser();
var reader = new FileReader();
const SHOW_PARENT = TreeSelect.SHOW_PARENT;

class Counter1 extends Component {
  state = {
    t: this.props.tree,
    value: ["0-0-0"]
  };
  onChange = value => {
    console.log("onChange ", value);
    this.setState({ value });
  };

  render() {
    const tProps = {
      treeData: this.state.t,
      value: this.state.value,
      onChange: this.onChange,
      treeCheckable: true,
      showCheckedStrategy: SHOW_PARENT,
      searchPlaceholder: "Please select",
      style: {
        width: 300
      }
    };
    return (
      <div>
        {console.log(tProps)}
        <TreeSelect {...tProps} />
      </div>
    );
  }
}

export default Counter1;
