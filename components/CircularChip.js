import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { Fontisto, Ionicons } from "@expo/vector-icons";
import react, { useContext } from "react";
import { DContexts } from "../contexts/DContexts";

import SecureStoreModel from "../constants/SecureStoreModel";
export default function CircularChip({
  name,
  backcolor,
  color,

  type,
  opacity,
}) {
  const { setOpacityColor } = useContext(DContexts);
  const { setPrimaryColor } = useContext(DContexts);
  const { setbgColor } = useContext(DContexts);
  const { setCardColor } = useContext(DContexts);
  const { settxtColor } = useContext(DContexts);
  const changeColor = () => {
    setPrimaryColor(backcolor);
    setOpacityColor(opacity);
    SecureStoreModel.saveItem("primarycolor", backcolor);
    SecureStoreModel.saveItem("opacitycolor", opacity);
  };
  const changeTheme = () => {
    setbgColor(backcolor);

    SecureStoreModel.saveItem("bgcolor", backcolor);

    if (name == "Dark") {
      setCardColor("#273340");
      settxtColor("white");
      SecureStoreModel.saveItem("cardcolor", "#273340");
      SecureStoreModel.saveItem("textcolor", "white");
    } else if (name == "Light") {
      setCardColor("white");
      settxtColor("black");
      SecureStoreModel.saveItem("cardcolor", "white");
      SecureStoreModel.saveItem("textcolor", "black");
    }
  };
  if (type == "theme") {
    return (
      <TouchableOpacity
        style={{ backgroundColor: backcolor, ...styles.circle }}
        onPress={changeTheme}
      >
        <Text style={{ color: color }}>{name}</Text>
      </TouchableOpacity>
    );
  } else if (type == "color") {
    return (
      <TouchableOpacity
        style={{ backgroundColor: backcolor, ...styles.circle }}
        onPress={changeColor}
      ></TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  circle: {
    width: 70,
    height: 70,
    borderRadius: 50,
    margin: 5,
    justifyContent: "center",
    alignItems: "center",
    elevation: 10,
  },
  dlistTop: {
    color: "grey",
    fontSize: 13,
    letterSpacing: 3,
  },
  dlistMain: {
    fontWeight: "bold",
    fontSize: 19,
  },
});
