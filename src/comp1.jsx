import React, { Component } from "react";
import Button from "antd/lib/button";
import TreeSelect from "antd/lib/tree-select";
import { Network, Node, Edge } from "react-vis-network";
import Tree from "antd/lib/tree";
import Input from "antd/lib/input";
// import Counter1 from "./comp1";

const { TreeNode, DirectoryTree } = Tree;
const Search = Input.Search;

const SHOW_PARENT = TreeSelect.SHOW_PARENT;
var K = [];
var yo1 = null;
const N3 = require("n3");
const parser = new N3.Parser();
const { DataFactory } = N3;
const { namedNode } = DataFactory;
var store = new N3.Store();
var count3 = null;
var S = [];
var Y = [];
var L = [];
var M = [];
var Q = [];
var W = [];
var title = "";
var F = [];

var treeData = [];
var tProps = {};

// var T=[]
var count1 = null;
// const SHOW_PARENT = TreeSelect.SHOW_PARENT;

function DisplayNamespaces() {
  if (count3 == null) {
    console.log(yo1);

    var A = store.getSubjects(null, null, null);
    var B = store.getObjects(null, null, null);
    var C = store.getPredicates(null, null, null);

    S = union_arrays_with_namenode(A, B);
    Y = union_arrays_without_namenode(S, C);

    var u = null;
    var v = null;

    for (var i = 0; i <= Y.length - 1; i++) {
      u = SplitString1(Y[i]);
      v = SplitString2(Y[i]);
      L.push(u);
      M.push(v);
    }
    count3 = 1;
    console.log(L, M, K, S, C, Y, store);
    return null;
  }
}

function onChange(title1) {
  title = title1;
  F = title;
  console.log("onChange ", title, F, F.length);
}

function union_arrays_with_namenode(x, y) {
  var obj = {};
  for (var i = x.length - 1; i >= 0; --i) obj[x[i].id] = x[i].id;
  for (var j = y.length - 1; j >= 0; --j) obj[y[j].id] = y[j].id;
  var res = [];
  for (var k in obj) {
    if (obj.hasOwnProperty(k)) res.push(namedNode(obj[k]));
  }
  return res;
}

function SplitString1(str) {
  var n = str.indexOf("#");
  return str.substring(0, n + 1);
}

function SplitString2(str) {
  var n = str.indexOf("#");
  return str.substring(n + 1);
}

function union_arrays_without_namenode(x, y) {
  var obj = {};
  for (var i = x.length - 1; i >= 0; --i) obj[x[i].id] = x[i].id;
  for (var j = y.length - 1; j >= 0; --j) obj[y[j].id] = y[j].id;
  var res = [];
  for (var k in obj) {
    if (obj.hasOwnProperty(k)) res.push(obj[k]);
  }
  return res;
}

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

function PushinTree() {
  if (count1 == null) {
    K = Object.values(K);

    for (var i = 0; i <= K.length - 1; i++) {
      var T = [];

      var count = 0;
      for (var j = 0; j <= L.length - 1; j++) {
        if (String(K[i]) === String(L[j])) {
          var V = {
            title: String(M[j]),
            value: "0" + "-" + String(i) + "-" + String(count),
            key: "0" + "-" + String(i) + "-" + String(count)
          };
          Q.push(String(K[i]) + String(M[j]));
          W.push("0" + "-" + String(i) + "-" + String(count));

          T.push(V);
          count++;
        }
      }
      var F = {
        title: String(K[i]),
        value: "0" + "-" + String(i),
        key: "0" + "-" + String(i),
        children: T
      };

      treeData.push(F);
    }

    tProps = {
      treeData,

      onChange: onChange,
      treeCheckable: true,
      showCheckedStrategy: SHOW_PARENT,
      searchPlaceholder: "Please select",
      style: {
        width: "300px"
      }
    };
    count1 = 1;
    return console.log(K.length, L.length, K, tProps, Q, W);
  }
}

function Greetings(props) {
  const isLoggedIn = props.isLoggedIn;
  if (isLoggedIn) {
    console.log(tProps, Q, F, W, store);
    // this.props.update_Props(tProps, Q, F, W, store);
    // {
    //   () => Counter1.component();
    // }
    return <TreeSelect {...tProps} />;
  } else return null;
}

class Counter1 extends Component {
  state = {
    isLoggedIn: false
  };

  // onChange12() {

  //   this.props.update_Props;
  // }

  App() {
    var reader = new FileReader();

    reader.readAsText(document.getElementById("inputfile").files[0]);

    reader.onload = function() {
      parser.parse(reader.result, (error, quad, prefixes) => {
        if (quad) {
          return store.addQuad(quad);
        } else {
          K = prefixes;
          yo1 = true;
          console.log(store, yo1);

          setTimeout(DisplayNamespaces, 10);
          setTimeout(PushinTree, 10);

          DisplayNamespaces();
          PushinTree();
        }
      });
    };
    console.log(tProps, store);
    // this.props.tProps = tProps;
    // this.props.update_Props(tProps, Q, F, W, store);

    this.setState({ isLoggedIn: true });
    return null;
  }

  component() {
    // console.log(tProps);
    this.props.update_Props(tProps, Q, F, W, store);
  }

  render() {
    const isLoggedIn = this.state.isLoggedIn;

    return (
      <div>
        <Button onClick={() => this.App()}>Upload</Button>
        <Greetings isLoggedIn={isLoggedIn} />
        <Button onClick={() => this.component()}>Finished Selection</Button>
        {/* {this.Update} */}
        {/* {this.props.update_Props(tProps, Q, F, W, store)} */}
        {/* {this.props.tProps = tProps} */}
      </div>
    );
  }
}

export default Counter1;
