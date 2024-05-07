import styled from 'styled-components';
import Videos from './Components/Videos'
import {BrowserRouter, Routes, Route } from 'react-router-dom';
import VideoPlayer from './Components/VideoPlayer';
import Navbar from './Components/Navbar';



function App() {


  return (
    <BrowserRouter>
        <Navbar/>
      <AppStyled className="App">

        <div className='hero'>
        <Routes>
          <Route path='/' element={<Videos />} />
          <Route path='/videos/:id' element={<VideoPlayer />} />
        </Routes>
        </div>
      </AppStyled >
    </BrowserRouter>
  );
}

const AppStyled = styled.div`
  h1{
    color: #fff;
    background: linear-gradient(to right, #00b894 40%,#705DF2 );
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    display: inline-block;
    position: relative;
    left: 50%;
    transform: translateX(-50%);
  }

  
  .upload{
    display: flex;
    justify-content: flex-start;
  }
`;

export default App;
