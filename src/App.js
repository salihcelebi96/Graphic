import Home from "./pages/Home";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { ToastProvider } from 'react-hot-toast';
import Store from "./pages/StoragePage";
import Download from "./pages/download";
import Login from "./pages/FormikLogin";

import './App.css';

const App = () => {
  return (
    <div className="h-full ">
      <Router>
       
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/" element={<Home />} />
            <Route path="/store" element={<Store />} />
            <Route path="/download" element={<Download />} />


          </Routes>
        

      </Router>
    </div>

  );
}

export default App;
