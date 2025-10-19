import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import { Toaster } from './components/ui/sonner';

function App() {
  return (
    <div className="App">
      {/* No basename when serving at https://viridata.eu/ */}
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          {/* optional: catch-all redirect if you add more routes later */}
          {/* <Route path="*" element={<Home />} /> */}
        </Routes>
      </BrowserRouter>
      <Toaster />
    </div>
  );
}

export default App;
