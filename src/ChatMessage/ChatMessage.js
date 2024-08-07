import React from "react";
import PropTypes from "prop-types";
import Separator from "../Separator/Separator";
import ChatMessageHeader from "./ChatMessageHeader";
import MyMessageBody from "./MyMessageBody";
import TheirMessageBody from "./TheirMessageBody";
import "./ChatMessage.scss";

const ChatMessage = (props) => (
  <div className="chat-message-wrapper">
    {props.separatorDate && <Separator displayText={props.separatorDate} />}
    {props.withHeader && !props.fromSelf && (
      <ChatMessageHeader
        fromSelf={props.fromSelf}
        avatarUrl={props.avatarUrl}
        userName={props.userName}
        timeStamp={props.timeStamp}
      />
    )}
    {props.fromSelf ? (
      <MyMessageBody
        style={props.style}
        messageText={props.messageText}
        className={props.messageBubbleClass}
      />
    ) : (
      <TheirMessageBody
        messageText={props.messageText}
        className={props.messageBubbleClass}
      />
    )}
    {props.withHeader && props.fromSelf && (
      <ChatMessageHeader
        fromSelf={props.fromSelf}
        avatarUrl={props.avatarUrl}
        userName={props.userName}
        timeStamp={props.timeStamp}
      />
    )}
  </div>
);

ChatMessage.propTypes = {
  messageText: PropTypes.string.isRequired,
  userName: PropTypes.string,
  separatorDate: PropTypes.string,
  id: PropTypes.string,
  avatarUrl: PropTypes.string,
  withHeader: PropTypes.bool,
  fromSelf: PropTypes.bool,
  timeStamp: PropTypes.string,
  messageBubbleClass: PropTypes.string,
  style: PropTypes.object,
};

ChatMessage.defaultProps = {
  id: "",
  userName: "",
  separatorDate: "",
  avatarUrl: "",
  timeStamp: "",
  withHeader: false,
  fromSelf: false,
  style: {},
  messageBubbleClass: "",
};

export default ChatMessage;
