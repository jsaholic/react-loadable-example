import React from 'react';

export default class Bar extends React.Component {
  render() {
    const { i18n } = this.props;
    var bar = i18n && i18n['Bar'] ? i18n['Bar'] : 'Bar';
    return <p>{bar.repeat(3)} ...</p>;
  }
}
