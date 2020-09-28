/* eslint-disable no-underscore-dangle, no-use-before-define */

import React from "react";
import { StyleSheet, View } from "react-native";

import { utils, MessageText, Time } from "react-native-gifted-chat";

const { isSameDay } = utils;

export default class Bubble extends React.Component {
  renderMessageText() {
    if (this.props.currentMessage.text) {
      console.log(this.props.messageTextStyle);
      return (
        <MessageText
          {...this.props}
          textStyle={{
            left: { ...styles.messageText, ...this.props.messageTextStyle },
            right: { ...styles.messageText, ...this.props.messageTextStyle },
          }}
        />
      );
    }
    return null;
  }

  renderTime() {
    if (this.props.currentMessage.createdAt) {
      const { containerStyle, wrapperStyle, ...timeProps } = this.props;
      if (this.props.renderTime) {
        return this.props.renderTime(timeProps);
      }
      return (
        <Time
          {...timeProps}
          timeTextStyle={{ left: styles.time, right: styles.time }}
        />
      );
    }
    return null;
  }

  render() {
    const isMe = this.props.currentMessage.user._id === this.props.user._id;

    return (
      <View
        style={{
          backgroundColor: "#D00F67",
          alignSelf: isMe ? "flex-end" : "flex-start",
          borderRadius: 4,
          maxWidth: "85%",
        }}
      >
        {this.renderMessageText()}
        {this.renderTime()}
      </View>
    );
  }
}

// Note: Everything is forced to be "left" positioned with this component.
// The "right" position is only used in the default Bubble.

const styles = StyleSheet.create({
  messageText: {
    color: "white",
    textAlign: "justify",
  },
  time: {
    color: "white",
  },
});
