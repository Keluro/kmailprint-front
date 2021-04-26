import React from 'react';
import ReactDOM from 'react-dom';
import ReactGA from 'react-ga';
import AddinApp from './components/AddinApp';

ReactDOM.render(
  <React.StrictMode>
    <AddinApp />
  </React.StrictMode>,
  document.getElementById('root')
);

ReactGA.initialize('UA-53223100-5');
ReactGA.pageview(window.location.pathname + window.location.search);
