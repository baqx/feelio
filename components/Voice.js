import React, { useContext, useEffect, useState } from "react";
import {
  StyleSheet,
  Image,
  Pressable,
  View,
  Text,
  ScrollView,
} from "react-native";
import Voice from "@react-native-voice/voice";
import { SafeAreaView } from "react-native-safe-area-context";
import { DContexts } from "../contexts/DContexts";

export default function SpeechToText() {
  const [speechStarted, setSpeechStarted] = useState(false);
  const [results, setResults] = useState([]);
  const [date, setDate] = useState("");
  const [addedNote, setAddedNote] = useState(false);
  const { setChangedSomething } = useContext(DContexts);

  useEffect(() => {
    if (results) {
      setChangedSomething(results);
    }
  }, [results]);
  const startSpeech = async () => {
    try {
      await Voice.start("en-US");
      setSpeechStarted(true);
      const today = new Date();
      setDate(today.toLocaleDateString());
    } catch (error) {
      console.error("Error starting speech recognition: ", error);
    }
  };

  const handleStop = async () => {
    try {
      await Voice.stop();
      setSpeechStarted(false);
      setDate("");
      setResults([]);
    } catch (error) {
      console.error("Error stopping speech recognition: ", error);
    }
  };

  const onSpeechResults = (event) => {
    setResults(event.value);
  };
  const onSpeechError = (event) => {
    console.error("Speech recognition error: ", event.error);
    setSpeechStarted(false);
    setDate("");
    setResults([]);
  };

  useEffect(() => {
    Voice.onSpeechResults = onSpeechResults;
    Voice.onSpeechError = onSpeechError;
    return () => {
      Voice.destroy().then(Voice.removeAllListeners);
    };
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Save and Organize your notes</Text>
      <Text style={{ alignSelf: "flex-start", paddingLeft: 50 }}>
        Today's notes:{" "}
      </Text>

      <View style={styles.card}>
        {date ? <Text style={styles.heading}>Date: {date}</Text> : null}
        <ScrollView style={styles.scrollView}>
          {results.map((result, index) => (
            <Text key={index}>{result}</Text>
          ))}
        </ScrollView>
      </View>

      <View style={styles.buttonContainer}>
        {!speechStarted ? (
          <Pressable onPress={startSpeech}>
            {/* <Image
              style={styles.buttonImage}
              source={require("../../assets/images/microphone.png")}
            /> */}
            <Text>Start</Text>
          </Pressable>
        ) : (
          <Pressable onPress={handleStop}>
            {/* <Image
              style={styles.buttonImage}
              source={require("../../assets/images/stop.png")}
            /> */}
            <Text>stop</Text>
          </Pressable>
        )}
        {/* <CustomModal/> */}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  card: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 20,
    backgroundColor: "white",
    borderWidth: 1,
    borderColor: "grey",
    width: "80%",
    paddingHorizontal: 40,
    paddingBottom: 20,
    borderRadius: 10,
    maxHeight: 200,
    minHeight: 200,
    overflow: "hidden",
  },
  heading: {
    color: "red",
    marginBottom: 10,
  },
  scrollView: {
    width: "100%",
    marginTop: 10,
  },
  buttonContainer: {
    justifyContent: "center",
    alignItems: "center",
    marginVertical: 20,
  },
  buttonImage: {
    width: 50,
    height: 50,
  },
  title: {
    gap: 8,
    marginBottom: 8,
    fontWeight: "bold",
    fontSize: 24,
    paddingHorizontal: 20,
  },
});
