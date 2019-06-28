import React, { Component } from "react";
import { Network, Node, Edge } from "react-vis-network";

function Displays(props) {
  //props containing all the selected subj , obj ,pred
  const isLoggedIn1 = props.isLoggedIn1;
  const final_subjects = props.final_subjects;
  const final_objects = props.final_objects;
  const final_predicates = props.final_predicates;
  const union_subjects_objects = props.union_subjects_objects;

  if (isLoggedIn1) {
    return (
      <Network className="net">
        {union_subjects_objects.map((person, i) => (
          <Node
            id={union_subjects_objects[i]}
            label={union_subjects_objects[i]}
          />
        ))}
        {final_predicates.map((person, i) => (
          <Edge
            id={i}
            from={final_subjects[i]}
            to={final_objects[i]}
            label={final_predicates[i]}
          />
        ))}
      </Network>
    );
  } else return null;
}

class Counter2 extends Component {
  state = {};
  render() {
    return (
      // Displaying Graph
      <Displays
        isLoggedIn1={this.props.isLoggedIn1}
        final_subjects={this.props.final_subjects}
        final_objects={this.props.final_objects}
        final_predicates={this.props.final_predicates}
        union_subjects_objects={this.props.union_subjects_objects}
      />
    );
  }
}

export default Counter2;
