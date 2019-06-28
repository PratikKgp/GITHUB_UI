import React, { Component } from "react";
import Button from "antd/lib/button";
import TreeSelect from "antd/lib/tree-select";
import { Network, Node, Edge } from "react-vis-network";
import Tree from "antd/lib/tree";
import Input from "antd/lib/input";
import Counter1 from "./comp1";
import Counter2 from "./comp2";
import Counter3 from "./comp3";

const { TreeNode, DirectoryTree } = Tree;
const Search = Input.Search;

const N3 = require("n3");
const { DataFactory } = N3;
const { namedNode } = DataFactory;

var AB = [];
var Quads = [];
var A1 = [];
var B1 = [];
var C1 = [];
var ABCD = [];
var ABCDE = [];
var XYZ = [];
var ABCDE_1 = [];
var XYZ_1 = [];

//var contining the final selected quads
var final_quads = [];

//var having the final selected subjects, objects , predicates
var final_subjects = [];
var final_objects = [];
var final_predicates = [];

//var having union of final selected subjects and objects
var union_subjects_objects = [];

var data1 = [];

//Function to find the Union of two arrays
function union_arrays(x, y) {
  var obj = {};
  for (var i = x.length - 1; i >= 0; --i) obj[x[i]] = x[i];
  for (var j = y.length - 1; j >= 0; --j) obj[y[j]] = y[j];
  var res = [];
  for (var k in obj) {
    if (obj.hasOwnProperty(k)) res.push(obj[k]);
  }
  return res;
}

//Function to find if two arrays are identical or not
function arraysEqual(arr1, arr2) {
  if (arr1.length !== arr2.length) return false;
  for (var i = arr1.length; i--; ) {
    if (arr1[i] !== arr2[i]) return false;
  }

  return true;
}

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

class Counter extends Component {
  state = {
    value: [""],
    // title: "",
    isLoggedIn: false,
    isLoggedIn1: false,
    isLoggedIn2: false,
    searchValue: "",
    gData: [],
    expandedKeys: ["0-0"],
    autoExpandParent: true,
    tProps: {},
    Q: [],
    W: [],
    F: [],
    store: new N3.Store()
  };

  //
  DisplayTree() {
    var T = [];
    var count = 0;
    for (var j = 0; j <= union_subjects_objects.length - 1; j++) {
      var V = {
        title: String(union_subjects_objects[j]),
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

  SelectionDone() {
    for (var i = 0; i <= this.state.F.length - 1; i++) {
      if (this.state.F[i].length === 3) {
        for (var j = 0; j <= 1000; j++) {
          this.state.F.push(this.state.F[i] + "-" + String(j));
        }
      }
      for (var j = 0; j <= this.state.W.length - 1; j++) {
        if (this.state.F[i] === this.state.W[j]) {
          AB.push(this.state.Q[j]);
        }
      }
    }

    for (var i = 0; i <= AB.length - 1; i++) {
      A1 = this.state.store.getQuads(namedNode(AB[i]), null, null);
      B1 = this.state.store.getQuads(null, namedNode(AB[i]), null);
      C1 = this.state.store.getQuads(null, null, namedNode(AB[i]));
      var D1 = A1.concat(B1);
      var E1 = D1.concat(C1);
      Quads.push(E1);

      ABCD = ABCD.concat(E1);
    }

    for (var i = 0; i <= ABCD.length - 1; i++) {
      var a = Object.values(ABCD[i])[0];
      var b = Object.values(ABCD[i])[2];
      var c = Object.values(ABCD[i])[1];

      XYZ = {
        subject: a.id,
        object: b.id,
        predicate: c.id
      };

      XYZ_1 = [a.id, b.id, c.id];

      ABCDE.push(XYZ);
      ABCDE_1.push(XYZ_1);
    }
    var val = [];

    for (var i = 0; i <= ABCDE_1.length - 1; i++) {
      val.push(0);
    }

    for (var i = 0; i <= ABCDE_1.length - 1; i++) {
      if (val[i] === 0) {
        for (var j = i + 1; j <= ABCDE_1.length - 1; j++) {
          if (arraysEqual(ABCDE_1[i], ABCDE_1[j])) {
            val[j] = 1;
          }
        }
      }
    }

    for (var i = 0; i <= ABCDE_1.length - 1; i++) {
      if (val[i] === 0) {
        final_quads.push(ABCDE_1[i]);
      }
    }

    for (var i = 0; i <= final_quads.length - 1; i++) {
      final_subjects.push(final_quads[i][0]);
      final_objects.push(final_quads[i][1]);
      final_predicates.push(final_quads[i][2]);
    }
    union_subjects_objects = union_arrays(final_subjects, final_objects);

    this.setState({ isLoggedIn1: true });

    return console.log(
      this.state.Q,
      this.state.W,
      this.state.tProps,
      this.state.F,
      this.state.store,

      AB,
      this.state.F.length,
      this.state.W.length,
      Quads,
      ABCD,
      ABCDE,
      ABCDE_1.length,
      val,
      final_quads,
      final_subjects,
      final_objects,
      final_predicates,
      union_subjects_objects
    );
  }
  Onchange_tProps = (new1, new2, new3, new4, new5) => {
    this.setState({
      tProps: new1,
      Q: new2,
      F: new3,
      W: new4,
      store: new5
    });
  };

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
        <input type="file" id="inputfile" />
        <Counter1 update_Props={this.Onchange_tProps.bind(this)} />

        <Button onClick={() => this.SelectionDone()}>Display Graph</Button>

        <Counter2
          isLoggedIn1={isLoggedIn1}
          final_subjects={final_subjects}
          final_objects={final_objects}
          final_predicates={final_predicates}
          union_subjects_objects={union_subjects_objects}
        />
        <Counter3 union_subjects_objects={union_subjects_objects} />
      </div>
    );
  }
}

export default Counter;
