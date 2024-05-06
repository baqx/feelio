import React, { useContext } from "react";
import { View, Text, StyleSheet } from "react-native";
import { DContexts } from "../contexts/DContexts";
export default function Yearbtn({ year, active }) {
  const { primarycolor } = useContext(DContexts);
  const { opacitycolor } = useContext(DContexts);
  return (
    <View
      style={
        active
          ? { backgroundColor: primarycolor, ...styles.yrbtn }
          : { backgroundColor: opacitycolor, ...styles.yrbtn_o }
      }
    >
      <Text style={styles.yrbtn_yr}>{year}</Text>
      <Text style={styles.yrbtn_mem}>See memories</Text>
    </View>
  );
}
const styles = StyleSheet.create({
  yrbtn: {
    padding: 20,
    margin: 7,
    marginTop: 5,
    borderRadius: 15,
    color: "white",
    justifyContent: "space-between",
    elevation: 7,
    maxHeight: 80,
  },
  yrbtn_o: {
    padding: 20,
    margin: 7,
    marginTop: 5,
    borderRadius: 15,
    color: "white",
    justifyContent: "space-between",

    maxHeight: 80,
  },
  yrbtn_yr: {
    color: "#fff",
    fontSize: 20,
    fontWeight: "bold",
  },
  yrbtn_mem: {
    color: "#f2f2f2",
    fontSize: 13,
    fontWeight: "300",
  },
});
