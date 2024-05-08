import React, { useEffect } from "react";

const GlobalContext = React.createContext()

//actions
const DELETE_VIDEO = 'DELETE_VIDEO';
const LOADING = 'LOADING'
const SET_VIDEOS = 'SET_VIDEOS'
const SET_SELECTED_VIDEO = 'SET_SELECTED_VIDEO'

const reducer = (state, action) => {
    switch(action.type){
        case LOADING:
            return {...state, loading: true}
        case SET_VIDEOS:
            return{
                ...state,
                loading: false,
                videos: [
                    ...action.payload.map((video) => {
                        return{
                            ...video,
                            videoUrl: `http://localhost:8000/public/videos/${video.filename}`
                        }
                    })
                ]
            }
        case DELETE_VIDEO:
            return {
              ...state,
              videos: state.videos.filter(video => video._id !== action.payload)
            };
        default:
            return state;
            
    }

    return state
}

export const GlobalProvider = ({children}) => {


    const initialState = {
        videos: [],
        loading: false,
    }

    const [state, dispatch] = React.useReducer(reducer, initialState)
    /// delete video
    const deleteVideo = async (videoId) => {
        try {
          // Make a DELETE request to your API endpoint to delete the video
          await fetch(`http://localhost:8000/api/videos/${videoId}`, {
            method: 'DELETE'
          });
          dispatch({ type: DELETE_VIDEO, payload: videoId });
        } catch (error) {
          console.error("Error deleting video:", error);
        }
      };
    //get videos
    const getAllVideos = async () => {
        try {
            const res = await fetch('http://localhost:8000/api/videos');
            const data = await res.json()

            dispatch({type: SET_VIDEOS, payload: data.videos})
        } catch (error) {
            
        }
    }
    
    useEffect(() => {
        getAllVideos()
    }, [])

    return (
        <GlobalContext.Provider value={{
            ...state,
            getAllVideos,
            deleteVideo
        }}>
            {children}
        </GlobalContext.Provider>
    )
}

export const useGlobalContext = () => {
    return React.useContext(GlobalContext)
}