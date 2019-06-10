import React, { Component } from "react";
import Button from "antd/lib/button";
import TreeSelect from "antd/lib/tree-select";
import { Network, Node, Edge } from "react-vis-network";
import Tree from "antd/lib/tree";

const { TreeNode } = Tree;

const SHOW_PARENT = TreeSelect.SHOW_PARENT;

const N3 = require("n3");
const parser = new N3.Parser();
const { DataFactory } = N3;
const { namedNode } = DataFactory;
var store = new N3.Store();

var K = [];
var Y = [];
var L = [];
var M = [];
var treeData = [];
var tProps = {};
var S = [];
var Q = [];
var W = [];
var F = [];
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
var final_quads = [];
var yo1 = false;
var title = "";
var count1 = null;
var count3 = null;
var A2 = [];
var B2 = [];
var C2 = [];
var D2 = [];
var data1 = [];
const x = 3;
const y = 2;
const z = 1;

// const generateData = (_level, _preKey, _tns) => {
//   const preKey = _preKey || "0";
//   const tns = _tns || gData;

//   const children = [];
//   for (let i = 0; i < x; i++) {
//     const key = `${preKey}-${i}`;
//     tns.push({ title: key, key });
//     if (i < y) {
//       children.push(key);
//     }
//   }
//   if (_level < 0) {
//     return tns;
//   }
//   const level = _level - 1;
//   children.forEach((key, index) => {
//     tns[index].children = [];
//     return (
//       generateData(level, key, tns[index].children),
//       console.log(level, key, tns[index].children, tns, children)
//     );
//   });
// };
// generateData(z);

function Greetings(props) {
  const isLoggedIn = props.isLoggedIn;
  if (isLoggedIn) {
    return <TreeSelect {...tProps} />;
  } else return null;
}

function onChange(title1) {
  title = title1;
  F = title;
  console.log("onChange ", title, F);
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

function arraysEqual(arr1, arr2) {
  if (arr1.length !== arr2.length) return false;
  for (var i = arr1.length; i--; ) {
    if (arr1[i] !== arr2[i]) return false;
  }

  return true;
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

function Displays(props) {
  const isLoggedIn1 = props.isLoggedIn1;
  if (isLoggedIn1) {
    return (
      <Network className="net">
        {D2.map((person, i) => (
          <Node id={D2[i]} label={D2[i]} />
        ))}
        {C2.map((person, i) => (
          <Edge id={i} from={A2[i]} to={B2[i]} label={C2[i]} />
        ))}
      </Network>
    );
  } else return null;
}

class Counter extends Component {
  state = {
    value: [""],
    // title: "",
    isLoggedIn: false,
    isLoggedIn1: false,
    isLoggedIn2: false,
    gData: [],
    expandedKeys: ["0-0"]
  };

  onDragEnter = info => {
    console.log(info);
    // expandedKeys 需要受控时设置
    // this.setState({
    //   expandedKeys: info.expandedKeys,
    // });
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
        // where to insert 示例添加到尾部，可以是随意位置
        item.children.push(dragObj);
      });
    } else if (
      (info.node.props.children || []).length > 0 && // Has children
      info.node.props.expanded && // Is expanded
      dropPosition === 1 // On the bottom gap
    ) {
      loop(data, dropKey, item => {
        item.children = item.children || [];
        // where to insert 示例添加到尾部，可以是随意位置
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
    this.setState({ isLoggedIn: true });
    return null;
  }

  DisplayTree() {
    var T = [];
    var count = 0;
    for (var j = 0; j <= D2.length - 1; j++) {
      var V = {
        title: String(D2[j]),
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

    // const loop = data =>
    //   data.map(item => {
    //     if (item.children && item.children.length) {
    //       return (
    //         <TreeNode key={item.key} title={item.title}>
    //           {loop(item.children)}
    //         </TreeNode>
    //       );
    //     }
    //     return <TreeNode key={item.key} title={item.title} />;
    //   });

    return null;
    // <Tree
    //   className="draggable-tree"
    //   defaultExpandedKeys={this.state.expandedKeys}
    //   draggable
    //   blockNode
    //   onDragEnter={this.onDragEnter}
    //   onDrop={this.onDrop}
    // >
    //   {loop(this.state.gData)}
    // </Tree>
  }

  SelectionDone() {
    for (var i = 0; i <= F.length - 1; i++) {
      if (F[i].length === 3) {
        for (var j = 0; j <= 1000; j++) {
          F.push(F[i] + "-" + String(j));
        }
      }
      for (var j = 0; j <= W.length - 1; j++) {
        if (F[i] === W[j]) {
          AB.push(Q[j]);
        }
      }
    }

    for (var i = 0; i <= AB.length - 1; i++) {
      A1 = store.getQuads(namedNode(AB[i]), null, null);
      B1 = store.getQuads(null, namedNode(AB[i]), null);
      C1 = store.getQuads(null, null, namedNode(AB[i]));
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
      A2.push(final_quads[i][0]);
      B2.push(final_quads[i][1]);
      C2.push(final_quads[i][2]);
    }
    D2 = union_arrays(A2, B2);
    // var T = [];
    // var count = 0;
    // for (var j = 0; j <= D2.length - 1; j++) {
    //   var V = {
    //     title: String(D2[j]),
    //     value: "0" + "-" + "0" + "-" + String(count),
    //     key: "0" + "-" + "0" + "-" + String(count)
    //   };

    //   T.push(V);
    //   count++;
    // }

    // var F = {
    //   title: "root",
    //   value: "0" + "-" + "0",
    //   key: "0" + "-" + "0",
    //   children: T
    // };

    // treeData.push(F);
    // gData = treeData;

    this.setState({ isLoggedIn1: true });

    return console.log(
      Q,
      W,
      F,
      AB,
      F.length,
      W.length,
      Quads,
      ABCD,
      ABCDE,
      store,
      ABCDE_1.length,
      val,
      final_quads,
      A2,
      B2,
      C2,
      D2
    );
  }

  render() {
    const isLoggedIn1 = this.state.isLoggedIn1;
    const isLoggedIn = this.state.isLoggedIn;

    const loop = data =>
      data.map(item => {
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
        <Button onClick={() => this.App()}>Upload</Button>
        <Greetings isLoggedIn={isLoggedIn} />
        <Button onClick={() => this.SelectionDone()}>Finished selection</Button>
        <Displays isLoggedIn1={isLoggedIn1} />
        <Button onClick={() => this.DisplayTree()}>Show Tree</Button>
        <Tree
          className="draggable-tree"
          defaultExpandedKeys={this.state.expandedKeys}
          draggable
          blockNode
          onDragEnter={this.onDragEnter}
          onDrop={this.onDrop}
        >
          {loop(this.state.gData)}
        </Tree>
      </div>
    );
  }
}

export default Counter;
