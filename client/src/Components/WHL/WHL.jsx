import React from "react";
import LeftSidebar from "../../Components/LeftSidebar/LeftSidebar";
import "./WHLcss.css";
import WHLVideoList from "./WHLVideoList";
import { clearHistory } from "../../actions/History";
import { useSelector,useDispatch } from "react-redux";

const WHL = ({ page, videoList }) => {
  const CurrentUser = useSelector((state) => state?.currentUserReducer);
  const dispatch=useDispatch()
  const handleClearHistory=()=>{
    if(CurrentUser){
      dispatch(clearHistory({
        userId:CurrentUser?.result._id
      }))
    }
  }
  return (
    <div className="container_Pages_App">
      <LeftSidebar />
      <div className="container2_Pages_App">
        {/* <p className="det"> */}
          <p className="det">
            <div className="box_WHL leftside_whl">
              <b>Your {page} Shown Here </b>
              {
                page==="History" &&
                <div className="clear_History_btn" onClick={()=>handleClearHistory()}>Clear History</div>
              }
            </div>
            <div className="rightSide_wh1">
              <h1 id="colorId">{page}</h1>
              <div className="whl_list">
                <WHLVideoList page={page}
                 CurrentUser={CurrentUser?.result._id}
                 videoList={videoList}/>
              </div>
            </div>
          </p>
        {/* </p> */}
      </div>
    </div>
  );
};

export default WHL;
