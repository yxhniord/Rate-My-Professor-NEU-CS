import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter, Routes, Route} from "react-router-dom";
import './index.css';
import Home from "./pages/Home";
import Login from "./pages/Login";
import Profile from "./pages/Profile";
import SearchResults from "./pages/SearchResults";
import RatingDetails from "./pages/RatingDetails";

ReactDOM.render(
    <React.StrictMode>
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Home/>}/>
                <Route path="/login" element={<Login/>}/>
                <Route path="/profile" element={<Profile/>}/>
                <Route path="/search/:query" element={<SearchResults/>}/>
                <Route path="/details/:profId" element={<RatingDetails/>}/>
            </Routes>
        </BrowserRouter>
    </React.StrictMode>,
    document.getElementById('root')
);
