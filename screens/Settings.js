import React, { useContext } from "react";
import {
  View,
  Text,
  ScrollView,
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
  I18nManager,
  Alert,
} from "react-native";
import { useTranslation } from "react-i18next";
import useStyles from "../constants/styles";
import CircularChip from "../components/CircularChip";
import { useNavigation } from "@react-navigation/native";
import { DContexts } from "../contexts/DContexts";
import SecureStoreModel from "../constants/SecureStoreModel";

export default function Settings() {
  const css = useStyles();
  const { primarycolor } = useContext(DContexts);
  const navigation = useNavigation();
  const { t, i18n } = useTranslation();

  const changeLanguage = async (lang) => {
    if (i18n.language === lang) return;

    try {
      await i18n.changeLanguage(lang);
      await SecureStoreModel.saveItem("language", lang);

      const isRtl = lang === "ar";
      if (I18nManager.isRTL !== isRtl) {
        I18nManager.allowRTL(isRtl);
        I18nManager.forceRTL(isRtl);

        Alert.alert(
          lang === "ar" ? "تغيير اتجاه التطبيق" : "Change Layout Direction",
          lang === "ar"
            ? "يرجى إعادة تشغيل التطبيق لتطبيق اتجاه اليمين إلى اليسار (RTL) بشكل صحيح."
            : "Please restart the app to apply the Left-to-Right (LTR) layout correctly.",
          [{ text: lang === "ar" ? "موافق" : "OK" }]
        );
      }
    } catch (error) {
      console.error("Failed to change language:", error);
    }
  };

  return (
    <ScrollView style={css.container}>
      <SafeAreaView>
        <Text style={css.pagetitle}>{t("settings")}</Text>
        
        {/* Theme Section */}
        <View style={{ padding: 10 }}>
          <Text style={css.greytext}>{t("theme")}</Text>
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
          />
          <CircularChip
            name="Light"
            color="#000"
            backcolor="#f5f5f5"
            type="theme"
          />
        </ScrollView>

        {/* Color Section */}
        <View style={{ padding: 10 }}>
          <Text style={css.greytext}>{t("color")}</Text>
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
          />
          <CircularChip
            name="Green"
            color="#fff"
            backcolor="#f91880"
            opacity="#fc80b9"
            type="color"
          />
          <CircularChip
            name="Blue"
            type="color"
            color="#fff"
            backcolor="#7856FF"
            opacity="#a089ff"
          />
          <CircularChip
            name="Serene"
            color="#fff"
            backcolor="#FF7A00"
            opacity="#ffa24c"
            type="color"
          />
          <CircularChip
            name="Yellow"
            color="#fff"
            backcolor="#00BA7C"
            opacity="#66d6b0"
            type="color"
          />
        </ScrollView>

        {/* Language Section */}
        <View style={{ padding: 10 }}>
          <Text style={css.greytext}>{t("language")}</Text>
        </View>
        <ScrollView
          style={styles.chsroll}
          showsHorizontalScrollIndicator={false}
          horizontal={true}
        >
          <TouchableOpacity
            style={{
              backgroundColor: i18n.language === "en" ? primarycolor : "#f5f5f5",
              ...styles.circle,
              borderWidth: i18n.language === "en" ? 0 : 1,
              borderColor: "#ccc",
            }}
            onPress={() => changeLanguage("en")}
          >
            <Text
              style={{
                color: i18n.language === "en" ? "white" : "black",
                fontWeight: "bold",
              }}
            >
              English
            </Text>
          </TouchableOpacity>
          
          <TouchableOpacity
            style={{
              backgroundColor: i18n.language === "ar" ? primarycolor : "#f5f5f5",
              ...styles.circle,
              borderWidth: i18n.language === "ar" ? 0 : 1,
              borderColor: "#ccc",
            }}
            onPress={() => changeLanguage("ar")}
          >
            <Text
              style={{
                color: i18n.language === "ar" ? "white" : "black",
                fontWeight: "bold",
              }}
            >
              العربية
            </Text>
          </TouchableOpacity>
        </ScrollView>

        {/* Security / PIN section */}
        <TouchableOpacity onPress={() => navigation.navigate("EditPin")}>
          <View style={{ backgroundColor: primarycolor, ...styles.cta }}>
            <Text style={{ color: "white", fontWeight: "900" }}>
              {t("changePinBtn")}
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
    padding: 20,
    borderRadius: 15,
  },
  circle: {
    width: 80,
    height: 80,
    borderRadius: 40,
    margin: 5,
    justifyContent: "center",
    alignItems: "center",
    elevation: 5,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
});
