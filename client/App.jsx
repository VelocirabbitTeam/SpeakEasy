import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import WelcomeContainer from './Containers/WelcomeContainer.jsx';
import PlayContainer from './Containers/PlayContainer.jsx';
import ResultContainer from './Containers/ResultContainer.jsx';
import LoginContainer from './Containers/LoginContainer.jsx';
import SignupContainer from './Containers/SignupContainer.jsx';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<WelcomeContainer />} />

        <Route exact path="/play" element={<PlayContainer />} />
        <Route exact path="/results" element={<ResultContainer />} />

        <Route exact path="/signup" element={<SignupContainer />} />
        <Route exact path="/login" element={<LoginContainer />} />
      </Routes>
    </Router>
    // <>
    //   {/* <div>
    //     <div>Hello world!</div>
    //     <Record />
    //     <MainContainer />
    //   </div> */}
    // </>
  );
};

export default App;
