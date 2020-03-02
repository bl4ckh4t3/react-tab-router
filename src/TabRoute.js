import {Link, matchPath, Route, withRouter} from "react-router-dom";
import React, {Component, Fragment} from "react";
import Tab from "@material-ui/core/Tab";
import Tabs from "@material-ui/core/Tabs";
import TabPanel from "./TabPanel";
import AppBar from "@material-ui/core/AppBar";
import IconButton from "@material-ui/core/IconButton";
import {Close} from "@material-ui/icons";
import {Box} from "@material-ui/core";

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

class TabRoute extends Component {
  constructor(props) {
    super(props);
    const tabs = JSON.parse(sessionStorage.getItem("players")) || [];
    const value = this.getOpenedIndex(tabs);
    this.state = {
      tabs: tabs,
      value: value
    };
  }

  getOpenedIndex(tabs) {
    const match = matchPath(this.props.location.pathname, {path: this.props.path + '/:id'});
    if (null != match) {
      const {params} = match;
      const id = params && params.id;
      const idIndex = tabs.indexOf(id);
      if (id && idIndex !== -1) {
        return idIndex + 1;
      }
    }
    return 0;

  }

  handle() {
    const match = matchPath(this.props.location.pathname, {path: this.props.path + '/:id'});
    let tabs = this.state.tabs;
    if (null != match) {
      const {params} = match;
      const id = params && params.id;
      let index = tabs.indexOf(id);
      if (id && index === -1) {
        tabs = tabs.concat(id);
      }
    }
    sessionStorage.setItem("players", JSON.stringify(tabs));
    return tabs;
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    const tabs = this.handle();
    const value = this.getOpenedIndex(tabs);
    console.log(value, tabs);
    if (value !== prevState.value || tabs !== prevState.tabs)
      this.setState({value, tabs});
  }

  close = (event, idToClose) => {
    let {tabs} = this.state;
    const indexToClose = tabs.indexOf(idToClose);
    if (indexToClose !== -1) {
      tabs.splice(indexToClose, 1);
    }
    event.preventDefault();
    this.props.history.push(this.props.path + (tabs.length > 0 ? "/" + tabs[tabs.length - 1] : ""));
  }

  render() {
    const {path, component, children} = this.props;
    const {tabs, value} = this.state;
    return (
      <Fragment>
        <AppBar position="static">
          <Tabs
            value={value}
          >
            <Tab component={Link} to={path} label="list"/>
            {
              tabs.map((tab, index) => (
                <Tab component={Link}
                     to={`${path}/${tab}`}
                     label={<TabLink onClick={this.close} id={tab}/>}
                     key={tab}
                />
              ))
            }
          </Tabs>
        </AppBar>
        <TabPanel hidden={value !== 0} {...a11yProps(0)}>
          {component}
        </TabPanel>
        <TabPanel value={value} index={value} {...a11yProps(1)}>
          <Route path={`${path}/:id`} exact component={children}/>
        </TabPanel>
      </Fragment>
    )
  }

};

class TabLink extends React.Component {

  render() {
    return (
      <Box>
        <IconButton color="inherit" aria-label="delete" onClick={(event) => this.props.onClick(event, this.props.id)}>
          <Close/>
        </IconButton>
        {this.props.id}
      </Box>
    )
  }
}

export default withRouter(TabRoute);
