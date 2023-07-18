import Home from "./pages/Home";
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import Store from "./pages/StoragePage";
import Download from "./pages/download";

import './App.css';


const App = () => {
  return (
    <Router>
      
      
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/store" element={<Store />} />
        <Route path="/store" element={< Download />} />
      </Routes>
    </Router>
  );
}

export default App;
