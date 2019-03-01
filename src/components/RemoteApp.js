import React from 'react';
import {default as RemoteComponent} from './RemoteComponent';

export default class RemoteApp extends React.Component {
  render() {
    return (
      <div>
        <h1>Hi, React 异步组件.</h1>
        <RemoteComponent />
      </div>
    );
  }
}
