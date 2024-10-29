import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './components/home';
import ValkyraAI from './components/valkyraai';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/valkyraai" element={<ValkyraAI />} />
      </Routes>
    </Router>
  );
}

export default App;