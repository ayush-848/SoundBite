import React from 'react';
import { AudioUploader } from './components/AudioUploader';
import { Hero } from './components/Hero';
import { Navbar } from './components/Navbar';

const App: React.FC = () => {
  const handleFileUpload = (file: File) => {
    console.log('Uploaded audio file:', file);
    // You can process the file further here (e.g., upload to a server)
  };

  return (
    <div>
      <Navbar/>
      <Hero/>
    </div>
  );
};

export default App;
