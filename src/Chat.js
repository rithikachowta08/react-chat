import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { initializeApp } from "firebase/app";
import {
  getDatabase,
  ref,
  onValue,
  query,
  limitToLast,
  push,
} from "firebase/database";
import { getTime } from "date-fns";

import { createStore, applyMiddleware, combineReducers, compose } from "redux";
import createSagaMiddleware from "redux-saga";
import { Provider } from "react-redux";
import RootSaga from "./rootSaga";
import chat from "./Chat.reducer";
import ACTIONS from "./actions.constants";

import ChatInput from "./ChatInput/ChatInput";
import ChatBody from "./ChatBody";
import spinner from "./images/spinner.gif";
import sendBtn from "./images/send.png";
import "./Chat.scss";

let dbRef;
const sagaMiddleware = createSagaMiddleware();
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(
  combineReducers({ chat }),
  composeEnhancers(applyMiddleware(sagaMiddleware))
);
sagaMiddleware.run(function* () {
  yield RootSaga();
});

class Chat extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentMessage: "",
    };

    this.customStyle = {
      backgroundColor: props.themeColor,
      borderColor: `${props.themeColor} ${props.themeColor} transparent transparent`,
      color: props.textColor,
    };
  }

  componentDidMount() {
    const { currentUserId, receiver } = this.props;
    // chat-room is always named by sender and receiver names arranged lexicographically
    this.chatRoom =
      currentUserId > receiver.id
        ? `${receiver.id}-${currentUserId}`
        : `${currentUserId}-${receiver.id}`;
    this.initialize();
  }

  // Input field change handler
  updateStateOnChange = (event) => {
    if (!event.target.value || event.target.value.trim()) {
      this.setState({ currentMessage: event.target.value });
    }
  };

  // Enter key handler
  handleKeyPress = (event) => {
    if (event.key === "Enter") {
      this.sendMessage();
    }
  };

  // Initialize firebase app and fetch all messages in current chat-room
  initialize = () => {
    const app = initializeApp(this.props.config);
    dbRef = getDatabase(app);
    this.props.fetchChat({
      CHAT_URL: this.chatRoom,
      currentUserId: this.props.currentUserId,
      receiver: this.props.receiver,
    });
    this.setChatListener();
  };

  // Listen for updates to chat-room, dispatch action to update UI
  setChatListener = () => {
    const chatRoomRef = query(ref(dbRef, this.chatRoom), limitToLast(1));
    onValue(chatRoomRef, (snapshot) => {
      const data = snapshot.val();
      this.props.updateChatState({
        snapshot: data,
        currentUserId: this.props.currentUserId,
        receiver: this.props.receiver,
      });
    });
  };

  // Write message to chat-room and reset state
  sendMessage = () => {
    if (this.state.currentMessage) {
      const chatRef = ref(dbRef, this.chatRoom);
      push(chatRef, {
        from: this.props.currentUserId,
        to: this.props.receiver.id,
        text: this.state.currentMessage,
        timestamp: getTime(new Date()) / 1000,
      });
    }
    this.setState({ currentMessage: "" });
  };

  render() {
    const { error, isFetching, messages } = this.props.chat;
    const {
      loader,
      sendIcon,
      containerClass,
      inputClass,
      messageBubbleClass,
      darkMode,
    } = this.props;
    return (
      <Provider store={store}>
        <div
          className={`${containerClass} chat-section ${darkMode ? "dark" : ""}`}
          style={this.chatStyle}
        >
          {error && <div className="error">Oops! Something went wrong!</div>}
          {isFetching && (
            <div className="centered-container">
              <img src={loader} alt="Loading messages" />
            </div>
          )}
          {!isFetching && messages && !messages.length && (
            <div
              className="centered-container no-message"
              style={this.customStyle}
            >
              No messages yet! Say hi!
            </div>
          )}
          <ChatBody
            messages={messages}
            style={this.customStyle}
            messageBubbleClass={messageBubbleClass}
          />
          <ChatInput
            value={this.state.currentMessage}
            changeHandler={this.updateStateOnChange}
            clickHandler={this.sendMessage}
            enterKeyHandler={this.handleKeyPress}
            icon={sendIcon}
            className={inputClass}
          />
        </div>
      </Provider>
    );
  }
}

Chat.propTypes = {
  config: PropTypes.object.isRequired,
  receiver: PropTypes.object.isRequired,
  currentUserId: PropTypes.string.isRequired,
  height: PropTypes.string,
  width: PropTypes.string,
  themeColor: PropTypes.string,
  textColor: PropTypes.string,
  sendIcon: PropTypes.string,
  loader: PropTypes.string,
  containerClass: PropTypes.string,
  inputClass: PropTypes.string,
  messageBubbleClass: PropTypes.string,
  darkMode: PropTypes.bool,
};

Chat.defaultProps = {
  className: "",
  themeColor: "#3cb3dd",
  textColor: "#ffffff",
  loader: spinner,
  sendIcon: sendBtn,
  containerClass: "",
  inputClass: "",
  messageBubbleClass: "",
  darkMode: false,
};

const connectWithStore = (store, WrappedComponent, ...args) => {
  var ConnectedWrappedComponent = connect(...args)(WrappedComponent);
  return function (props) {
    return <ConnectedWrappedComponent {...props} store={store} />;
  };
};

const mapStateToProps = (state) => ({
  chat: state.chat,
});

const mapDispatchToProps = (dispatch) => ({
  fetchChat: (data) => {
    dispatch({ type: ACTIONS.FETCH_CHAT, data, dbRef });
  },
  updateChatState: (data) => {
    dispatch({ type: ACTIONS.UPDATE_CHAT, data });
  },
});

export default connectWithStore(
  store,
  Chat,
  mapStateToProps,
  mapDispatchToProps
);
