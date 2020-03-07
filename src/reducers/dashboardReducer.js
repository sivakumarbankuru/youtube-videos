const initialState = {
    isToggle: false,
    playLists: [],
    currentVideo: {
        id: 0
    }
}

export default (state=initialState, action) => {
    switch(action.type) {
        case 'BUTTON.TOGGLE':
            const {isToggle} = action.payload
            return {
                ...state,
               isToggle
            }
        case 'YOUTUBE.PLAYLISTS.TOGGLE':
            const {playList} = action.payload
           const index = state.playLists.findIndex((item) => item.key === playList.key)
            return {
                ...state,
                playLists: index>-1 ?
                            state.playLists.filter(item => item != playList)  :
                            state.playLists.concat(playList)
            }
        
        case 'YOUTUBE.PLAYLISTS.VIDEO':
            const { currentVideo } = action.payload
            return {
                ...state,
                currentVideo
            }
        
        default:
            return state
    }
}