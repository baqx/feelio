import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import React, { useContext } from "react";
import { DContexts } from "../contexts/DContexts";
import useStyles from "../constants/styles";
export default function AddTopBar({ acton }) {
  const { primarycolor } = useContext(DContexts);
  css = useStyles();
  return (
    <View style={styles.AddTopBar}>
      <View style={styles.atp_icon}></View>
      <View style={styles.atp_icon}>
        <Text style={{ ...css.txt, ...styles.atp_icon_text1 }}>New Diary</Text>
      </View>
      <TouchableOpacity onPress={acton}>
        <View style={styles.atp_btn}>
          <Text style={{ color: primarycolor, ...styles.atp_icon_text }}>
            Save
          </Text>
        </View>
      </TouchableOpacity>
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
    fontWeight: "bold",
    fontSize: 17,
  },
  atp_icon_text: {
    fontWeight: "400",

    fontSize: 17,
    margin: 5,
  },
  atp_icon: {
    margin: 5,
  },
});
