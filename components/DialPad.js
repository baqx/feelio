import { Ionicons } from "@expo/vector-icons";
import React, { useContext } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { DContexts } from "../contexts/DContexts";
const DialPad = ({ onPress }) => {
  const { bgcolor } = useContext(DContexts);

  const renderButton = (number) => {
    return (
      <TouchableOpacity
        key={number}
        style={styles.button}
        onPress={() => onPress(number)}
      >
        <Text style={styles.text}>{number}</Text>
      </TouchableOpacity>
    );
  };

  return (
    <View style={{ backgroundColor: bgcolor, ...styles.container }}>
      <View style={styles.row}>
        {renderButton(1)}
        {renderButton(2)}
        {renderButton(3)}
      </View>
      <View style={styles.row}>
        {renderButton(4)}
        {renderButton(5)}
        {renderButton(6)}
      </View>
      <View style={styles.row}>
        {renderButton(7)}
        {renderButton(8)}
        {renderButton(9)}
      </View>
      <View style={styles.row}>
        <TouchableOpacity
          style={styles.button}
          onPress={() => onPress("backspace")}
        >
          <Ionicons name="backspace" color="grey" size={20} />
        </TouchableOpacity>
        {renderButton(0)}
        <View style={styles.emptyButton} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
  row: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    maxWidth: "100%",
  },
  button: {
    margin: 10,
    padding: 20,
    borderRadius: 30,
    backgroundColor: "#d5d5d5",
    alignItems: "center",
    justifyContent: "center",
    width: 60,
    height: 60,
  },
  text: {
    color: "black",
    fontSize: 17,
    fontWeight: "bold",
  },
  emptyButton: {
    width: 60,
    margin: 10,
    padding: 20,
    borderRadius: 30,
    height: 60,
  },
});

export default DialPad;
