import './App.css';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Game from './components/Game';
import SearchGames from './components/SearchGames';
import Login from './components/Login';
import Profile from './components/Profile';
import { AuthProvider } from './components/AuthContext';
import Navigation from './components/Navigation';
import Friends from './components/Friends';

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="App">
          <div className="App-body">
            <Navigation />
            <Routes>
              <Route path="/" element={<Navigate to="/login" />} />
              <Route path="/login" element={<Login />} />
              <Route path="/home" element={<SearchGames />} />
              <Route path="/game/:id" element={<Game />} />
              <Route path="/me" element={<Profile />} />
              <Route path="/friends" element={<Friends />} />
            </Routes>
          </div>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
