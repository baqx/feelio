import React, { useEffect, useState, useContext } from "react";
import { View, Text, StyleSheet, Alert, StatusBar } from "react-native";
import DialPad from "../components/DialPad";
import SecureStoreModel from "../constants/SecureStoreModel";
import { useNavigation } from "@react-navigation/native";
import useStyles from "../constants/styles";
import { DContexts } from "../contexts/DContexts";

const ValidatePin = () => {
  const navigation = useNavigation();
  const [pin, setPin] = useState("");
  const [mypin, setMyPin] = useState("");
  const css = useStyles();
  const { bgcolor } = useContext(DContexts);
  const { primarycolor } = useContext(DContexts);
  useEffect(() => {
    const fetchPin = async () => {
      const mpin = await SecureStoreModel.getItem("pin");
      if (mpin !== null) {
        setMyPin(mpin);
      }
    };
    fetchPin();
  }, []);
  // Handle button press
  const handlePress = (value) => {
    if (value === "backspace") {
      // Handle backspace press
      setPin((prevPin) => prevPin.slice(0, -1));
    } else {
      // Handle number press
      if (pin.length < 4) {
        const newPin = pin + value.toString();
        setPin(newPin);

        // If the new pin length is exactly 4, automatically authenticate
        if (newPin.length === 4) {
          authenticatePin(newPin);
        }
      }
    }
  };

  // Function to authenticate the PIN
  const authenticatePin = (pin) => {
    // Replace the following logic with your actual authentication logic
    if (pin === mypin) {
      // Example PIN for demonstration purposes
      navigation.navigate("HomeTabs");
    } else {
      Alert.alert("Failure", "Invalid PIN. Try again.");
      // Clear the PIN after unsuccessful authentication
      setPin("");
    }
  };

  return (
    <>
      <StatusBar
        translucent
        backgroundColor={primarycolor}
        barStyle="light-content"
      />
      <View style={{ backgroundColor: bgcolor, ...styles.container }}>
        <Text style={{ ...css.txt, ...styles.inputText }}>
          Enter your 4-digit Feelio PIN:
        </Text>
        <Text style={{ ...styles.pin, ...css.txt }}>
          {"*".repeat(pin.length)}
        </Text>
        <DialPad onPress={handlePress} />
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  inputText: {
    fontSize: 20,
    marginBottom: 20,
  },
  pin: {
    fontSize: 24,
    marginBottom: 20,
  },
});

export default ValidatePin;
