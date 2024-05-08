import React, { useRef, Suspense, lazy  } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { useGlobalContext } from '../context/global';
import Netflix from './Hero'


function Videos() {
    const { videos } = useGlobalContext();

    // Filter videos based on their type
    const videoTypes = [...new Set(videos.map(video => video.type))];
    const videoRefs = useRef([]);

    const handleVideoHover = (index) => {
        if (videoRefs.current[index]) {
            videoRefs.current[index].play();
        }
    };

    const handleVideoMouseLeave = (index) => {
        if (videoRefs.current[index]) {
            videoRefs.current[index].pause();
            videoRefs.current[index].currentTime = 0;
        }
    };

    return (
        <VideosStyled>
            <div>
                
          <Suspense fallback={<div>Loading...</div>}>
            <Netflix />
          </Suspense>
            </div>
            <div className="videos-container">
                {/* Dynamic Video Categories */}
                {videoTypes.map((type, typeIndex) => (
                    <div className="video-category" key={typeIndex}>
                        <h2 className='category-heading'>{type}</h2>
                        <div className="video-cards">
                            {videos
                                .filter(video => video.type === type)
                                .map((video, index) => (
                                    <Link key={video._id} to={`/videos/${video._id}`}>
                                        <div className="video-card"
                                            onMouseEnter={() => handleVideoHover(index)}
                                            onMouseLeave={() => handleVideoMouseLeave(index)}>
                                            <div className="video-thumbnail">
                                                <video src={video.videoUrl} ref={ref => videoRefs.current[index] = ref}></video>
                                                <div className="overlay"></div>
                                            </div>
                                            <div className="video-info">
                                                <h4>{video.title}</h4>
                                                <p>{video.description}</p>
                                                <p>Type: {video.type}</p>
                                            </div>
                                        </div>
                                    </Link>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </VideosStyled>
    );
}

const VideosStyled = styled.div`

    .videos-container {
        padding: 1rem 1rem;
        
        display: flex;
        flex-direction: column;
        align-items: left;
        grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
        grid-gap: 1.5rem;
        padding-top: 5rem;
        transition: all .4s ease;
        opacity: 0;
        animation: fade-in .5s ease-in-out forwards;

        @keyframes fade-in {
            0% {
                opacity: 0;
                transform: scale(0);
            }
            100% {
                opacity: 1;
                transform: scale(1);
            }
        }

        .category-heading {
            color: #fff; /* Set the font color to white */
        }

        .video-category {
            margin-top: -0.5rem;
            margin-bottom: -1rem;
        }

        .video-cards {
            display: flex;
            overflow-x: auto;
            gap: 1rem;
            padding: 1rem 0;
        }

        .video-card {
            width: 250px;
            display: flex;
            flex-direction: column;
            border-radius: 10px;
            overflow: hidden;
            box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
            transition: transform 0.3s ease;
            position: relative;
        }

        .video-card:hover {
            transform: translateY(-5px);
        }

        .video-thumbnail {
            position: relative;
            overflow: hidden;
            width: 100%;
            height: 0;
            padding-top: 56.25%; /* 16:9 aspect ratio */
        }

        .video-thumbnail video {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            object-fit: cover;
            transition: transform 0.3s ease;
            cursor: pointer;
        }

        .video-thumbnail video:hover {
            transform: scale(1.1);
        }

        .overlay {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: linear-gradient(to bottom, rgba(0, 0, 0, 0.6) 0%, rgba(0, 0, 0, 0) 100%);
        }

        .video-info {
            padding: 0.5rem;
            background-color: #f9f9f9;
            transform: translateY(100%);
            transition: transform 0.3s ease;
            position: absolute;
            bottom: 0;
            left: 0;
            height: 44%;
            width: 100%;
            opacity: 0;
            visibility: hidden;
        }

        .video-card:hover .video-info {
            transform: translateY(0);
            opacity: 1;
            visibility: visible;
        }

        .video-info h4 {
            margin-bottom: 0rem;
            color: #333;
        }

        .video-info p {
            font-size: 80%;
            margin-bottom: 0.2rem;
            color: #666;
        }

        .video-cards::-webkit-scrollbar {
            display: none;
        }
    }
`;


export default Videos;
