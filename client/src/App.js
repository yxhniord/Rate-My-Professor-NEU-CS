import './App.css';
import {Route, Routes} from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Profile from "./pages/Profile";
import SearchResults from "./pages/SearchResults";
import RatingDetails from "./pages/RatingDetails";
import NewComment from "./pages/NewComment";
import Error from "./pages/Error";
import React from "react";
import Navigation from "./components/Navigation";
import Footer from "./components/Footer";

function App() {
  return (
    <div className="App">
        <Navigation/>
        <Routes>
            <Route path="/" element={<Home/>}/>
            <Route path="/login" element={<Login/>}/>
            <Route path="/signup" element={<Signup/>}/>
            <Route path="/profile" element={<Profile/>}/>
            <Route path="/search/:name" element={<SearchResults/>}/>
            <Route path="/details/:profId" element={<RatingDetails/>}/>
            <Route path="/newComment/:profId" element={<NewComment/>}/>
            <Route path="/error" element={<Error/>}/>
        </Routes>
        <Footer/>
    </div>
  );
}

export default App;
