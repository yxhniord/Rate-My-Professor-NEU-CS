import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter} from "react-router-dom";
import './index.css';
import Auth0ProviderWithHistory from "./components/Auth0ProviderWithHistory";
import App from "./App";
import {applyMiddleware, createStore} from "redux";
import reducers from "./reducers";
import {Provider} from "react-redux";
import thunk from "redux-thunk";

// Redux store to retrieve reducers defines under ./reducers
const store = createStore(reducers, applyMiddleware(thunk));

ReactDOM.render(
    <React.StrictMode>
        <Provider store={store}>
            <BrowserRouter>
                <Auth0ProviderWithHistory>
                    <App/>
                </Auth0ProviderWithHistory>
            </BrowserRouter>
        </Provider>
    </React.StrictMode>,
    document.getElementById('root')
);
