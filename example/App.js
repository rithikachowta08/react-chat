import React from "react";
import Chat from "../src/lib";
import "./App.scss";

// Info of participants in the chat
const user1 = {
  name: "Harry Potter",
  id: "1004",
  imageUrl:
    "https://upload.wikimedia.org/wikipedia/en/d/d7/Harry_Potter_character_poster.jpg",
};

const user2 = {
  name: "Ron Weasley",
  id: "1005",
  imageUrl:
    "https://static.wikia.nocookie.net/the-truth-behind-aurora/images/8/85/Ron_Weasley.jpg",
};

const userRoles = {
  [user1.id]: "Harry Potter",
  [user2.id]: "Ron Weasley",
};

const App = () => {
  // Function to switch current user i.e "you" in the chat and reload the chat in the new role
  const currentUserId = localStorage.getItem("currentUserId") || user1.id;
  const switchRoles = () => {
    if (currentUserId === user1.id) {
      localStorage.setItem("currentUserId", user2.id.toString());
    } else {
      localStorage.setItem("currentUserId", user1.id.toString());
    }
    window.location.reload();
  };

  // Get receiver info based on who the current user is
  const getReceiver = () => (currentUserId === user1.id ? user2 : user1);

  return (
    <div className="App">
      <Chat
        config={{
          apiKey: process.env.REACT_APP_API_KEY,
          authDomain: process.env.REACT_APP_AUTH_DOMAIN,
          projectId: process.env.REACT_APP_PROJECT_ID,
          storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
          messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
          appId: process.env.REACT_APP_APP_ID,
          measurementId: process.env.REACT_APP_MEASUREMENT_ID,
          databaseURL: process.env.REACT_APP_DATABASE_URL,
        }}
        currentUserId={currentUserId}
        receiver={getReceiver()}
        className="chat-container"
        themeColor="#192586"
        textColor="#fff"
        darkMode
      />
      <span>You are currently in the role of: {userRoles[currentUserId]}</span>
      <button className="btn" onClick={switchRoles}>
        Switch role
      </button>
    </div>
  );
};

export default App;
