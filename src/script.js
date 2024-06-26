function updateTime() {
  let losAngelesElement = document.querySelector("#los-angeles");
  if (losAngelesElement) {
    let losAngelesDateElement = document.querySelector("#dateLA");
    let losAngelesTimeElement = document.querySelector("#timeLA");
    losAngelesDateElement.innerHTML = moment()
      .tz("America/Los_Angeles")
      .format("MMMM Do YYYY");
    losAngelesTimeElement.innerHTML = moment()
      .tz("America/Los_Angeles")
      .format("h:mm:ss [<small>]A[</small>]");
  }

  let parisElement = document.querySelector("#paris");
  if (parisElement) {
    let parisDateElement = document.querySelector("#dateParis");
    let parisTimeElement = document.querySelector("#timeParis");
    parisDateElement.innerHTML = moment()
      .tz("Europe/Paris")
      .format("MMMM Do YYYY");
    parisTimeElement.innerHTML = moment()
      .tz("Europe/Paris")
      .format("h:mm:ss [<small>]A[</small>]");
  }
}

updateTime();

let intervalID = setInterval(updateTime, 1000);

function updateCity(event) {
  clearInterval(intervalID);
  let cityTimeZone = event.target.value;
  let yourTimeZone = moment.tz.guess();
  let citiesElement = document.querySelector("#cities");

  if (cityTimeZone === "local") {
    function localCityFunction() {
      let cityName = yourTimeZone.split("/")[1].replace("_", " ");
      let cityTime = moment().tz(yourTimeZone);
      citiesElement.innerHTML = `
          <div class="city">
            <div>
              <h2>${cityName}</h2>
              <div class="date">${cityTime.format("MMMM Do YYYY")}</div>
            </div>
            <div class="time">${cityTime.format(
              "h:mm:ss [<small>]A[</small>]"
            )}</div>
          </div>
          <a id="allcities" href="index.html">All cities</a>`;
    }
    localCityFunction();
    intervalID = setInterval(localCityFunction, 1000);
  } else if (cityTimeZone !== "") {
    let cityName = cityTimeZone.split("/")[1].replace("_", " ");
    function selectedCityFunction() {
      let cityTime = moment().tz(cityTimeZone);
      citiesElement.innerHTML = `
          <div class="city">
            <div>
              <h2>${cityName}</h2>
              <div class="date">${cityTime.format("MMMM Do YYYY")}</div>
            </div>
            <div class="time">${cityTime.format(
              "h:mm:ss [<small>]A[</small>]"
            )}</div>
          </div>
          <a id="allcities" href="index.html">All cities</a>`;
    }
    selectedCityFunction();
    intervalID = setInterval(selectedCityFunction, 1000);
  } else {
    citiesElement.innerHTML = `
          <div class="city" id="los-angeles">
            <div>
              <h2>Los Angeles</h2>
              <div class="date" id="dateLA"></div>
            </div>
            <div class="time" id="timeLA"></div>
          </div>
          <div class="city" id="paris">
            <div>
              <h2>Paris</h2>
              <div class="date" id="dateParis"></div>
            </div>
            <div class="time" id="timeParis"></div>
          </div>
        </div>
      </div>`;
    updateTime();
    intervalID = setInterval(updateTime, 1000);
  }
}

let citiesSelect = document.querySelector("#selectCity");
citiesSelect.addEventListener("change", updateCity);
