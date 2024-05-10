import axios from "axios";

export const fetchWeatherData = async (latitude, longitude) => {
  try {
    const apiKey = "YOUR_KEY"; // Replace with your API key
    const response = await axios.get(
      `https://api.weatherapi.com/v1/current.json`,
      {
        params: {
          key: apiKey,
          q: `Lagos`,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.log("Error fetching weather data:", error);
  }
};
