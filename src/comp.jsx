import React, { Component } from "react";
import Layout from "antd/lib/layout";
import Button from "antd/lib/button";
import TreeSelect from "antd/lib/tree-select";
import Counter1 from "./comp1";
import Typography from "antd/lib/typography";

const SHOW_PARENT = TreeSelect.SHOW_PARENT;

const { Text } = Typography;

const N3 = require("n3");
const parser = new N3.Parser();
const { DataFactory, Util } = N3;
const { namedNode, literal, defaultGraph, quad } = DataFactory;
var store = new N3.Store();
var store_1 = new N3.Store();

var K = [];
var G = [];
var X = null;
var Z = null;
var Y = [];
var L = [];
var M = [];
var treeData = [];
var tProps = {};
var T = [];
var S = [];
var Q = [];
var W = [];
var F = [];
var AB = [];
var Quads = [];
var A1 = [];
var B1 = [];
var ABC = [];
var C1 = [];
var ABCD = [];
var ABCDE = [];
var XYZ = [];
var ABCDEF = [];
var ABCDE_1 = [];
var XYZ_1 = [];
var final_quads = [];
var yo1 = false;
var yo2 = false;
var yo3 = false;
var yo = null;
var title = "";

const { prefix, prefixes } = Util;

function Greetings(props) {
  const isLoggedIn = props.isLoggedIn;
  if (yo3) {
    return <TreeSelect {...tProps} />;
  } else return null;
}

// function arraysEqual(arr1, arr2) {
//   if (arr1.length !== arr2.length) return false;
//   for (var i = arr1.length; i--; ) {
//     if (arr1[i] !== arr2[i]) return false;
//   }

//   return true;
// }

function onChange(title1) {
  title = title1;
  F = title;
  console.log("onChange ", title, F);
}

function PushinTree() {
  if (yo2) {
    K = Object.values(K);

    for (var i = 0; i <= K.length - 1; i++) {
      var T = [];

      var count = 0;
      for (var j = 0; j <= L.length - 1; j++) {
        if (String(K[i]) == String(L[j])) {
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
      // value: this.state.value,
      // title: this.state.title,
      onChange: onChange,
      treeCheckable: true,
      showCheckedStrategy: SHOW_PARENT,
      searchPlaceholder: "Please select",
      style: {
        width: "300px"
      }
    };

    // this.setState({ isLoggedIn: true });
    yo3 = true;
    // this.PushinTree();
    return console.log(K.length, L.length, K, tProps, Q, W);
  } else return null;
}

function DisplayNamespaces() {
  console.log(yo1);
  // const isLoggedIn2 = props.isLoggedIn2;
  if (yo1) {
    var A = store.getSubjects(null, null, null);
    var B = store.getObjects(null, null, null);
    var C = store.getPredicates(null, null, null);

    S = union_arrays_with_namenode(A, B);
    // X = this.union_arrays_without_namenode(A, B);
    Y = union_arrays_without_namenode(S, C);

    var u = null;
    var v = null;

    for (var i = 0; i <= Y.length - 1; i++) {
      u = SplitString1(Y[i]);
      v = SplitString2(Y[i]);
      L.push(u);
      M.push(v);
    }
    var E = {};
    console.log(L, M, K, S, C, Y, store);
    yo2 = true;
    return null;
  } else return null;
}

function union_arrays_without_namenode(x, y) {
  var obj = {};
  for (var i = x.length - 1; i >= 0; --i) obj[x[i].id] = x[i].id;
  for (var i = y.length - 1; i >= 0; --i) obj[y[i].id] = y[i].id;
  var res = [];
  for (var k in obj) {
    if (obj.hasOwnProperty(k))
      // <-- optional
      res.push(obj[k]);
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
  for (var i = y.length - 1; i >= 0; --i) obj[y[i].id] = y[i].id;
  var res = [];
  for (var k in obj) {
    if (obj.hasOwnProperty(k))
      // <-- optional
      res.push(namedNode(obj[k]));
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
    return final_quads.map((person, i) => (
      <Text>
        <h3>
          {final_quads[i][0]}
          {"  "}--{"  "}
          {final_quads[i][2]}
          {"  "}-->{"  "}
          {final_quads[i][1]}
          {}
        </h3>
      </Text>
    ));
  } else return null;
}

class Counter extends Component {
  state = {
    value: [""],
    // title: "",
    isLoggedIn: false,
    isLoggedIn1: false,
    isLoggedIn2: false
  };

  App() {
    var reader = new FileReader();
    // this.setState({ isLoggedIn2: true });

    reader.readAsText(document.getElementById("inputfile").files[0]);

    reader.onload = function() {
      parser.parse(reader.result, (error, quad, prefixes) => {
        if (quad) {
          return store.addQuad(quad);
        } else {
          K = prefixes;
          return (yo1 = true), console.log(store, yo1);
          // yo1 = true;

          // this.setState({ isLoggedIn2: true });
          // return null;

          // return console.log(
          //   "# That's all, folks!",
          //   prefixes,

          //   store,
          //   store.size,
          //   K
          // );
          //  {this.setState({ isLoggedIn2: true });}
        }
      });
    };
    // yo1 = true;
    // this.setState({ isLoggedIn2: true });
    // return this.setState({ isLoggedIn2: true });
    // this.setState({ isLoggedIn2: true });
  }

  // union_arrays_without_namenode(x, y) {
  //   var obj = {};
  //   for (var i = x.length - 1; i >= 0; --i) obj[x[i].id] = x[i].id;
  //   for (var i = y.length - 1; i >= 0; --i) obj[y[i].id] = y[i].id;
  //   var res = [];
  //   for (var k in obj) {
  //     if (obj.hasOwnProperty(k))
  //       // <-- optional
  //       res.push(obj[k]);
  //   }
  //   return res;
  // }

  // arraysEqual(arr1, arr2) {
  //   if (arr1.length !== arr2.length) return false;
  //   for (var i = arr1.length; i--; ) {
  //     if (arr1[i] !== arr2[i]) return false;
  //   }

  //   return true;
  // }

  // union_arrays_with_namenode(x, y) {
  //   var obj = {};
  //   for (var i = x.length - 1; i >= 0; --i) obj[x[i].id] = x[i].id;
  //   for (var i = y.length - 1; i >= 0; --i) obj[y[i].id] = y[i].id;
  //   var res = [];
  //   for (var k in obj) {
  //     if (obj.hasOwnProperty(k))
  //       // <-- optional
  //       res.push(namedNode(obj[k]));
  //   }
  //   return res;
  // }

  // SplitString1(str) {
  //   var n = str.indexOf("#");
  //   return str.substring(0, n + 1);
  // }

  // SplitString2(str) {
  //   var n = str.indexOf("#");
  //   return str.substring(n + 1);
  // }

  // DisplayNamespaces() {
  //   var A = store.getSubjects(null, null, null);
  //   var B = store.getObjects(null, null, null);
  //   var C = store.getPredicates(null, null, null);

  //   S = this.union_arrays_with_namenode(A, B);
  //   // X = this.union_arrays_without_namenode(A, B);
  //   Y = this.union_arrays_without_namenode(S, C);

  //   var u = null;
  //   var v = null;

  //   for (var i = 0; i <= Y.length - 1; i++) {
  //     u = this.SplitString1(Y[i]);
  //     v = this.SplitString2(Y[i]);
  //     L.push(u);
  //     M.push(v);
  //   }
  //   var E = {};

  //   return console.log(L, M, K, S, C, Y);
  // }

  // onChange = title => {
  //   this.setState(title);
  //   F = title;
  //   console.log("onChange ", title, F);
  // };

  // PushinTree() {
  //   if (yo2) {
  //     K = Object.values(K);

  //     for (var i = 0; i <= K.length - 1; i++) {
  //       var T = [];

  //       var count = 0;
  //       for (var j = 0; j <= L.length - 1; j++) {
  //         if (String(K[i]) == String(L[j])) {
  //           var V = {
  //             title: String(M[j]),
  //             value: "0" + "-" + String(i) + "-" + String(count),
  //             key: "0" + "-" + String(i) + "-" + String(count)
  //           };
  //           Q.push(String(K[i]) + String(M[j]));
  //           W.push("0" + "-" + String(i) + "-" + String(count));

  //           T.push(V);
  //           count++;
  //         }
  //       }
  //       var F = {
  //         title: String(K[i]),
  //         value: "0" + "-" + String(i),
  //         key: "0" + "-" + String(i),
  //         children: T
  //       };

  //       treeData.push(F);
  //     }

  //     tProps = {
  //       treeData,
  //       // value: this.state.value,
  //       // title: this.state.title,
  //       onChange: this.onChange,
  //       treeCheckable: true,
  //       showCheckedStrategy: SHOW_PARENT,
  //       searchPlaceholder: "Please select",
  //       style: {
  //         width: "300px"
  //       }
  //     };

  //     this.setState({ isLoggedIn: true });
  //     yo3 = true;
  //     // this.PushinTree();
  //     return console.log(K.length, L.length, K, tProps, Q, W);
  //   } else return null;
  // }

  SelectionDone() {
    for (var i = 0; i <= F.length - 1; i++) {
      if (F[i].length == 3) {
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
      if (val[i] == 0) {
        for (var j = i + 1; j <= ABCDE_1.length - 1; j++) {
          if (arraysEqual(ABCDE_1[i], ABCDE_1[j])) {
            val[j] = 1;
          }
        }
      }
    }

    for (var i = 0; i <= ABCDE_1.length - 1; i++) {
      if (val[i] == 0) {
        final_quads.push(ABCDE_1[i]);
      }
    }

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
      final_quads
    );
  }

  render() {
    const isLoggedIn1 = this.state.isLoggedIn1;

    return (
      <div>
        <input type="file" id="inputfile" />
        <Button onClick={() => this.App()}>Upload</Button>
        <DisplayNamespaces />
        {/* <Button onClick={() => this.DisplayNamespaces()}>Upload</Button> */}
        {/* <Button onClick={() => this.PushinTree()}>Upload</Button> */}
        <PushinTree />
        <Greetings />
        <Button onClick={() => this.SelectionDone()}>Finished selection</Button>
        <Displays isLoggedIn1={isLoggedIn1} />
      </div>
    );
  }
}

export default Counter;
