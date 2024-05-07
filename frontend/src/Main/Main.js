import React, { Suspense, lazy } from 'react'; // Import React, Suspense, and lazy
import styled from 'styled-components';
import Videos from '../Components/Videos';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import VideoPlayer from '../Components/VideoPlayer';
import { useState } from 'react';
import Upload from '../Components/Upload';
import Button from '../Components/Button';
import Navbar from '../Components/Navbar';


function App() {
  const [modal, setModal] = useState(false);

  return (
    <BrowserRouter>
      <Navbar />
      <AppStyled className="App">
        <div className='hero'>
        

          <Routes>
            <Route path='/' element={<Videos />} />
            <Route path='/videos/:id' element={<VideoPlayer />} />
          </Routes>
          <div className="actions">
            <div className="upload">
              <Button
                name="Upload"
                icon={<i className="fas fa-plus"></i>}
                onClick={() => { setModal(true); }}
                bg="#1e90ff"
              />
            </div>
          </div>
          {modal && <Upload />}
          {modal && <div className="overlay" onClick={() => setModal(false)}></div>}
        </div>
      </AppStyled>
    </BrowserRouter>
  );
}

const AppStyled = styled.div`

  h1 {
    color: #fff;
    background: linear-gradient(to right, #00b894 40%,#705DF2 );
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    display: inline-block;
    position: relative;
    left: 50%;
    transform: translateX(-50%);
  }

  .overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.5);
    visibility: hidden; /* Use visibility instead of visible */
    z-index: 10;
  }
  .actions {
    visibility: visible;
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 1rem;
  }
  .upload {
    display: flex;
    justify-content: flex-start;
  }
`;

export default App;
