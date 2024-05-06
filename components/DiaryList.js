import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { DContexts } from "../contexts/DContexts";
import React, { useContext } from "react";
import useStyles from "../constants/styles";

export default function ({ id, title, timestamp }) {
  const navigation = useNavigation();
  const { primarycolor } = useContext(DContexts);
  const { txtcolor } = useContext(DContexts);
  const { cardcolor } = useContext(DContexts);

  css = useStyles();
  const goToDiary = (did) => {
    navigation.navigate("Diary", { id: did });
  };

  const date = new Date(timestamp * 1000);

  const day = date.getDate();
  const monthIndex = date.getMonth();
  const year = date.getFullYear();

  // Map month index to month name
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
  const month = monthNames[monthIndex];

  // Extract hour and minute
  let hour = date.getHours(); // Hour in 24-hour format (0-23)
  const minute = date.getMinutes(); // Minute (0-59)

  // Determine AM/PM and convert hour to 12-hour format
  const amPm = hour >= 12 ? "PM" : "AM";
  hour = hour % 12;
  if (hour === 0) {
    hour = 12; // Adjust for 12-hour format (12 instead of 0)
  }

  // Format minute to always display two digits
  const formattedMinute = minute < 10 ? `0${minute}` : minute;

  return (
    <TouchableOpacity
      onPress={() => goToDiary(id)}
      style={{ backgroundColor: cardcolor, ...styles.dlist }}
    >
      <View style={{ flex: 0.2 }}>
        <Ionicons name="book-sharp" size={50} color={primarycolor} />
      </View>
      <View style={{ flex: 0.8, flexDirection: "column" }}>
        <Text style={{ color: txtcolor, ...styles.dlistTop }}>
          {hour}:{formattedMinute} {amPm} {day},{month} {year}
        </Text>
        <Text style={{ ...css.txt, ...styles.dlistMain }}>{title}</Text>
      </View>

      <View style={{ justifyContent: "center" }}>
        <Ionicons name="chevron-forward" size={24} color="grey" />
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  dlist: {
    margin: 18,
    padding: 15,
    marginBottom: 5,
    borderRadius: 20,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  dlistTop: {
    color: "grey",
    fontSize: 13,
    letterSpacing: 2,
    fontFamily: "Poppins",
  },
  dlistMain: {
    fontWeight: "bold",
    fontSize: 19,
  },
});
