import React from "react";
import PropTypes from "prop-types";
import "./ChatInput.scss";

const ChatInput = (props) => {
  return (
    <div className="chat-input-wrapper">
      <input
        id="chatInput"
        type="text"
        className={`${props.className} chat-input`}
        value={props.value || ""}
        onChange={props.changeHandler}
        onKeyPress={props.enterKeyHandler}
        placeholder="Enter message"
        autoComplete="off"
      />
      <img
        className="chat-icon"
        src={props.icon}
        alt="Send message icon"
        onClick={props.clickHandler}
      />
    </div>
  );
};

ChatInput.propTypes = {
  clickHandler: PropTypes.func.isRequired,
  changeHandler: PropTypes.func.isRequired,
  enterKeyHandler: PropTypes.func.isRequired,
  icon: PropTypes.string.isRequired,
  value: PropTypes.string,
};

export default ChatInput;
