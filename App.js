import React, { useState, useEffect } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Platform, StatusBar } from "react-native";
import HomeTabs from "./components/Tabs";
import Diary from "./screens/Diary";
import Edit from "./screens/Edit";
import { DContexts } from "./contexts/DContexts";
import CreatePin from "./screens/CreatePin";
import { initializeDatabase } from "./constants/Database";
import SecureStoreModel from "./constants/SecureStoreModel";
import * as SplashScreen from "expo-splash-screen";
import * as SecureStore from "expo-secure-store";
import ValidatePin from "./screens/ValidatePin";
import EditUsername from "./screens/EditUsername";
import EditPin from "./screens/EditPin";
import { useFonts } from "expo-font";
const Stack = createNativeStackNavigator();
SplashScreen.preventAutoHideAsync();
export default function App() {
  const [changedsomething, setChangedSomething] = useState("");
  const [primarycolor, setPrimaryColor] = useState("#7856FF");
  const [opacitycolor, setOpacityColor] = useState("#a089ff");
  const [bgcolor, setbgColor] = useState("#f5f5f5");
  const [cardcolor, setCardColor] = useState("white");
  const [txtcolor, settxtColor] = useState("black");
  const [isPinSet, setPinSet] = useState(false);
  const [isUnameSet, setUnameSet] = useState(false);
  const [myuname, setMyUname] = useState("");
  const [fontsLoaded, fontError] = useFonts({
    Poppins: require("./assets/fonts/poppins.ttf"),
  });
  // Load colors and hide splash screen
  useEffect(() => {
    const loadColors = async () => {
      try {
        // Define default colors
        const Deafaults = {
          primaryColor: "#7856FF",
          opacityColor: "#a089ff",
          bgColor: "#f5f5f5",
          cardColor: "white",
          textColor: "black",
        };

        const loadedPrimaryColor = await SecureStore.getItemAsync(
          "primarycolor"
        );
        const loadedOpacityColor = await SecureStore.getItemAsync(
          "opacitycolor"
        );
        const loadedBgColor = await SecureStore.getItemAsync("bgcolor");
        const loadedCardColor = await SecureStore.getItemAsync("cardcolor");
        const loadedTextColor = await SecureStore.getItemAsync("textcolor");
        const loadedUsername = await SecureStore.getItemAsync("username");
        if (loadedUsername !== "") {
          setMyUname(loadedUsername);
        }
        // Check and save colors if they don't exist
        if (loadedPrimaryColor === null) {
          await SecureStore.setItemAsync(
            "primarycolor",
            Deafaults.primaryColor
          );
          setPrimaryColor(Deafaults.primaryColor);
        } else {
          setPrimaryColor(loadedPrimaryColor);
        }

        if (loadedOpacityColor === null) {
          await SecureStore.setItemAsync(
            "opacitycolor",
            Deafaults.opacityColor
          );
          setOpacityColor(Deafaults.opacityColor);
        } else {
          setOpacityColor(loadedOpacityColor);
        }

        if (loadedBgColor === null) {
          await SecureStore.setItemAsync("bgcolor", Deafaults.bgColor);
          setbgColor(Deafaults.bgColor);
        } else {
          setbgColor(loadedBgColor);
        }

        if (loadedCardColor === null) {
          await SecureStore.setItemAsync("cardcolor", Deafaults.cardColor);
          setCardColor(Deafaults.cardColor);
        } else {
          setCardColor(loadedCardColor);
        }

        if (loadedTextColor === null) {
          await SecureStore.setItemAsync("textcolor", Deafaults.textColor);
          settxtColor(Deafaults.textColor);
        } else {
          settxtColor(loadedTextColor);
        }
      } catch (error) {
        console.error("Error loading variables from Secure Store:", error);
      } finally {
        // Hide the splash screen after loading

        SplashScreen.hideAsync();
      }
    };
    initializeDatabase();
    loadColors();
  }, []);
  useEffect(() => {
    SecureStoreModel.itemExists("pin").then((exists) => {
      if (exists) {
        setPinSet(true);
      }
    });
  }, [isPinSet]);
  useEffect(() => {
    SecureStoreModel.itemExists("username").then((exists) => {
      if (exists) {
        setUnameSet(true);
      }
    });
  }, [isUnameSet]);
  if (isUnameSet) {
    if (isPinSet) {
      return (
        <DContexts.Provider
          value={{
            changedsomething,
            setChangedSomething,
            opacitycolor,
            setOpacityColor,
            primarycolor,
            setPrimaryColor,
            cardcolor,
            bgcolor,
            setbgColor,
            setCardColor,
            txtcolor,
            settxtColor,
            setMyUname,
            myuname,
          }}
        >
          <NavigationContainer>
            <Stack.Navigator
              screenOptions={{
                headerStyle: {
                  marginTop:
                    Platform.OS === "ios" ? 0 : StatusBar.currentHeight,
                },
              }}
            >
              <Stack.Screen
                name="ValidatePin"
                component={ValidatePin}
                options={{ headerShown: false }}
              />
              <Stack.Screen
                name="HomeTabs"
                component={HomeTabs}
                options={{ headerShown: false }}
              />

              <Stack.Screen
                name="Diary"
                component={Diary}
                options={{ headerShown: false }}
              />
              <Stack.Screen
                name="Edit"
                component={Edit}
                options={{ headerShown: false }}
              />
              <Stack.Screen
                name="EditPin"
                component={EditPin}
                options={{ headerShown: false }}
              />
            </Stack.Navigator>
          </NavigationContainer>
        </DContexts.Provider>
      );
    } else {
      return (
        <DContexts.Provider
          value={{
            isPinSet,
            setPinSet,
            primarycolor,
            bgcolor,
          }}
        >
          <NavigationContainer>
            <Stack.Navigator>
              <Stack.Screen
                name="CreatePin"
                component={CreatePin}
                options={{ headerShown: false }}
              />
            </Stack.Navigator>
          </NavigationContainer>
        </DContexts.Provider>
      );
    }
  } else {
    return (
      <DContexts.Provider
        value={{
          isUnameSet,
          setUnameSet,
          myuname,
          setMyUname,
          primarycolor,
          bgcolor,
        }}
      >
        <NavigationContainer>
          <Stack.Navigator>
            <Stack.Screen
              name="EditUsername"
              component={EditUsername}
              options={{ headerShown: false }}
            />
          </Stack.Navigator>
        </NavigationContainer>
      </DContexts.Provider>
    );
  }
}
