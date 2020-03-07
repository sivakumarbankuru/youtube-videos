import React from 'react';
import './playlist.scss';

export default (props) => {
    return <div className='playlist-container'>
        <h3>PLAYLIST</h3>
        {props.playLists.map((item, index) =>
            (<div className='playerlist' key={index}>
                <div className='player'>
                    <label>{item.name}</label>
                    <span className="close" onClick={() => props.selectedItem(item)}>&times;</span>
                </div>
            </div>))}
    </div>
}