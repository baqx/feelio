import React, { useContext } from "react";
import { View, Text } from "react-native";
import useStyles from "../constants/styles";
import { Ionicons } from "@expo/vector-icons";
import { DContexts } from "../contexts/DContexts";
export default function NoResultComponent() {
  css = useStyles();
  const { primarycolor } = useContext(DContexts);
  return (
    <View style={css.noresdiv}>
      <Ionicons
        name="balloon-outline"
        size={200}
        style={{ marginBottom: 10 }}
        color={primarycolor}
      />
      <Text style={css.noresdiv_err}>There are no diaries yet!</Text>
    </View>
  );
}
