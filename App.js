import React from "react";
import { Platform } from "react-native";
import { GiftedChat } from "react-native-gifted-chat";
import emojiUtils from "emoji-utils";

import SlackMessage from "./MyMessage";

const messages = [
  {
    _id: 552,
    text: "I'm fine, how are you?",
    createdAt: new Date(),
    user: {
      _id: 2,
    },
  },
  {
    _id: 751,
    text: "Hey! how are you?",
    createdAt: new Date(),
    user: {
      _id: 1,
    },
  },
  {
    _id: 164,
    text: "Hello John Doe.",
    createdAt: new Date("09/27/2020"),
    user: {
      _id: 2,
    },
  },
];

export default class App extends React.Component {
  state = {
    messages: [],
  };

  componentDidMount() {
    this.setState({ messages });
  }

  onSend(messages = []) {
    this.setState((previousState) => ({
      messages: GiftedChat.append(previousState.messages, messages),
    }));
  }

  renderMessage(props) {
    const {
      currentMessage: { text: currText },
    } = props;

    let messageTextStyle;

    // Make "pure emoji" messages much bigger than plain text.
    if (currText && emojiUtils.isPureEmojiString(currText)) {
      console.log("emojis");
      messageTextStyle = {
        fontSize: 24,
        // Emoji get clipped if lineHeight isn't increased; make it consistent across platforms.
        lineHeight: Platform.OS === "android" ? 30 : 26,
      };
    }

    return <SlackMessage {...props} messageTextStyle={messageTextStyle} />;
  }

  render() {
    return (
      <GiftedChat
        messages={this.state.messages}
        onSend={(messages) => this.onSend(messages)}
        user={{ _id: 1 }}
        renderMessage={this.renderMessage}
      />
    );
  }
}
