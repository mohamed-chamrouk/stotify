import React from "react";
 
const Popup = props => {
  return (
    <div className="popup-box">
      <div className="box">
        {props.content}
        <button className="close-button" onClick={props.handleClose}>CLOSE</button>
      </div>
    </div>
  );
};
 
export default Popup;