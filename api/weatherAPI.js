import axios from "axios";

export const fetchWeatherData = async (latitude, longitude) => {
  try {
    const apiKey = "2c2ce9bd28fb4953b0c160642240405"; // Replace with your API key
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
