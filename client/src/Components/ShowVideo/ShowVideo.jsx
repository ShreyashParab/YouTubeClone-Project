import React  from "react";
// import videojs from "video.js";
// import "video.js/dist/video-js.css";
import logo from "./logo.ico";
import "./ShowVideo.css";
import { Link } from "react-router-dom";
import moment from "moment";

const ShowVideo = ({ vid }) => {
  // console.log(vid)
  const isValidVideo = vid?.fileType === "video/mp4" || (vid?.fileName?.includes("master"));

  if (!isValidVideo) return null;
  return (
    <>
      <Link to={`/videopage/${vid?._id}`}>
          <video
            // src={`http://localhost:5500/${vid.filePath}`}
          //   ref={videoRef}
            src={`https://youtubeclone-project-py54.onrender.com/${vid.filePath}`}
            className="video-js vjs-default-skin video_ShowVideo"
          >
          </video>
      </Link>
      <div className="video_description">
        <div className="Chanel_logo_App">
          <div className="fstChar_logo_App">
            <>{vid?.Uploder?.charAt(0).toUpperCase()}</>
          </div>
        </div>
        <div className="video_details">
          <p className="title_vid_ShowVideo">{vid?.videoTitle}</p>
          <pre className="vid_views_UploadTime">{vid?.Uploder}</pre>
          <pre className="vid_views_UploadTime">
            {vid?.Views} views <div className="dot"></div>{" "}
            {moment(vid?.createdAt).fromNow()}
          </pre>
        </div>
      </div>
    </>
  );
};

export default ShowVideo;
