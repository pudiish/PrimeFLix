import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Main from './Main/index';
import User from './User';
import Login from './Login/Index';
import Signup from './Signup/Index'; // Assuming you have a Signup component
import Navbar from './Components/Navbar';
import Videos from './Components/Videos';
import VideoPlayer from './Components/VideoPlayer';
const App = () => {
const user = localStorage.getItem("token");
const [currentPage, setCurrentPage] = useState('Main');
const renderPage = () => {
  switch (currentPage) {
    case 'Main':
      return (
        <Navbar />
      );
    case 'User':
      return <User />;
    default:
      return null;
  }
};


  return (
    <Router>
      {renderPage()}
      <Routes>
	  		{user && <Route path="/" exact element={<Main />} />}
			<Route path="/signup" exact element={<Signup />} />
			<Route path="/login" exact element={<Login />} />
			<Route path="/" element={<Navigate replace to="/login" />} />
      <Route path='/' element={<Videos />} />
      <Route path='/videos/:id' element={<VideoPlayer />} />
      </Routes>
    </Router>
  );
}

export default App;
