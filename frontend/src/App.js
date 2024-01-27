import React from 'react';
import './App.css';
import {BrowserRouter as Router, Routes, Route, Navigate} from 'react-router-dom';
import Game from './components/Game';
import SearchGames from './components/SearchGames';
import Login from './components/Login';
import Profile from './components/Profile';
import {AuthProvider, useAuth} from './components/AuthContext';
import Navigation from './components/Navigation';
import Friends from './components/Friends';
import OtherProfile from "./components/OtherProfile";
import Marketplace from "./components/Marketplace";
import PrivateRoute from "./components/PrivateRoute";

function App() {
    return (<AuthProvider>
        <Router>
            <div className="App">
                <div className="App-body">
                    <Navigation/>
                    <Routes>
                        <Route path="/" element={<Navigate to="/login"/>}/>
                        <Route path="/login" element={<Login/>}/>
                        <Route path="/home" element={<SearchGames/>}/>
                        <Route path="/game/:id" element={<Game/>}/>
                        <Route path="/me" element={<PrivateRoute> <Profile /> </PrivateRoute>} />
                        <Route path="/friends" element={<PrivateRoute> <Friends /> </PrivateRoute>} />
                        <Route path="/profile/:id" element={<PrivateRoute> <OtherProfile /> </PrivateRoute>} />
                        <Route path="/marketplace" element={<PrivateRoute> <Marketplace /> </PrivateRoute>} />
                        {/*<Route path="/me" element={<PrivateRoute/>}>*/}
                        {/*    <Route element={<Profile/>}/>*/}
                        {/*</Route>*/}
                        {/*<Route path="/friends" element={<PrivateRoute/>}>*/}
                        {/*    <Route element={<Friends/>}/>*/}
                        {/*</Route>*/}
                        {/*<Route path="/profile/:id" element={<PrivateRoute/>}>*/}
                        {/*    <Route element={<OtherProfile/>}/>*/}
                        {/*</Route>*/}
                        {/*<Route path="/marketplace" element={<PrivateRoute/>}>*/}
                        {/*    <Route element={<Marketplace/>}/>*/}
                        {/*</Route>*/}
                    </Routes>
                </div>
            </div>
        </Router>
    </AuthProvider>);
}

export default App;
