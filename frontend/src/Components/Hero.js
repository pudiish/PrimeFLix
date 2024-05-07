import React, { useRef, useEffect, useState } from 'react';
import styled from 'styled-components';
import { useGlobalContext } from '../context/global';

function MovieCoverSlide() {
    const { videos } = useGlobalContext();
    const [currentVideoIndex, setCurrentVideoIndex] = useState(0);
    const [isHovered, setIsHovered] = useState(false);
    const [startPlaying, setStartPlaying] = useState(false);
    const videoRef = useRef(null);
    let hoverTimeout;

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentVideoIndex((prevIndex) => (prevIndex + 1) % videos.length);
        }, 10000); // Change video every 10 seconds
        return () => clearInterval(interval);
    }, [videos.length]);

    useEffect(() => {
        // Change video source when currentVideoIndex changes
        if (videos.length > 0 && videoRef.current) {
            videoRef.current.src = videos[currentVideoIndex]?.videoUrl || '';
            if (startPlaying) {
                videoRef.current.play();
            } else {
                videoRef.current.pause();
            }
        }
    }, [currentVideoIndex, videos, startPlaying]);

    const handleMouseEnter = () => {
        hoverTimeout = setTimeout(() => {
            setIsHovered(true);
            setStartPlaying(true);
        }, 2000); // Start playing after 2 seconds of hover
    };

    const handleMouseLeave = () => {
        clearTimeout(hoverTimeout);
        setIsHovered(false);
        setStartPlaying(false);
    };

    return (
        <>
            <style>
                {`
                    @import url('https://fonts.googleapis.com/css2?family=Honk&family=Merienda:wght@300..900&display=swap');
                `}
            </style>
            <MovieCoverSlideStyled isHovered={isHovered} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
                <div className="video-wrapper">
                    <div className="video-thumbnail">
                        <video className="thumbnail-video" ref={videoRef}></video>
                        <div className="overlay"></div>
                    </div>
                    <div className="video-info">
                        {videos.length > 0 && (
                            <>
                                <h4 className="merienda-font">{videos[currentVideoIndex]?.title || ''}</h4>
                                <p className='p1'>{videos[currentVideoIndex]?.type || ''}</p>
                                <p className='p2'>{videos[currentVideoIndex]?.description || ''}</p>
                            </>
                        )}
                    </div>
                </div>
            </MovieCoverSlideStyled>
        </>
    );
}

const MovieCoverSlideStyled = styled.div`
    position: relative;
    width: 100vw;
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;

    .video-wrapper {
        position: relative;
        width: 100%;
        height: 100%;
        overflow: hidden;
        transition: opacity 0.5s ease; /* Easy ease transition */
    }

    .video-thumbnail {
        position: relative;
        width: 100%;
        height: 100%;
        overflow: hidden;
    }

    .thumbnail-video {
        width: 100%;
        height: 100%;
        object-fit: cover;
        transition: opacity 0.5s ease; /* Easy ease transition */
    }

    .video-info {
        position: absolute;
        bottom: 100px;
        justify-content: center;
        left: 40px;
        padding: 40px;
        color: white;
        visibility: ${props => props.isHovered ? 'visible' : 'true'};
        transition: opacity 0.5s ease; /* Easy ease transition */
    }
    .p1{
        font-size: 30px;
    }
    .p2{
        font-size: 15px;
    }
    .merienda-font {
        font-size: 100px;
        font-family: 'Merienda', cursive;
        font-weight: 400; /* Adjust weight as needed */
    }
`;

export default MovieCoverSlide;
