import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Game from './components/Game';
import SearchGames from './components/SearchGames';
import Register from './components/Register';

function App() {
  return (
    <Router>
      <div className="App">
        <div className="App-body">
          <Routes>
            <Route path="/" element={<Register />} />
            <Route path="/home" element={<SearchGames />} />
            <Route path="/game/:id" element={<Game />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
