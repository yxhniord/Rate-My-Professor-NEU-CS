import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter} from "react-router-dom";
import './index.css';
import Auth0ProviderWithHistory from "./components/Auth0ProviderWithHistory";
import App from "./App";

ReactDOM.render(
    <React.StrictMode>
        <BrowserRouter>
            <Auth0ProviderWithHistory>
                <App/>
            </Auth0ProviderWithHistory>
        </BrowserRouter>
    </React.StrictMode>,
    document.getElementById('root')
);
