import React, { useContext } from "react";
import { StyleSheet } from "react-native";
import { DContexts } from "../contexts/DContexts";

const useStyles = () => {
  const { bgcolor } = useContext(DContexts);
  const { txtcolor } = useContext(DContexts);

  return StyleSheet.create({
    container: {
      flex: 1,
      flexGrow: 1,
      backgroundColor: bgcolor,
      paddingTop: 15,
    },
    greytext: {
      color: "grey",
      fontSize: 13,
      margin: 5,
    },
    txt: {
      color: txtcolor,
    },
    pagetitle: {
      margin: 10,
      marginRight: 25,
      marginTop: 25,
      fontSize: 26,
      color: txtcolor,
      fontWeight: "bold",
    },
    greytext2: {
      color: "grey",
      fontSize: 16,
      margin: 5,
    },
    noresdiv: {
      margin: 15,
      backgroundColor: bgcolor,
      padding: 15,
      justifyContent: "center",
      alignItems: "center",
    },
    noresdiv_err: {
      margin: 5,
      color: txtcolor,
    },
  });
};

export default useStyles;
