import React, { useContext } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Alert } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { deleteDiaryById } from "../constants/Database";
import { DContexts } from "../contexts/DContexts";
import useStyles from "../constants/styles";
export default function DiaryTopBar({ acton, diaryid }) {
  const navigation = useNavigation();
  const { setChangedSomething } = useContext(DContexts);

  const { primarycolor } = useContext(DContexts);
  css = useStyles();
  const delDiary = async () => {
    console.log(diaryid);
    try {
      await deleteDiaryById(diaryid);

      setChangedSomething(Math.floor(Math.random() * (5000 - 0 + 1)) + 0);

      navigation.navigate("Home");
    } catch (error) {
      console.error("Failed to delete Diary:", error);
    }
  };
  const showAlert = () =>
    Alert.alert(
      "Delete Diary",
      "Are you sure you want to delete?",
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        { text: "Yes", onPress: delDiary },
      ],
      {
        cancelable: true,
      }
    );
  return (
    <View style={styles.AddTopBar}>
      <TouchableOpacity
        style={styles.atp_icon}
        onPress={() => navigation.goBack()}
      >
        <Ionicons name="chevron-back" size={30} color={primarycolor} />
      </TouchableOpacity>
      <View style={styles.atp_icon}>
        <Text style={{ ...css.txt, ...styles.atp_icon_text1 }}>Diary</Text>
      </View>
      <View style={{ flexDirection: "row" }}>
        <TouchableOpacity onPress={acton}>
          <View style={styles.atp_btn}>
            <Text style={{ color: primarycolor, ...styles.atp_icon_text }}>
              Edit
            </Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={showAlert}>
          <Ionicons
            name="trash-bin"
            color={primarycolor}
            style={{ margin: 5, marginLeft: 15, marginRight: 15 }}
            size={20}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  AddTopBar: {
    margin: 10,
    marginTop: 20,
    padding: 10,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  atp_icon_text1: {
    fontWeight: "700",
    fontSize: 18,
    margin: 3,
  },
  atp_icon_text: {
    fontWeight: "600",
    fontSize: 16,
    margin: 3,
  },
  atp_icon: {
    margin: 3,
  },
});
