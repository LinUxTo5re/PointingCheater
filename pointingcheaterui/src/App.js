import React, { Fragment } from 'react';
import './App.css';
import PointingCheaterUI from './components/PointingCheaterUI';
import Footer from './components/Footer';

function App() {
  return (
    <Fragment>
      <div className="app-container">
        <div className="content">
          <PointingCheaterUI />
        </div>
        <div className="footer">
          <Footer />
        </div>
      </div>
    </Fragment>
  );
}

export default App;
