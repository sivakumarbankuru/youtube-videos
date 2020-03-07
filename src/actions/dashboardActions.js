import actionTypes from "../actionTypes"



export const toggleButton = (bool) => dispatch => {
   dispatch({
       type: actionTypes.BUTTON.TOGGLE,
       payload: {
           isToggle: bool
        }
   })
}

export const togglePlayList = (playlist) => dispatch => {
   dispatch({
      type: actionTypes.YOUTUBE.PLAYLISTS.TOGGLE,
      payload: {
         playList: playlist
       }
  })
}

export const playVideo = (videoInfo) => dispatch => {
   dispatch({
      type: actionTypes.YOUTUBE.PLAYLISTS.VIDEO,
      payload: {
         currentVideo: videoInfo
      }
   })
}