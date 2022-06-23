import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { RecoilRoot } from 'recoil';
const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

const widgetDiv = document.querySelector('.swap-widget') as HTMLElement;
root.render(
  <React.StrictMode>
    <RecoilRoot>
          <App domElement={widgetDiv}/>
    </RecoilRoot>
  </React.StrictMode>
);

reportWebVitals();
