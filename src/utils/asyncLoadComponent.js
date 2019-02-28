import * as React from 'react';
import toArray from 'lodash/toArray';

const loadScript = (src) =>
  new Promise((resolve, reject) => {
    // 已经加载的就不重复加载了
    const loadedScripts = document.querySelectorAll('[data-frontend-module-script="true"]');
    if (toArray(loadedScripts).find((item) => item.src === src)) {
      resolve();
      return;
    }

    const s = document.createElement('script');
    s.type = 'text/javascript';
    s.src = src;
    s.dataset.frontendModuleScript = 'false';
    s.onload = () => {
      s.dataset.frontendModuleScript = 'true';
      resolve();
    };

    s.onerror = (...rest) => reject(rest);

    document.head.appendChild(s);
  });

const loadStyle = (src) =>
  new Promise((resolve, reject) => {
    const loadedStyles = document.querySelectorAll('[data-frontend-module-style="true"]');
    if (toArray(loadedStyles).find((item) => item.href === src)) {
      resolve();
      return;
    }

    const s = document.createElement('link');
    s.rel = 'stylesheet';
    s.href = src;
    s.dataset.frontendModuleScript = 'false';
    s.onload = () => {
      s.dataset.frontendModuleScript = 'true';
      resolve();
    };

    s.onerror = (...rest) => reject(rest);

    document.head.appendChild(s);
  });

export default (option) => {
  const finalOption = Object.assign(
    {}, {
      scripts: [],
      styles: [],
      renderLoadingComponent: () => <div>加载中...</div>,
      renderErrorComponent: () => <pre>{`加载 ${option.moduleName} 异常`}</pre>
    }, option);

  return class AsyncLoadComponent extends React.Component {

    constructor(props) {
      super(props);
      this.state = {
        isInitial: false,
        isError: false,
        error: null,
      }
    }

    componentDidMount() {
      Promise.all([
          ...finalOption.scripts.map(loadScript),
          ...finalOption.styles.map(loadStyle),
      ]).then(() =>
        this.setState({ isInitial: true, },  () => {
          console.log('dispatchEvent Mount');
          window.dispatchEvent(new Event(`frontend-module-mount@${finalOption.moduleName}`))
        })
      ).catch(error =>
        this.setState({
          isInitial: true,
          isError: true,
          error,
        })
      );
    }

    componentWillUnmount() {
      window.dispatchEvent(new Event(`frontend-module-unmount@${finalOption.moduleName}`));
    }

    render() {
      if (!this.state.isInitial) {
        return finalOption.renderLoadingComponent();
      }

      if (this.state.isError) {
        return finalOption.renderErrorComponent(this.state.error);
      }

      return (
        <div data-frontend-module-container={finalOption.moduleName} />
      );
    }
  };
};
