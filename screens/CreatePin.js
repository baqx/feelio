import React, { useContext, useState } from "react";
import { View, Text, StyleSheet, StatusBar } from "react-native";
import DialPad from "../components/DialPad";
import SecureStoreModel from "../constants/SecureStoreModel";
import { DContexts } from "../contexts/DContexts";
import useStyles from "../constants/styles";
const CreatePin = () => {
  const [pin, setPin] = useState("");
  const { setPinSet } = useContext(DContexts);
  const css = useStyles();
  const { bgcolor } = useContext(DContexts);
  const { primarycolor } = useContext(DContexts);
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

    SecureStoreModel.saveItem("pin", pin);
    setPin("");
    setPinSet(true);
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
          Create a 4-digit PIN for Feelio:
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

export default CreatePin;
