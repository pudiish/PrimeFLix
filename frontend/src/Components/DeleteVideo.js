import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import Button from './Button';
import { useGlobalContext } from '../context/global';

const DeleteVideo = () => {
  const [videos, setVideos] = useState([]);
  const [selectedVideo, setSelectedVideo] = useState('');
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const { getAllVideos, deleteVideo } = useGlobalContext();

  useEffect(() => {
    // Fetch all videos when the component mounts
    fetchAllVideos();
  }, []);

  const fetchAllVideos = async () => {
    try {
      const response = await getAllVideos();
      setVideos(response.videos);
    } catch (error) {
      console.error('Error fetching videos:', error);
    }
  };

  const handleDelete = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrorMessage('');

    try {
      await deleteVideo(selectedVideo);
      setSelectedVideo('');
      alert('Video deleted successfully.');
      // Refetch videos after deletion
      fetchAllVideos();
    } catch (error) {
      console.error('Error deleting video:', error);
      setErrorMessage('Failed to delete video. Please try again later.');
    }

    setLoading(false);
  };

  const handleSelectChange = (e) => {
    setSelectedVideo(e.target.value);
  };

  return (
    <DeleteVideoStyled>
      <h2>Delete Video</h2>
      <form onSubmit={handleDelete}>
        <div className="input-control">
          <label htmlFor="videoId">Select Video to Delete</label>
          <select
            id="videoId"
            value={selectedVideo}
            onChange={handleSelectChange}
          >
            <option value="">Select a video</option>
            {videos.map((video) => (
              <option key={video._id} value={video._id}>
                {video.title}
              </option>
            ))}
          </select>
        </div>
        {errorMessage && <p className="error-message">{errorMessage}</p>}
        <div className="upload-btn">
          <Button
            name={loading ? 'Deleting...' : 'Delete'}
            bg="#e74c3c"
            type="submit"
            disabled={!selectedVideo || loading}
          />
        </div>
      </form>
    </DeleteVideoStyled>
  );
};

const DeleteVideoStyled = styled.div`
  h2 {
    color: #fff;
    text-align: center;
    font-size: 2rem;
    margin-bottom: 2rem;
    opacity: 0.9;
  }

  form {
    display: flex;
    flex-direction: column;
    gap: 2rem;

    .input-control {
      display: flex;
      flex-direction: column;

      select {
        padding: 0.8rem 1rem;
        border: 1px solid #4a4a4a;
        border-radius: 5px;
        outline: none;
        background: transparent;
        color: #fff;
      }

      label {
        font-size: 1.2rem;
        font-weight: 500;
        margin-bottom: 0.5rem;
        color: #fff;
        opacity: 0.9;
      }
    }

    .error-message {
      color: #e74c3c;
    }

    .upload-btn {
      display: flex;
      justify-content: flex-end;
      margin-top: 2rem;
    }
  }
`;

export default DeleteVideo;
