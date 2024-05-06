import React, { useContext } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { DContexts } from "../contexts/DContexts";
import useStyles from "../constants/styles";
export default function EditTopBar({ acton }) {
  const { primarycolor } = useContext(DContexts);
  const navigation = useNavigation();
  css = useStyles();

  return (
    <View style={styles.AddTopBar}>
      <TouchableOpacity
        onPress={() => navigation.goBack()}
        style={styles.atp_icon}
      >
        <Ionicons name="chevron-back" size={25} color={primarycolor} />
      </TouchableOpacity>
      <View style={styles.atp_icon}>
        <Text style={{ ...css.txt, ...styles.atp_icon_text1 }}>Edit</Text>
      </View>
      <TouchableOpacity onPress={acton}>
        <View style={styles.atp_btn}>
          <Text style={{ color: primarycolor, ...styles.atp_icon_text }}>
            Finish
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
    fontSize: 20,
  },
  atp_icon_text: {
    fontWeight: "600",
    fontSize: 20,
    margin: 5,
  },
  atp_icon: {
    margin: 5,
  },
});
