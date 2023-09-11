let valueOfInput,
  description,
  temp,
  longitudeData,
  latitudeData,
  iconCode,
  fetchedData;
console.log("hello");
const apiKey = "82005d27a116c2880c8f0fcb866998a0";

const apiData = async (data) => {
  let url =
    typeof data === "string"
      ? `https://api.openweathermap.org/data/2.5/weather?q=${data}&appid=${apiKey}`
      : `https://api.openweathermap.org/data/2.5/weather?lat=${data[0]}&lon=${data[1]}&appid=${apiKey}`;
  const response = await fetch(url);
  const fetchedData = await response.json();
  return fetchedData;
};

const api = async (data) => {
  try {
    valueOfInput = document.getElementById("inputData").value;
    const data = await apiData(valueOfInput);
    document.getElementById("icon").src = "loader.gif";
    document.getElementById("display").style.display = "block";
    document.getElementById("error").style.display = "none";
    console.log("alpha ddddd====>", data);
    let celciusTemperature = parseFloat(data.main.temp - 273).toFixed(2);
    document.getElementById("temp").innerHTML = celciusTemperature + " °C";

    document.getElementById("icon").src = "loader.gif";
    iconCode = data.weather[0].icon;
    document.getElementById("icon").src = `icons/${iconCode}.png`;

    description = data.weather[0].description;
    description.includes("rain")
      ? (document.getElementById("display").style.backgroundImage =
          "url('icons/rain.jpg')")
      : description.includes("cloud")
      ? (document.getElementById("display").style.backgroundImage =
          "url('icons/cloud.jpg')")
      : description.includes("sky")
      ? (document.getElementById("display").style.backgroundImage =
          "url('icons/sunny.jpeg')")
      : (document.getElementById("display").style.backgroundImage = "none");

    document.getElementById("description").innerHTML = description;
    document.getElementById("city-country").innerHTML =
      data.name + " - " + data.sys.country;
  } catch (err) {
    console.log(err);
    document.getElementById("display").style.display = "none";
    document.getElementById("error").style.display = "block";
  }
};

const getCordinates = () => {
  let locationArray = [];
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(async (location) => {
      latitudeData = location.coords.latitude;
      longitudeData = location.coords.longitude;
      locationArray.push(latitudeData);
      locationArray.push(longitudeData);

      const data = await apiData(locationArray);
      console.log("-----apidata-----", data);
      document.getElementById("icon").src = "loader.gif";
      iconCode = data.weather[0].icon;
      document.getElementById("icon").src = `icons/${iconCode}.png`;
      let celciusTemperature = data.main.temp - 273;
      let tempData = parseFloat(celciusTemperature).toFixed(2);

      document.getElementById("temp").innerHTML = tempData + "°c";

      document.getElementById("description").innerHTML =
        data.weather[0].description;

      document.getElementById("city-country").innerHTML =
        data.name + " - " + data.sys.country;

      document.getElementById("description").innerHTML =
        data.weather[0].description;
    });
  } else {
    console.log("not find the if part");
  }
};
getCordinates();
