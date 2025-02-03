import React from 'react';
import { Hero } from './components/Hero';
import { Navbar } from './components/Navbar';

const App: React.FC = () => {
  

  return (
    <div>
      <Navbar/>
      <Hero/>
    </div>
  );
};

export default App;
