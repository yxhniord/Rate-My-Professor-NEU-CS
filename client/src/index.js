import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter, Route, Routes} from "react-router-dom";
import './index.css';
import Home from "./pages/Home";
import Login from "./pages/Login";
import Profile from "./pages/Profile";
import SearchResults from "./pages/SearchResults";
import RatingDetails from "./pages/RatingDetails";
import Signup from "./pages/Signup";
import NewComment from "./pages/NewComment";
import Error from "./pages/Error";
import Auth0ProviderWithHistory from "./components/Auth0ProviderWithHistory";

ReactDOM.render(
    <React.StrictMode>
        <BrowserRouter>
            <Auth0ProviderWithHistory>
                <Routes>
                    <Route path="/" element={<Home/>}/>
                    <Route path="/login" element={<Login/>}/>
                    <Route path="/signup" element={<Signup/>}/>
                    <Route path="/profile" element={<Profile/>}/>
                    <Route path="/search/:name" element={<SearchResults/>}/>
                    <Route path="/details/:profId" element={<RatingDetails/>}/>
                    <Route path={"/newComment/:profId"} element={<NewComment/>}/>
                    <Route path="/error" element={<Error/>}/>
                </Routes>
            </Auth0ProviderWithHistory>
        </BrowserRouter>
    </React.StrictMode>,
    document.getElementById('root')
);
