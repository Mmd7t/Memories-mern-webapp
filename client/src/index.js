import React from 'react';
import ReactDom from 'react-dom/client';
import App from './App';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk'
import reducer from './reducers/index.js';
import { applyMiddleware, legacy_createStore as createStore, compose } from 'redux';
import { GoogleOAuthProvider } from '@react-oauth/google';


const store = createStore(reducer, compose(applyMiddleware(thunk)));
ReactDom.createRoot(document.getElementById('root')).render(
    <Provider store={store}>
        <GoogleOAuthProvider clientId="842923624796-5k6t9s59824c2lovd0lkoki4h320klf5.apps.googleusercontent.com">
            <App />
        </GoogleOAuthProvider>;
    </Provider>
);


