import React, { Component } from 'react';
import Loadable from 'react-loadable';
import Loading from './Loading';
import fakeDelay from './fakeDelay';

const LoadableComponent = Loadable({
  loader: () => fakeDelay(1000).then(() => import('./Example')),
  LoadingComponent: Loading
});

const LoadableButtonBar = Loadable({
  loader: () => import('./Bar'),
  loading: Loading,
});

// import {default as RemoteMountComponent} from './OuterExample';

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = { showBar: false };
  }

  onClick() {
    this.setState({ showBar: true });
  };

  onMouseOver() {
    LoadableButtonBar.preload();
  };

  render() {
    return (
      <div>
        <h1>你好，React 异步组件！</h1>
        <LoadableComponent />
        <button
          onClick={this.onClick.bind(this)}
          onMouseOver={this.onMouseOver}>
          Show Bar
        </button>
        { this.state.showBar && <LoadableButtonBar/> }
        {/* <RemoteMountComponent /> */}
      </div>
    );
  }
}
