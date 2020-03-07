import React, { Component } from 'react';
import { connect } from 'react-redux';
import { toggleButton, togglePlayList, playVideo } from '../../actions/dashboardActions';
import './dashboard.scss'
import PlayList from '../PlayList';

import Video from '../video';

class Dashboard extends Component {

    constructor(props) {
       super(props);
       this.state = {
           isToggle: false,
           currentVideo: {
            id: 0,
            url: '',
            key: '',
            name: ''
           }
       }
    }

    onTextChange = (e) => {
        const value = e.target.value
        if(value.trim().length>0)
            this.valiateYoutubeURL(e.target.value)
    }

    valiateYoutubeURL = (url) => {
        if (!this.isUrlAlreadyExit(url)) {
            const { playLists, currentVideo } = this.props
            const playlist = {
                id: playLists.length === 0 ? 1 : playLists.length+1,
                url: '',
                key: '',
                name: `link ${playLists.length === 0 ? 1 : playLists.length+1 }`
            }
            var regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=|\?v=)([^#\&\?]*).*/;
            var match = url.match(regExp);
            if (match && match[2].length == 11) {
                playlist.key = match[2]
                playlist.url = url
                this.props.togglePlayList(playlist)
                if(currentVideo.id === 0) {
                    this.props.playVideo(playlist)
                }
            } else {
                alert('Please enter a valid one!')
            }
        } else {
            alert('URL exists, Please add a new one.')
        }
    }

    isUrlAlreadyExit = (url) => {
        const {playLists} = this.props
        let isExist = false
        playLists.forEach((item) => {
            if(item.url === url) {
                isExist = true
            }
        })
        return isExist
    }

    selectedPlayList = (item) => {
        const { currentVideo } = this.props;
        if (item.key === currentVideo.key) {
            var result = window.confirm("Are you sure Want to delete the current playing video?");
            if (result) {
                this.onVideoEnded()
            }
        } else {
            this.props.togglePlayList(item)
        }

    }

    onVideoEnded = () => {
        const {currentVideo, playLists} = this.props;
        const copyPlayLists = [...playLists]
        this.props.togglePlayList(currentVideo)
        if(copyPlayLists.length>1) {
            this.props.playVideo(copyPlayLists[1])
        } else {
            this.props.playVideo({})
        }
    }

    render() {
        const { playLists, currentVideo } = this.props;
        return(
            <div className='dashboard-container'>
                <div className='search-container'>
                    <h2>Add  a YouTube link</h2>
                    <input type='text' placeholder='link' onBlur={(e)=>this.onTextChange(e)} />   
                </div>
                <div className='container'>
                    <div className="video-container">
                    { currentVideo.key ? <Video currentVideo={currentVideo} videoEnded={this.onVideoEnded}/> : null }
                    </div>
                    <div className='list-conatainer '>
                        <PlayList playLists={playLists} selectedItem={this.selectedPlayList} />
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (store) => {
    return {
        isToggle: store.dashboard.isToggle,
        playLists: store.dashboard.playLists,
        currentVideo: store.dashboard.currentVideo
    }
}

export default connect(mapStateToProps, {toggleButton, togglePlayList, playVideo})(Dashboard)

