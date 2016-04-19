import React, { Component, Navigator } from 'react-native';
import { createStore, applyMiddleware, combineReducers } from 'redux';
import { Provider, connect } from 'react-redux';
import thunk from 'redux-thunk';
import ReactNativeRouter, { Route, Schema } from 'react-native-router-flux';

import * as reducers from '../reducers';
import CounterApp from './counterApp';
import Launch from './launch';
import About from './about';
import Statistics from './statistics';

const createStoreWithMiddleware = applyMiddleware(thunk)(createStore);
const reducer = combineReducers(reducers);
const store = createStoreWithMiddleware(reducer);
const Router = connect()(ReactNativeRouter.Router);

export default class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Router hideNavBar={true}>
          <Schema
            name="default"
            sceneConfig={Navigator.SceneConfigs.FloatFromRight}/>
          <Route
            name="launch"
            component={Launch}
            initial={true}
            wrapRouter={true}
            title="Launch"/>
          <Route
            name="counter"
            component={CounterApp}
            title="Counter App"/>
          <Route
            name="about"
            component={About}
            title="About"/>
          <Route
            name="statistics"
            component={Statistics}
            title="Statistics"/>
        </Router>
      </Provider>
    );
  }
}
