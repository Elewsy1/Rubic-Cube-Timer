import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Home from './pages/Home';
import Scores from './pages/Scores';
import Groups from './pages/Groups';

export default function App() {
  return (
    <Router>
      <nav>
        <Link to="/">Timer</Link> | <Link to="/scores">Score</Link> | <Link to="/groups">Groups</Link>
      </nav>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/scores" element={<Scores />} />
        <Route path="/groups" element={<Groups />} />
      </Routes>
    </Router>
  );
}
