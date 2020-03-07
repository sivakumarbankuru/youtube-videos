import React, {Component} from 'react';
import YouTube from 'react-youtube'

const opts = {
    height: '500',
    width: '1000',
    playerVars: {
      autoplay: 1
    }
  };

export default class Video extends Component {

    constructor(props) {
        super(props);
        this.state = {
            videoId: props.currentVideo.key,
            player: null
        };
    }

    static getDerivedStateFromProps(nextProps, state) {
        return {
           videoId: nextProps.currentVideo.key
        }
    }

    onReady = (event) => {
        this.setState({
          player: event.target,
        });
      }
    
      onPlayVideo = () => {
        this.state.player.playVideo();
      }
      
      onEnd = () => {
          this.props.videoEnded()
      }

    render() {
        return (
                <YouTube videoId={this.state.videoId}
                    opts={opts}
                    onReady={this.onReady} onEnd={this.onEnd} />
        )
    }
}