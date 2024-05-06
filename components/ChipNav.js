import { View, Text, StyleSheet } from "react-native";
import { DContexts } from "../contexts/DContexts";
import React, { useContext } from "react";
export default function ChipNav({ name, active }) {
  const { primarycolor } = useContext(DContexts);
  const { opacitycolor } = useContext(DContexts);
  return (
    <View
      style={
        active
          ? { backgroundColor: primarycolor, ...styles.activeButton }
          : { backgroundColor: opacitycolor, ...styles.mtbtn }
      }
    >
      <Text style={styles.month_name}>{name}</Text>
    </View>
  );
}
const styles = StyleSheet.create({
  activeButton: {
    padding: 10,
    paddingHorizontal: 20,
    margin: 7,
    marginTop: 5,
    borderRadius: 15,
    color: "white",
    justifyContent: "space-between",
    alignItems: "center",
    elevation: 5,
    maxHeight: 80,
    minWidth: 90,
  },
  mtbtn: {
    padding: 10,
    paddingHorizontal: 20,
    margin: 7,
    marginTop: 5,
    borderRadius: 15,
    color: "white",
    justifyContent: "space-between",
    alignItems: "center",
    maxHeight: 80,
    maxHeight: 80,
    minWidth: 90,
  },

  month_name: {
    color: "#fff",
    justifyContent: "center",
    alignItems: "center",
  },
});
