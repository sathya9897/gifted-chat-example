/* eslint-disable no-underscore-dangle, no-use-before-define */

import React from "react";
import { View, StyleSheet } from "react-native";

import { Day, utils } from "react-native-gifted-chat";
import Bubble from "./MyBubble";

const { isSameUser, isSameDay } = utils;

export default class Message extends React.Component {
  getInnerComponentProps() {
    const { containerStyle, ...props } = this.props;
    return {
      ...props,
      isSameUser,
      isSameDay,
    };
  }

  renderDay() {
    if (this.props.currentMessage.createdAt) {
      const dayProps = this.getInnerComponentProps();
      if (this.props.renderDay) {
        return this.props.renderDay(dayProps);
      }
      return (
        <Day
          {...dayProps}
          textStyle={{ color: "black", fontWeight: "bold", marginBottom: 10 }}
        />
      );
    }
    return null;
  }

  renderBubble() {
    const bubbleProps = this.getInnerComponentProps();
    if (this.props.renderBubble) {
      return this.props.renderBubble(bubbleProps);
    }
    return <Bubble {...bubbleProps} />;
  }

  render() {
    const HeaderDate = isSameDay(
      this.props.currentMessage,
      this.props.previousMessage
    )
      ? null
      : this.renderDay();

    const marginBottom = isSameUser(
      this.props.currentMessage,
      this.props.nextMessage
    )
      ? 2
      : 10;
    return (
      <View style={{ marginBottom, marginHorizontal: 10, padding: 4 }}>
        {HeaderDate}
        {this.renderBubble()}
      </View>
    );
  }
}

const styles = StyleSheet.create({});
