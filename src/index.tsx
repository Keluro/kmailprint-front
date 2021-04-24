import React from 'react';
import ReactDOM from 'react-dom';
import OutlookMock from './OutlookMock';
import ReactGA from 'react-ga';

ReactDOM.render(
  <React.StrictMode>
    <OutlookMock />
  </React.StrictMode>,
  document.getElementById('root')
);

ReactGA.initialize('UA-53223100-5');
ReactGA.pageview(window.location.pathname + window.location.search);
