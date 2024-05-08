import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { GlobalProvider } from './context/global';
import { GlobalStyle } from './GlobalStyle';
import './index.css';
import 'tailwindcss/tailwind.css';
function AppSelector() {

  return (
    <React.StrictMode>
      <GlobalStyle />
      <GlobalProvider>
        <App />
      </GlobalProvider>
    </React.StrictMode>
  );
}

ReactDOM.render(<AppSelector />, document.getElementById('root'));
