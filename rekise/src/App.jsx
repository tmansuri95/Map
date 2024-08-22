import React from 'react';
import Map from './Map';

const App = () => {
  const startCoords = [22.1696, 91.4996];
  const endCoords = [22.2637, 91.7159];
  const speed = 20;
  const refreshRate = 2;

  return (
    <div>
      <center><h1>Rekise Assignment</h1></center>
      <Map startCoords={startCoords} endCoords={endCoords} speed={speed} refreshRate={refreshRate} />
    </div>
  );
};

export default App;
