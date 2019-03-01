import asyncLoadComponent from '../utils/asyncLoadComponent';

export default asyncLoadComponent({
    scripts: [
      'http://localhost:3000/static/js/bundle.js',
      'http://localhost:3000/static/js/0.chunk.js',
      'http://localhost:3000/static/js/main.chunk.js'
    ],
    styles: [],
    moduleName: 'demo',
});
