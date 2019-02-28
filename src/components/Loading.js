import React from 'react';

export default function Loading({ isLoading, pastDelay, error }) {
  if (isLoading && pastDelay) {
    return <p>加载中...</p>;
  } else if (error && !isLoading) {
    return <p>发生错误！</p>;
  } else {
    return null;
  }
}
