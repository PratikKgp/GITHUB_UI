import React, { Component } from "react";
import { Network, Node, Edge } from "react-vis-network";

function Displays(props) {
  const isLoggedIn1 = props.isLoggedIn1;
  const A2 = props.A2;
  const B2 = props.B2;
  const C2 = props.C2;
  const D2 = props.D2;

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

class Counter2 extends Component {
  state = {};
  render() {
    return (
      <Displays
        isLoggedIn1={this.props.isLoggedIn1}
        A2={this.props.A2}
        B2={this.props.B2}
        C2={this.props.C2}
        D2={this.props.D2}
      />
    );
  }
}

export default Counter2;
