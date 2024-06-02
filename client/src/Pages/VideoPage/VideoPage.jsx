import React from 'react'
import { useRef } from 'react';
import Hls from 'hls.js';
import Plyr from 'plyr';
import 'plyr/dist/plyr.css';
// import vid from '../../Components/Video/vid.mp4'
import LikeWatchLaterSaveBtns from './LikeWatchLaterSaveBtns'
import './VideoPage.css'
import { addToHistory } from "../../actions/History";
import { viewVideo } from "../../actions/video";
import Comments from '../../Components/Comments/Comments'
import { useSelector,useDispatch } from 'react-redux'
import { useEffect } from 'react'
// import { useSelector } from 'react-redux'
import { Link,useParams } from 'react-router-dom'
import moment from 'moment'

const VideoPage = () => {
  const videoRef = useRef(null);
  const { vid } = useParams();
  const vids = useSelector((state) => state.videoReducer);
  // console.log(vids)
  const vv = vids?.data.filter((q) => q._id === vid)[0];
  const dispatch = useDispatch();
  const CurrentUser = useSelector((state) => state?.currentUserReducer);

 
  const handleHistory = () => {
    dispatch(
      addToHistory({
        videoId: vid,
        Viewer: CurrentUser?.result._id,
      })
    );
  };
  const handleViews=()=>{
    dispatch( viewVideo({
      id:vid
    }))
  }
  useEffect(() => {
    if (CurrentUser) {
      handleHistory();
    }
    handleViews();
  }, []);

  useEffect(() => {
    const video = videoRef.current;
    const source = `https://youtubeclone-project-zf7o.onrender.com/${vv?.filePath}`;
    let hls;
    let player;

    if (Hls.isSupported()) {
      console.log('HLS.js is supported');
      hls = new Hls();
      hls.loadSource(source);
      hls.attachMedia(video);
      hls.on(Hls.Events.MANIFEST_PARSED, () => {
        const availableQualities = hls.levels.map((level) => level.height);
        console.log('Available Qualities:', availableQualities);

        player = new Plyr(video, {
          controls: [
            'restart', 'rewind', 'play', 'fast-forward', 'progress',
            'current-time', 'duration', 'mute', 'volume', 'settings', 'fullscreen'
          ],
          quality: {
            default: availableQualities[0], 
            options: availableQualities,
            forced: true, 
            onChange: (e) => updateQuality(e), 
          },
        });

        // Attach quality change handler
        function updateQuality(newQuality) {
          console.log('Selected Quality:', newQuality);
          hls.levels.forEach((level, levelIndex) => {
            if (level.height === newQuality) {
              console.log('Switching to Quality:', level.height);
              hls.currentLevel = levelIndex;
            }
          });
        }
      });

      hls.on(Hls.Events.ERROR, (event, data) => {
        console.error('HLS.js error:', data);
      });
    } else if (video.canPlayType('application/vnd.apple.mpegurl')) {
      console.log('Native HLS support');
      video.src = source;
      player = new Plyr(video, {
        controls: [
          'restart', 'rewind', 'play', 'fast-forward', 'progress',
          'current-time', 'duration', 'mute', 'volume', 'settings', 'fullscreen'
        ],
      });
    } else {
      console.error('HLS not supported in this browser');
    }

    return () => {
      if (hls) hls.destroy();
      if (player) player.destroy();
    };
  }, []);
  return (
    <div className="container_videoPage">
        <div className="container2_videoPage">
          <div className="video_display_screen_videoPage">
            {vv?.filePath && vv.filePath.endsWith('.mp4') && !vv.filePath.endsWith('.ts') ? (
            <video
              id='player'
              // src={`http://localhost:5500/${vv?.filePath}`}
              src={`https://youtubeclone-project-zf7o.onrender.com/${vv?.filePath}`}
              className={"video_ShowVideo_videoPage"}
              controls
              autoPlay
            ></video>
          ) : (
            <video
              id='player'
              ref={videoRef}
              className={"video_ShowVideo_videoPage"}
              controls
            ></video>
          )}
            <div className="video_details_videoPage">
              <div className="video_btns_title_VideoPage_cont">
                <p className="video_title_VideoPage">{vv?.videoTitle}</p>
                <div className="views_date_btns_VideoPage">
                  <div className="views_videoPage">
                  {vv?.Views} Views<div className="dot"></div>{" "}
                  {moment(vv?.createdAt).fromNow()}
                  </div>
                  <LikeWatchLaterSaveBtns vv={vv} vid={vid} />
                </div>
              </div>
              <Link
                to={`/chanel/${vv?.videoChanel}`}
                className="chanel_details_videoPage"
              >
                <b className="chanel_logo_videoPage">
                  <p>{vv?.Uploder.charAt(0).toUpperCase()}</p>
                </b>
                <p className="chanel_name_videoPage">{vv?.Uploder}</p>
              </Link>
              <div className="comments_VideoPage">
                <h2>
                  <u>Comments</u>
                </h2>
                <Comments  videoId={vv._id}/>
              </div>
            </div>
          </div>
          <div className="moreVideoBar">More video</div>
        </div>
      </div>
  )
}

export default VideoPage





              