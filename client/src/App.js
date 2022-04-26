import './App.css';
import {Route, Routes, useNavigate} from "react-router-dom";
import Home from "./pages/Home";
import Profile from "./pages/Profile";
import SearchResults from "./pages/SearchResults";
import RatingDetails from "./pages/RatingDetails";
import NewComment from "./pages/NewComment";
import Error from "./pages/Error";
import React, {useEffect} from "react";
import Navigation from "./components/Navigation";
import Footer from "./components/Footer";
import ProtectedRoute from "./components/ProtectedRoute";
import UserInfoForm from "./pages/UserInfoForm";
import NewProfessor from "./pages/NewProfessor";
import {fetchUserFail, fetchUserRequest, fetchUserSuccess} from "./actions/userActions";
import {useDispatch} from "react-redux";
import {useAuth0} from "@auth0/auth0-react";
import {fetchDbUser} from "./function/Api";

function App() {
    const {isAuthenticated, user, getAccessTokenSilently} = useAuth0();
    const baseUrl = process.env.REACT_APP_BASE_URL;
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const fetchUser = () => {
        return async function (dispatch) {
            dispatch(fetchUserRequest());
            await getAccessTokenSilently()
                .then(token => fetchDbUser(baseUrl, user.sub, token))
                .then(res => {
                        dispatch(fetchUserSuccess(res));
                        if (res === null) {
                            navigate("/userInfoForm");
                        }
                    }
                )
                .then(error => dispatch(fetchUserFail(error)))
        }
    }

    useEffect(() => {
        if (isAuthenticated) {
            dispatch(fetchUser());
        }
    }, [isAuthenticated]);


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
                <Route path="/newProfessor" element={<ProtectedRoute protectedComponent={NewProfessor}/>}/>
                <Route path="/error" element={<Error/>}/>
                <Route path="*" element={<p>Sorry! Nothing to show.</p>}/>
            </Routes>
            <Footer/>
        </div>
    );
}

export default App;
