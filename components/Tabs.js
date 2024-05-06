import React, { useContext } from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Home from "../screens/Home";
import Add from "../screens/Add";
import Settings from "../screens/Settings";
import { Feather, Ionicons } from "@expo/vector-icons";
import { View } from "react-native";
import { DContexts } from "../contexts/DContexts";

const Tab = createBottomTabNavigator();
export default function HomeTabs() {
  const { primarycolor } = useContext(DContexts);
  const { bgcolor } = useContext(DContexts);
  const { cardcolor } = useContext(DContexts);
  return (
    <View style={{ backgroundColor: bgcolor, flex: 1 }}>
      <Tab.Navigator
        screenOptions={{
          headerShown: false,
          tabBarShowLabel: false,
          tabBarActiveTintColor: primarycolor,
          tabBarStyle: {
            postion: "absolute",
            bottom: 25,
            marginRight: 10,
            marginLeft: 10,
            elevation: 10,
            borderRadius: 15,
            height: 70,
            backgroundColor: cardcolor,
            borderTopWidth: 0,
          },
        }}
      >
        <Tab.Screen
          name="Home"
          component={Home}
          options={{
            tabBarLabel: "Home",
            tabBarIcon: ({ color, size }) => (
              <Feather name="home" color={color} size={size} />
            ),
          }}
        />
        <Tab.Screen
          name="Add"
          component={Add}
          options={{
            tabBarLabel: "Add",
            tabBarIcon: ({ size }) => (
              <View
                style={{
                  top: -30,
                  width: 70,
                  height: 70,
                  borderRadius: 35,
                  backgroundColor: primarycolor,
                  justifyContent: "center",
                  alignItems: "center",
                  elevation: 10,
                }}
              >
                <Ionicons name="pencil" color="#ffffff" size={size} />
              </View>
            ),
          }}
        />
        <Tab.Screen
          name="settings"
          component={Settings}
          options={{
            tabBarLabel: "Settings",
            tabBarIcon: ({ color, size }) => (
              <Feather name="settings" color={color} size={size} />
            ),
          }}
        />
      </Tab.Navigator>
    </View>
  );
}
