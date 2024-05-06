import React, { useContext } from "react";
import {
  View,
  Text,
  ScrollView,
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import useStyles from "../constants/styles";
import CircularChip from "../components/CircularChip";
import { useNavigation } from "@react-navigation/native";
import { DContexts } from "../contexts/DContexts";
export default function Settings() {
  const css = useStyles();
  const { primarycolor } = useContext(DContexts);
  const navigation = useNavigation();
  return (
    <ScrollView style={css.container}>
      <SafeAreaView>
        <Text style={css.pagetitle}>Settings</Text>
        <View style={{ padding: 10 }}>
          <Text style={css.greytext}>Theme</Text>
        </View>
        <ScrollView
          style={styles.chsroll}
          showsHorizontalScrollIndicator={false}
          horizontal={true}
        >
          <CircularChip
            name="Dark"
            color="#f5f5f5"
            backcolor="#15202B"
            type="theme"
          ></CircularChip>
          <CircularChip
            name="Light"
            color="#000"
            backcolor="#f5f5f5"
            type="theme"
          ></CircularChip>
        </ScrollView>
        <View style={{ padding: 10 }}>
          <Text style={css.greytext}>Color</Text>
        </View>
        <ScrollView
          style={styles.chsroll}
          showsHorizontalScrollIndicator={false}
          horizontal={true}
        >
          <CircularChip
            name="Purple"
            color="#fff"
            backcolor="#1D9BF0"
            type="color"
            opacity="#8ecdf8"
          ></CircularChip>

          <CircularChip
            name="Green"
            color="#fff"
            backcolor="#f91880"
            opacity="#fc80b9"
            type="color"
          ></CircularChip>
          <CircularChip
            name="Blue"
            type="color"
            color="#fff"
            backcolor="#7856FF"
            opacity="#a089ff"
          ></CircularChip>
          <CircularChip
            name="Serene"
            color="#fff"
            backcolor="#FF7A00"
            opacity="#ffa24c"
            type="color"
          ></CircularChip>
          <CircularChip
            name="Yellow"
            color="#fff"
            backcolor="#00BA7C"
            opacity="#66d6b0"
            type="color"
          ></CircularChip>
        </ScrollView>
        <TouchableOpacity onPress={() => navigation.navigate("EditPin")}>
          <View style={{ backgroundColor: primarycolor, ...styles.cta }}>
            <Text style={{ color: "white", fontWeight: "900" }}>
              Change Pin
            </Text>
          </View>
        </TouchableOpacity>
      </SafeAreaView>
    </ScrollView>
  );
}
const styles = StyleSheet.create({
  chsroll: {
    padding: 10,
  },
  cta: {
    margin: 15,
    justifyContent: "center",
    alignItems: "center",

    color: "#fff",
    padding: 20,
    borderRadius: 15,
  },
});
