import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router } from 'react-router-dom';
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { ConfirmProvider } from 'material-ui-confirm';
import store from "./store/store";
import App from './App';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store().store}>
      <PersistGate loading={null} persistor={store().presister}>
        <ConfirmProvider>
          <Router>
            <App />
          </Router>
        </ConfirmProvider>
      </PersistGate>
    </Provider>
  </React.StrictMode>
);
