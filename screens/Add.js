import React, { useEffect, useState, useContext } from "react";
import {
  View,
  Text,
  ScrollView,
  SafeAreaView,
  TextInput,
  StyleSheet,
} from "react-native";
import useStyles from "../constants/styles";
import AddTopBar from "../components/AddTopBar";
import { insertDiary } from "../constants/Database";
import { useNavigation } from "@react-navigation/native";
import { DContexts } from "../contexts/DContexts";
import SecureStoreModel from "../constants/SecureStoreModel";
export default function Add() {
  SecureStoreModel.itemExists("myKey").then((exists) => {
    console.log(`Does "myKey" exist? ${exists}`);
  });
  const css = useStyles();
  const navigation = useNavigation();
  const [text, onChangeTitle] = React.useState("");
  const [value, onChangeText] = React.useState("");
  const { changedsomething } = useContext(DContexts);
  const { setChangedSomething } = useContext(DContexts);
  const { txtcolor } = useContext(DContexts);

  const date = new Date();
  const day = date.getDate();
  const month = date.getMonth() + 1;
  const monthIndex = date.getMonth();
  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  const monthName = monthNames[monthIndex];
  const year = date.getFullYear();
  const unixTimestampMillis = date.getTime();
  const unixTimestampSeconds = Math.floor(unixTimestampMillis / 1000);
  const hour = date.getHours();
  const minute = date.getMinutes();
  const submitDiary = async () => {
    try {
      await insertDiary(
        text,
        value,
        year,
        month,
        day,
        hour,
        minute,
        monthName,
        unixTimestampSeconds
      );

      setChangedSomething(Math.floor(Math.random() * (5000 - 0 + 1)) + 0);
      onChangeText("");
      onChangeTitle("");
      navigation.navigate("Home");
    } catch (error) {
      console.error("Failed to insert Diary:", error);
    }
  };
  return (
    <ScrollView style={css.container}>
      <SafeAreaView>
        <AddTopBar acton={submitDiary} />
        <View style={{ padding: 10 }}>
          <Text style={css.greytext}>Title</Text>
          <TextInput
            style={{ ...css.txt, ...styles.title_input }}
            onChangeText={onChangeTitle}
            value={text}
            placeholder="Enter your title"
            autoFocus={true}
            placeholderTextColor={txtcolor}
          />
          <Text style={css.greytext}>Text</Text>
          <View>
            <TextInput
              editable
              multiline
              numberOfLines={10}
              maxLength={10000}
              placeholder="How are you feeling?"
              onChangeText={(text) => onChangeText(text)}
              value={value}
              style={{ ...css.txt, padding: 15 }}
              textAlignVertical="top"
              placeholderTextColor={txtcolor}
            />
          </View>
        </View>
      </SafeAreaView>
    </ScrollView>
  );
}
const styles = StyleSheet.create({
  title_input: {
    margin: 15,
    padding: 5,
    fontSize: 17,
  },
});
