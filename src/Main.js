import React from "react";
import {Link} from "react-router-dom";

const Main = (props) => {
  console.log('ciao');
  return (
    <ul>
      <li>{new Date().toLocaleString()}</li>
      <li><Link to="/players/1">1</Link></li>
      <li><Link to="/players/2">2</Link></li>
    </ul>
  )
};

export default Main;
