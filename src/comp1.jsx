import React, { Component } from "react";
import Button from "antd/lib/button";
import TreeSelect from "antd/lib/tree-select";
import Tree from "antd/lib/tree";
import Input from "antd/lib/input";

const SHOW_PARENT = TreeSelect.SHOW_PARENT;
var Prefixes_array = [];
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
var verify = 0;

var count1 = null;

function DisplayNamespaces() {
  if (count3 == null) {
    //getting arrays of all the subjects, objects , predicates in the data
    var A = store.getSubjects(null, null, null);
    var B = store.getObjects(null, null, null);
    var C = store.getPredicates(null, null, null);

    //Union of subjects, objects and predicates

    S = union_arrays_with_namenode(A, B);
    Y = union_arrays_without_namenode(S, C);

    var u = null;
    var v = null;

    for (var i = 0; i <= Y.length - 1; i++) {
      u = SplitString1(Y[i]);
      // contains the part of subject/object before #
      v = SplitString2(Y[i]);
      //contains the part of subject/object after #

      L.push(u);
      M.push(v);
    }
    count3 = 1;
    console.log(L, M, Prefixes_array, C, Y, store);
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

// function that outputs the part of subject/object before #
function SplitString1(str) {
  var n = str.indexOf("#");
  return str.substring(0, n + 1);
}

// function that outputs the part of subject/object after #
function SplitString2(str) {
  var n = str.indexOf("#");
  return str.substring(n + 1);
}

//function to find union of arrays
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

//function to get treeData and tProps
function PushinTree() {
  if (count1 == null) {
    Prefixes_array = Object.values(Prefixes_array);

    for (var i = 0; i <= Prefixes_array.length - 1; i++) {
      var T = [];

      var count = 0;
      for (var j = 0; j <= L.length - 1; j++) {
        if (String(Prefixes_array[i]) === String(L[j])) {
          var V = {
            title: String(M[j]),
            value: "0" + "-" + String(i) + "-" + String(count),
            key: "0" + "-" + String(i) + "-" + String(count)
          };
          Q.push(String(Prefixes_array[i]) + String(M[j]));
          W.push("0" + "-" + String(i) + "-" + String(count));

          T.push(V);
          count++;
        }
      }
      var F = {
        title: String(Prefixes_array[i]),
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

    return console.log(
      Prefixes_array.length,
      L.length,
      Prefixes_array,
      tProps,
      Q,
      W
    );
  }
}

//function to display the tree
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

  //Function to process the data
  App() {
    var reader = new FileReader();

    reader.readAsText(document.getElementById("inputfile").files[0]);
    //Parsing the file
    reader.onload = function() {
      parser.parse(reader.result, (error, quad, prefixes) => {
        if (quad) {
          //storing the quad
          return store.addQuad(quad);
        } else {
          Prefixes_array = prefixes;

          setTimeout(DisplayNamespaces, 10);
          setTimeout(PushinTree, 10);

          DisplayNamespaces();

          PushinTree();
        }
      });
    };
    console.log(tProps, store);

    this.setState({ isLoggedIn: true });
    return null;
  }

  //Updating props after selection is finished
  component() {
    this.props.update_Props(tProps, Q, F, W, store);
  }

  render() {
    const isLoggedIn = this.state.isLoggedIn;

    return (
      <div>
        <Button
          onClick={() => {
            this.App();
            // this.App();
          }}
        >
          Upload
        </Button>

        {/* Displaying tree */}
        <Greetings isLoggedIn={isLoggedIn} />

        {/* Updating props  */}
        <Button onClick={() => this.component()}>Finished Selection</Button>
      </div>
    );
  }
}

export default Counter1;
