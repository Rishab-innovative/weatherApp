let valueOfInput, description, input, temp, longitudeData, latitudeData;
console.log("hello");
const apiKey = "82005d27a116c2880c8f0fcb866998a0";
const api = () => {
  valueOfInput = document.getElementById("inputData").value;
  console.log("inpuuuuuuuuuut", valueOfInput);
  document.getElementById("icon").src = "loader.gif";
  fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=${valueOfInput}&appid=82005d27a116c2880c8f0fcb866998a0`
  )
    .then((response) => response.json())
    .then((data) => {
      input = data;
      document.getElementById("display").style.display = "block";
      document.getElementById("error").style.display = "none";
      console.log("alpha ddddd====>", input);
      icons(input);
      let t = parseFloat(input.main.temp - 273).toFixed(2);

      document.getElementById("temp").innerHTML = t + " °C";
      if (input.weather[0].description.includes("rain")) {
        console.log("-------rainging-----");
        document.getElementById("display").style.backgroundImage =
          "url('icons/rain.jpg')";
      } else if (input.weather[0].description.includes("cloud")) {
        console.log("-------clouds-----");
        document.getElementById("display").style.backgroundImage =
          "url('icons/cloud.jpg')";
      } else if (input.weather[0].description.includes("sky")) {
        console.log("-------clouds-----");
        document.getElementById("display").style.backgroundImage =
          "url('icons/sunny.jpeg')";
      } else {
        document.getElementById("display").style.backgroundImage = "none";
      }

      document.getElementById("description").innerHTML =
        input.weather[0].description;
      document.getElementById("city-country").innerHTML =
        input.name + " - " + input.sys.country;

      document.getElementById("description").innerHTML =
        input.weather[0].description;
    })
    .catch((err) => {
      console.log(err);
      document.getElementById("display").style.display = "none";
      document.getElementById("error").style.display = "block";
    });
};
const icons = (temp) => {
  document.getElementById("icon").src = "loader.gif";
  let iconCode = temp.weather[0].icon;
  console.log("iconcode---->", iconCode);
  let iconNumber = `icons/${iconCode}.png`;
  document.getElementById("icon").src = iconNumber;
};

function getCordinates() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
      (location) => {
        latitudeData = location.coords.latitude;
        longitudeData = location.coords.longitude;
        fetch(
          `https://api.openweathermap.org/data/2.5/weather?lat=${latitudeData}&lon=${longitudeData}&appid=82005d27a116c2880c8f0fcb866998a0`
        )
          .then((res) => res.json())
          .then((data) => {
            temp = data;
            console.log("val of temp--->", temp);
            icons(temp);
            let celciusTemperature = temp.main.temp - 273;
            let tempData = parseFloat(celciusTemperature).toFixed(2);

            document.getElementById("temp").innerHTML = tempData + "°c";

            document.getElementById("description").innerHTML =
              temp.weather[0].description;

            document.getElementById("city-country").innerHTML =
              temp.name + " - " + temp.sys.country;

            document.getElementById("description").innerHTML =
              temp.weather[0].description;
          })
          .catch((err) => console.log(err));
      },
      (err) => {
        console.warn("unable to fetch");
      }
    );
  } else {
    console.log("not find the if part");
  }
}
getCordinates();
