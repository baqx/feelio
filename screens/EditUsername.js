import React, { useContext, useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  StatusBar,
} from "react-native";
import SecureStoreModel from "../constants/SecureStoreModel";
import { DContexts } from "../contexts/DContexts";
import useStyles from "../constants/styles";
const EditUsername = () => {
  const { setUnameSet } = useContext(DContexts);
  const { isUnameSet } = useContext(DContexts);
  const [uname, setUname] = React.useState("");
  const css = useStyles();
  const { txtcolor } = useContext(DContexts);
  const { primarycolor } = useContext(DContexts);
  const { setMyUname } = useContext(DContexts);
  const handlePress = () => {
    SecureStoreModel.saveItem("username", uname);
    setMyUname(uname);
    setUnameSet(true);
  };

  return (
    <>
      <StatusBar
        translucent
        backgroundColor={primarycolor}
        barStyle="light-content"
      />
      <View style={styles.container}>
        <Text style={{ fontSize: 26, fontWeight: 800 }}>Enter a nickname</Text>
        <Text style={{ fontSize: 20, fontWeight: 400, color: "grey" }}>
          You can only change this one time!
        </Text>
        <TextInput
          style={{ ...css.txt, ...styles.input }}
          onChangeText={setUname}
          value={uname}
          placeholder="Enter your nickname"
          placeholderTextColor={txtcolor}
          autoFocus={true}
        />
        <TouchableOpacity style={styles.btn} onPress={handlePress}>
          <Text style={{ color: "white" }}>Proceed</Text>
        </TouchableOpacity>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,

    margin: 20,
    paddingTop: 20,
  },
  input: {
    fontSize: 17,
    marginTop: 30,
    marginBottom: 20,
    padding: 10,
    backgroundColor: "#f5f5f5",
    borderRadius: 10,
  },

  btn: {
    padding: 20,
    backgroundColor: "#7856FF",
    margin: 10,
    alignItems: "center",
    borderRadius: 20,
  },
});

export default EditUsername;
