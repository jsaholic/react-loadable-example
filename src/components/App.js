import React from 'react';
import Loadable from 'react-loadable';
import Loading from './Loading';
import fakeDelay from './fakeDelay';

const LoadableComponent = Loadable({
  loader: () => fakeDelay(1000).then(() => import('./Example')),
  loading: Loading
});

const LoadableButtonBar = Loadable({
  loader: () => import('./Bar'),
  loading: Loading,
});

const LoadableI18nBar = Loadable.Map({
  loader: {
    Bar: () => import('./Bar'),
    i18n: () => fakeDelay(800).then(
      () => fetch('/i18n/bar.json').then(res => res.json())),
  },
  loading: Loading,
  render(loaded, props) {
    const Bar = loaded.Bar.default;
    const i18n = loaded.i18n;
    return (<div className="wrapper">
      <Bar {...props} i18n={i18n}/>
    </div>);
  },
});

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { showBar: false };
  }

  onClick() {
    this.setState({ showBar: true });
  }

  onMouseOver() {
    LoadableButtonBar.preload();
  }

  render() {
    const { showBar } = this.state;
    return (
      <div>
        <h1>Hello, React 异步组件.</h1>
        <LoadableComponent />
        <button
          className="btn"
          onClick={this.onClick.bind(this)}
          onMouseOver={this.onMouseOver}>
          { showBar ? 'Here U are, Bars' : 'Show Bars' }
        </button>
        { showBar && <LoadableButtonBar/> }
        { showBar && <LoadableI18nBar/> }
      </div>
    );
  }
}
