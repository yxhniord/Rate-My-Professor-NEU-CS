import './App.css';
import {Route, Routes} from "react-router-dom";
import Home from "./pages/Home";
import Profile from "./pages/Profile";
import SearchResults from "./pages/SearchResults";
import RatingDetails from "./pages/RatingDetails";
import NewComment from "./pages/NewComment";
import Error from "./pages/Error";
import React from "react";
import Navigation from "./components/Navigation";
import Footer from "./components/Footer";
import ProtectedRoute from "./components/ProtectedRoute";
import UserInfoForm from "./pages/UserInfoForm";

function App() {
    return (
        <div className="App">
            <Navigation/>
            <Routes>
                <Route path="/" element={<Home/>}/>
                <Route path="/profile/:key" element={<ProtectedRoute protectedComponent={Profile}/>}/>
                <Route path="/search/:name" element={<SearchResults/>}/>
                <Route path="/details/:profId" element={<RatingDetails/>}/>
                <Route path="/newComment/:profId" element={<ProtectedRoute protectedComponent={NewComment}/>}/>
                <Route path="/updateComment/:commentId" element={<ProtectedRoute protectedComponent={NewComment}/>}/>
                <Route path="/userInfoForm" element={<ProtectedRoute protectedComponent={UserInfoForm}/>}/>
                <Route path="/error" element={<Error/>}/>
                <Route path="*" element={<p>Sorry! Nothing to show.</p>}/>
            </Routes>
            <Footer/>
        </div>
    );
}

export default App;
