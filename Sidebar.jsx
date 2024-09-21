import React, { useState } from "react";
import "./Sidebar.css";
import { assets } from "../../assets/assets";
import { useContext } from "react";
import { Context } from "../../context/Context";

const Sidebar = () => {
  const [Extended, SetExtended] = useState();
  const { onSent, PreviousPrompts, setRecentPrompt , newChat} = useContext(Context);
  const loadPrompt = async (prompt) => {
    setRecentPrompt(prompt);
    await onSent(prompt);
  };
  return (
    <div className="sidebar">
      <div className="top">
        <img
          onClick={() => SetExtended((prev) => !prev)}
          className="menu"
          src={assets.menu_icon}
          alt=""
        />
        <div onClick={()=>newChat()} className="new-chat">
          <img src={assets.plus_icon} alt="" />
          {Extended ? <p>New Chat</p> : null}
        </div>
        {Extended ? (
          <div className="recent">
            <p className="recent-title">Recent</p>
            {PreviousPrompts.map((item, index) => {
              return (
                <div key={index} onClick={()=>loadPrompt(item)} className="recent-entry">
                  <img src={assets.message_icon} alt="" />
                  <p className="">{item.slice(0, 18)} ...</p>
                </div>
              );
            })}
          </div>
        ) : null}
      </div>
      <div className="bottom">
        <div className="bottom-item recent-entry">
          <img src={assets.question_icon} alt="" />
          {Extended ? <p>help</p> : null}
        </div>
        <div className="bottom-item recent-entry">
          <img src={assets.history_icon} alt="" />
          {Extended ? <p>Activity</p> : null}
        </div>
        <div className="bottom-item recent-entry">
          <img src={assets.setting_icon} alt="" />
          {Extended ? <p>Setting</p> : null}
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
