import React, { useState } from 'react';
import styled from 'styled-components';
import { Routes, Route } from 'react-router-dom'; // Import Routes instead of BrowserRouter
import Videos from '../Components/Videos';
import VideoPlayer from '../Components/VideoPlayer';
import Upload from '../Components/Upload';
import Button from '../Components/Button';
import Navbar from '../Components/Navbar';


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
    visibility: ${props => props.visible ? 'visible' : 'hidden'}; /* Use props to control visibility */
  }

  .actions {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 1rem;
  }

  .upload {
    margin-top: 100px;
    display: flex;
    justify-content: flex-start;
  }
`;

const Main = () => {
  const [modal, setModal] = useState(false);
  

  return (
    <AppStyled className="App" visible={modal}>
      <Navbar />
      <div className='hero'>
      <Videos />
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
        {modal && <Upload onClose={() => setModal(false)} />}
        {modal && <div className="overlay" onClick={() => setModal(false)}></div>}
      </div>
    </AppStyled>
  );
}

export default Main;
