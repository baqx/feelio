import React, { useContext, useEffect, useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import ShimmerPlaceholder from "react-native-shimmer-placeholder";
import { fetchWeatherData } from "../api/weatherAPI";
import { getCurrentLocation } from "../utils/location";
import { DContexts } from "../contexts/DContexts";
import { LinearGradient } from "expo-linear-gradient";
const Dashboard = () => {
  const [weatherData, setWeatherData] = useState(null);
  const [locationData, setLocationData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const { primarycolor, opacitycolor } = useContext(DContexts);

  useEffect(() => {
    getCurrentLocation()
      .then(({ latitude, longitude }) => {
        fetchWeatherData(latitude, longitude)
          .then((data) => {
            setWeatherData(data.current);
            setLocationData(data.location);
            setIsLoading(false); // Data has loaded, stop loading
          })
          .catch((error) => {
            console.error("Error fetching weather data:", error);
            setIsLoading(false); // Stop loading on error
          });
      })
      .catch((error) => {
        console.error("Error getting current location:", error);
        setIsLoading(false); // Stop loading on error
      });
  }, []);

  return (
    <LinearGradient
      // Background Linear Gradient
      colors={[primarycolor, opacitycolor, primarycolor]}
      style={{ ...styles.dashboard }}
    >
      <View style={{ justifyContent: "center", borderRadius: 10 }}>
        <View style={styles.dashboard_up}>
          <Text style={styles.dashboard_up_text1}>Today</Text>
          {isLoading ? (
            <ShimmerPlaceholder style={styles.shimmerText} />
          ) : (
            <Text style={styles.dashboard_up_text2}>
              {locationData.localtime.split(" ")[0]}
            </Text>
          )}
        </View>

        {isLoading ? (
          <ShimmerPlaceholder style={styles.shimmerText} />
        ) : (
          <Text style={styles.dashboard_temp}>{weatherData.temp_c}°C</Text>
        )}

        <View
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "flex-end",
          }}
        >
          {isLoading ? (
            <ShimmerPlaceholder style={styles.shimmerText} />
          ) : (
            <Text style={styles.dashboard_up_text2}>
              {locationData.name}, {locationData.region}, {locationData.country}
            </Text>
          )}
        </View>
      </View>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  dashboard: {
    padding: 5,
    margin: 25,
    marginTop: 10,
    borderRadius: 20,
    color: "white",
    justifyContent: "space-between",
    elevation: 10,
  },
  dashboard_up: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  dashboard_up_text1: {
    color: "#f2f2f2",
    fontSize: 17,
    fontWeight: "bold",
    margin: 5,
  },
  dashboard_up_text2: {
    color: "#f2f2f2",
    fontSize: 12,
    margin: 3,
  },
  dashboard_temp: {
    fontSize: 35,
    fontWeight: "bold",
    margin: 3,
    color: "#ffffff",
  },
  shimmerText: {
    width: "30%",
    height: 18,
    borderRadius: 5,
    marginVertical: 5,
    opacity: 6,
  },
});

export default Dashboard;
