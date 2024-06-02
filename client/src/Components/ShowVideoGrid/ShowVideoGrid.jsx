import React from 'react';
import ShowVideo from '../ShowVideo/ShowVideo';
import './ShowVideoGrid.css';

const ShowVideoGrid = ({ vids }) => {
  return (
    <div className='Container_ShowVideoGrid'>
      {
        vids?.map(vi => {
          if (vi.filePath.endsWith('.mp4') || vi.fileName.includes('master.m3u8')) {
            return (
              <div key={vi._id} className="video_box_app">
                <ShowVideo vid={vi} />
              </div>
            );
          }
          return null;
        })
      }
    </div>
  );
}

export default ShowVideoGrid;
