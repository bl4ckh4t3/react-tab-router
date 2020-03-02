import React from "react";

const Child = (props) => {

  return (
    <div>child {props.match.params.id} - {new Date().toLocaleString()}</div>
  )
};

export default Child;
