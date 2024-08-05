import React from "react";
import Chat from "./lib";
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
  // if (currentUserId !== user1.id || currentUserId !== user2.id) {
  //   localStorage.removeItem("currentUserId");
  // }
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
          apiKey: "AIzaSyBKFmiqnOV8NKgyfVAPKeOS-71feMSnTQs",
          authDomain: "chat-app-d8f49.firebaseapp.com",
          projectId: "chat-app-d8f49",
          storageBucket: "chat-app-d8f49.appspot.com",
          messagingSenderId: "634280749305",
          appId: "1:634280749305:web:5dfcf4434d95ba77fa1a28",
          measurementId: "G-ECYCEBJM1W",
          databaseURL:
            "https://chat-app-d8f49-default-rtdb.asia-southeast1.firebasedatabase.app",
        }}
        currentUserId={currentUserId}
        receiver={getReceiver()}
        height="80%"
        className="chat-container"
        themeColor="#3C5A99"
        textColor="#fff"
      />
      <span>You are currently in the role of: {userRoles[currentUserId]}</span>
      <button className="btn" onClick={switchRoles}>
        Switch role
      </button>
    </div>
  );
};

export default App;
