import React from 'react';
import './App.css';
import {BrowserRouter, Redirect, Route, Switch} from "react-router-dom";
import Main from "./Main";
import Child from "./Child";
import TabRoute from "./TabRoute";
import {CssBaseline} from "@material-ui/core";

function App() {
  return (
    <div className="App">
      <CssBaseline/>
      <BrowserRouter>
        <Switch>
          <TabRoute path={'/players'} component={<Main/>} children={Child}/>
          <Route path="/prova" render={() => (<div> test</div>)}></Route>
          <Route path="/" render={() => <Redirect to="/players"/>}/>
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
