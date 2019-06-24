import React, { Component } from "react";
import Button from "antd/lib/button";
import Input from "antd/lib/input";
import Tree from "antd/lib/tree";

const { TreeNode, DirectoryTree } = Tree;

const Search = Input.Search;

const dataList = [];
var data1 = [];

const getParentKey = (key, tree) => {
  let parentKey;
  for (let i = 0; i < tree.length; i++) {
    const node = tree[i];
    if (node.children) {
      if (node.children.some(item => item.key === key)) {
        parentKey = node.key;
      } else if (getParentKey(key, node.children)) {
        parentKey = getParentKey(key, node.children);
      }
    }
  }
  return parentKey;
};

class Counter3 extends Component {
  state = {
    gData: [],
    expandedKeys: ["0-0"],
    autoExpandParent: true,
    searchValue: ""
  };

  onExpand = expandedKeys => {
    this.setState({
      expandedKeys
      // autoExpandParent: false
    });
  };

  onDragEnter = info => {
    console.log(info);
    // expandedKeys 需要受控时设置
    this.setState({
      expandedKeys: info.expandedKeys
    });
  };

  onDrop = info => {
    console.log(info);
    const dropKey = info.node.props.eventKey;
    const dragKey = info.dragNode.props.eventKey;
    const dropPos = info.node.props.pos.split("-");
    const dropPosition =
      info.dropPosition - Number(dropPos[dropPos.length - 1]);

    const loop = (data, key, callback) => {
      data.forEach((item, index, arr) => {
        if (item.key === key) {
          return callback(item, index, arr);
        }
        if (item.children) {
          return loop(item.children, key, callback);
        }
      });
    };
    const data = [...this.state.gData];

    // Find dragObject
    let dragObj;
    loop(data, dragKey, (item, index, arr) => {
      arr.splice(index, 1);
      dragObj = item;
    });

    if (!info.dropToGap) {
      // Drop on the content
      loop(data, dropKey, item => {
        item.children = item.children || [];
        item.children.push(dragObj);
      });
    } else if (
      (info.node.props.children || []).length > 0 && // Has children
      info.node.props.expanded && // Is expanded
      dropPosition === 1 // On the bottom gap
    ) {
      loop(data, dropKey, item => {
        item.children = item.children || [];
        item.children.unshift(dragObj);
      });
    } else {
      let ar;
      let i;
      loop(data, dropKey, (item, index, arr) => {
        ar = arr;
        i = index;
      });
      if (dropPosition === -1) {
        ar.splice(i, 0, dragObj);
      } else {
        ar.splice(i + 1, 0, dragObj);
      }
    }

    this.setState({
      gData: data
    });
  };

  onChange1 = e => {
    const value = e.target.value;
    const expandedKeys = dataList
      .map(item => {
        if (item.title.indexOf(value) > -1) {
          return getParentKey(item.key, this.state.gData);
        }
        return null;
      })
      .filter((item, i, self) => item && self.indexOf(item) === i);
    this.setState({
      expandedKeys,
      searchValue: value
      // autoExpandParent: true
    });
  };

  DisplayTree() {
    var T = [];
    var count = 0;
    for (var j = 0; j <= this.props.D2.length - 1; j++) {
      var V = {
        title: String(this.props.D2[j]),
        value: "0" + "-" + "0" + "-" + String(count),
        key: "0" + "-" + "0" + "-" + String(count)
      };

      T.push(V);
      count++;
    }

    var F = {
      title: "root",
      value: "0" + "-" + "0",
      key: "0" + "-" + "0",
      children: T
    };

    data1.push(F);
    this.setState({
      gData: data1
    });

    return null;
  }
  render() {
    const isLoggedIn1 = this.state.isLoggedIn1;
    const isLoggedIn = this.state.isLoggedIn;
    const { searchValue, expandedKeys, autoExpandParent } = this.state;

    const loop = data =>
      data.map(item => {
        const index = item.title.indexOf(searchValue);
        const beforeStr = item.title.substr(0, index);
        const afterStr = item.title.substr(index + searchValue.length);
        const title =
          index > -1 ? (
            <span>
              {beforeStr}
              <span style={{ color: "#f50" }}>{searchValue}</span>
              {afterStr}
            </span>
          ) : (
            <span>{item.title}</span>
          );
        if (item.children && item.children.length) {
          return (
            <TreeNode key={item.key} title={item.title}>
              {loop(item.children)}
            </TreeNode>
          );
        }
        return <TreeNode key={item.key} title={item.title} />;
      });
    return (
      <div>
        <Button onClick={() => this.DisplayTree()}>Show Tree</Button>
        <Search
          style={{ marginBottom: 8 }}
          placeholder="Search"
          onChange={this.onChange1}
        />
        <DirectoryTree
          className="draggable-tree"
          defaultExpandedKeys={this.state.expandedKeys}
          onExpand={this.onExpand}
          expandedKeys={expandedKeys}
          autoExpandParent={autoExpandParent}
          draggable
          blockNode
          onDragEnter={this.onDragEnter}
          onDrop={this.onDrop}
        >
          {loop(this.state.gData)}
        </DirectoryTree>
      </div>
    );
  }
}

export default Counter3;
