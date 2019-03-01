import React from 'react';

export default function Loading({ isLoading, pastDelay, error }) {
  if (isLoading && pastDelay) {
    return <p className="loading">加载中...</p>;
  } else if (error && !isLoading) {
    return <p className="loading error">发生错误！</p>;
  } else {
    return null;
  }
}
