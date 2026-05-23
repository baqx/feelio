import React, { useContext } from "react";
import { View, Text } from "react-native";
import { useTranslation } from "react-i18next";
import useStyles from "../constants/styles";
import { Ionicons } from "@expo/vector-icons";
import { DContexts } from "../contexts/DContexts";

export default function NoResultComponent() {
  css = useStyles();
  const { primarycolor } = useContext(DContexts);
  const { t } = useTranslation();
  return (
    <View style={css.noresdiv}>
      <Ionicons
        name="balloon-outline"
        size={100}
        style={{ marginBottom: 2 }}
        color={primarycolor}
      />
      <Text style={css.noresdiv_err}>{t("noDiaries")}</Text>
    </View>
  );
}
