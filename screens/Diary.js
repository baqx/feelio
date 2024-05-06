import React, { useState, useEffect, useContext } from "react";
import {
  View,
  Text,
  ScrollView,
  SafeAreaView,
  TextInput,
  StyleSheet,
} from "react-native";
import useStyles from "../constants/styles";
import DiaryTopBar from "../components/DiaryTopBar";
import { useNavigation, useRoute } from "@react-navigation/native";
import { getDiary } from "../constants/Database";
import { DContexts } from "../contexts/DContexts";
export default function Diary() {
  const navigation = useNavigation();
  const route = useRoute();
  const diaryid = route.params.id;
  console.log(diaryid);
  const [diary, setDiary] = useState([]);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [day, setDay] = useState(null);
  const [month, setMonth] = useState(null);
  const [year, setYear] = useState(null);

  const { changedsomething } = useContext(DContexts);
  const { setChangedSomething } = useContext(DContexts);

  css = useStyles();
  useEffect(() => {
    getDiary(diaryid)
      .then((data) => {
        if (data[0]) {
          setTitle(data[0].title);
          setContent(data[0].content);
          setDay(data[0].day);
          setMonth(data[0].monthname);
          setYear(data[0].year);
          setDiary(data);
        }
      })
      .catch((error) => {
        console.error("Failed to get diaries:", error);
      });
  }, [changedsomething]);

  const goToEdit = (did) => {
    navigation.navigate("Edit", { id: did });
  };
  return (
    <ScrollView style={css.container}>
      <SafeAreaView>
        <DiaryTopBar acton={() => goToEdit(diaryid)} diaryid={diaryid} />
        <View style={{ margin: 15 }}>
          <Text style={css.greytext}>
            {day}, {month} {year}
          </Text>
          <Text style={{ ...css.txt, ...styles.title }}>{title}</Text>
          <Text style={{ ...css.txt, ...styles.content }}>{content}</Text>
        </View>
      </SafeAreaView>
    </ScrollView>
  );
}
const styles = StyleSheet.create({
  title: {
    margin: 10,
    marginLeft: 0,
    marginTop: 1,
    padding: 5,
    fontSize: 28,
    fontWeight: "600",
    letterSpacing: 1,
  },
  content: {
    fontSize: 16,
    lineHeight: 16,
    margin: 5,
  },
});
