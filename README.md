# React Chat

> One to one chat component built using Firebase's realtime database. This component can be used to intialize a chat window for a user who is logged in to your application, with another user of your application. The messages are stored and read from Firebase RTDB. A firebase config must be passed for the component to work.

<br/>

![Chat GIF](https://i.imgur.com/VrV3unZ.gif)

## Requirements

A login and signup flow must already be implemented in your application. This component must be rendered only on pages where your user has already logged in. It is assumed that information regarding the sender and receiver of the messages is already known at the time of invoking this component.

## Installation

`npm i @rithikachowta08/react-chat`

## Usage

- Create an app on firebase and copy the configuration object to be passed as props to the chat component.

<br/>

```jsx harmony
<Chat
  config={{
    apiKey: "...",
    authDomain: "...",
    databaseURL: "...",
    projectId: "...",
    storageBucket: "...",
    messagingSenderId: "...",
    appId: "...",
  }}
  currentUser={{
    name: "Harry",
    id: "129091",
    imageUrl: "https://upload.wikimedia.org/wikipedia/en/d/d7/Harry_Potter_character_poster.jpg",
  }}
  receiver={{
    name: "Ron",
    id: "129090",
    imageUrl: "https://static.wikia.nocookie.net/the-truth-behind-aurora/images/8/85/Ron_Weasley.jpg",
  }}
  themeColor="#3C5A99"
  textColor="#fff"
  messageBubbleClass=""
  containerClass=""
  inputClass=""
/>
```

## Props

| Name               | Value     | Description                                                                                                                                                                                                           |
| ------------------ | --------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| config             | `object`  | Firebase configuration info of your Firebase App. Required to access Firebase Realtime database.                                                                                                                      |
| receiver           | `object`  | An object containing `name` (string), `id` (string) and `imageUrl`(string) . This contains the information of the intended recipient of messages in the chatroom. `imageUrl` will be used as avatar of the recipient. |
| currentUser        | `object`  | An object containing `name` (string), `id` (string) and `imageUrl`(string) . This contains the information of the current logged-in user who is initiating the chat. `imageUrl` will be used as avatar of the user.   |
| themeColor         | `string`  | Color code that will be used as the primary color for the chat component                                                                                                                                              |
| textColor          | `string`  | Color code that will be used for the text in the message bubbles                                                                                                                                                      |
| sendIcon           | `string`  | Image URL that will be used as the send icon in the input field                                                                                                                                                       |
| loader             | `string`  | Image URL that will be used as the loader while messages are being fetched from firebase                                                                                                                              |
| containerClass     | `string`  | className for chat container                                                                                                                                                                                          |
| inputClass         | `string`  | className for the message input element                                                                                                                                                                               |
| messageBubbleClass | `string`  | className for the message bubble component                                                                                                                                                                            |
| darkMode           | `boolean` | Boolean value to enable/disable dark mode                                                                                                                                                                             |

<br/>

## Links and examples

- Full example on Github: [Example](https://github.com/rithikachowta08/react-chat/tree/main/example).

- Demo: [Demo](https://neon-horse-6efae9.netlify.app/).

- Tutorial on how this package was implemented: [Medium article](https://medium.com/@rithikachowta/building-a-real-time-chat-application-with-react-firebase-and-redux-saga-9cbbdbc34720?postPublishedType=initial).

## License

react-chat is released under [MIT License](https://opensource.org/licenses/MIT).
