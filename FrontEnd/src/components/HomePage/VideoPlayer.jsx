import React from 'react';
import ReactPlayer from 'react-player';
import './VideoPlayer.css';

function VideoPlayer({ url, onClose }) {
  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <ReactPlayer
          url={url}
          controls
          width="900px" // Điều chỉnh kích thước video tùy thích
          height="650px"
        />
      </div>
    </div>
  );
}

export default VideoPlayer;
