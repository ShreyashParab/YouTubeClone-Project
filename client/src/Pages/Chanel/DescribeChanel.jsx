import React from "react";
import { FaEdit, FaUpload } from "react-icons/fa";
import { useSelector } from "react-redux";
import "./DescribeChanel.css";
const DescribeChanel = ({setEditCreateChanelBtn,Cid,setVidUploadPage}) => {
    const chanels = useSelector((state) => state?.chanelReducers);
    // console.log(chanels)
    const CurrentUser = useSelector((state) => state?.currentUserReducer);
    const currentChanel = chanels.filter((c) => c._id === Cid)[0];
  return (
    <div className="container3_chanel">
      <div className="chanel_logo_chanel">
        <b>{currentChanel?.name.charAt(0).toUpperCase()}</b>
      </div>
      <div className="description_chanel">
        <b> {currentChanel?.name} </b>
        <p> {currentChanel?.desc} </p>
      </div>
      {CurrentUser?.result._id === currentChanel?._id && (
        <>
          <p
            className="editbtn_chanel"
            onClick={() => {
              setEditCreateChanelBtn(true);
            }}
          >
            <FaEdit />
            <b> Edit Chanel</b>
          </p>
          <p className="uploadbtn_chanel"
           onClick={()=>setVidUploadPage(true)}
           >
            <FaUpload />
            <b> Upload Video</b>
          </p>
        </>
      )}
    </div>
  );
};

export default DescribeChanel;
