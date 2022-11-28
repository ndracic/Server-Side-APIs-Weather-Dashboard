var key = '640a83e1973db525d8014b10ebf30875'

var userCity = "";

var currentWeather = function (userCity) {

  var apiURL = `https://api.openweathermap.org/data/2.5/forecast?q=${userCity}&appid=`+ key;
  
  fetch(apiURL)
    .then(function (response) {
      return response.json();
    })

    .then(function (data) {
      if (data.cod !== '200') {
        console.log('Error');
        return;
      }
      Coordinants(data.city.coord.lat, data.city.coord.lon);
    })
    .catch(err => console.log(err));
};

var searchedCity = JSON.parse(localStorage.getItem('City')) || [];

    for (var i = 0; i < searchedCity.length; i++) {
        var historyButton = document.createElement('button');
        historyButton.setAttribute('class', 'userCities');
        historyButton.textContent = searchedCity[i];
        $('#searchedCity').append(historyButton); 
        searchedCitiesButton();
};

function searchedCitiesButton() {

    var searchedCityButton = document.querySelectorAll('.userCity');
    searchedCityButton.forEach(function (buttons) {
      buttons.addEventListener('click', function (examp) {
        userCity = examp.target.innertext;
  
        currentWeather(userCity);
      });
    });
};
  
  var searchButton = document.getElementById('searchButton');
    searchButton.addEventListener('click', () => {
      userCity = $("#usersCity").val();

      currentWeather(userCity);
      searchedCity.push(userCity);
  
  var cityButton = document.createElement('button');
    cityButton.setAttribute('class', 'userCities');
    cityButton.textContent = userCity;
      $('#searchedCity').append(cityButton);
  
    localStorage.setItem('City', JSON.stringify(searchedCity));
    searchedCitiesButton();
    });

var Coordinants = function (lat, lon) {
    var conditionsAPI = 
      `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&appid=`+ key + `&units=imperial`
  
      // Fetch API
      fetch(conditionsAPI)
        .then(function (response) {
          return response.json();
        }) .then(function(data) {
            $('.date').html('<h6>' + userCity + '</h6>', date(data.daily[i]))
            $('.currentTemp').text('Current Temperature: ' + data.current.temp + ' ℉');
            $('.humidity').text('Humidity: ' + data.current.humidity + '%')
            $('.windMPH').text('Wind: ' + data.current.wind_speed + ' mph')
            $('.uvIndex').html('UV Index: ' + `<span class="btnColor">${data.current.uvi}</span`);
            if (data.current.uvi <= 2) {
              $('.btnColor').attr('class', 'btn btn-success');
            };
        
            if (data.current.uvi > 2 && data.current.uvi <= 5) {
              $('.btnColor').attr('class', 'btn btn-warning');
            };
        
            // > 5
            if (data.current.uvi > 5) {
              $('.btnColor').attr('class', 'btn btn-danger');
            };
            forecast(data);
          });
        };

var forecast = function (data) {
    $('.forecast').empty();
    for (let i = 1; i < 6; i++) {
  
      var day = $("<div class = 'day bg-color-light'><div />")
        $(day).append(date(data.daily[i].dt));
        $(day).append(`<img src="https://openweathermap.org/img/w/${data.daily[i].weather[0].icon}.png"/>`);
        $(day).append(`<p>Curr.Temp: ${data.daily[i].temp.day} ℉</p>`);
        $(day).append(`<p>Wind: ${data.daily[i].wind_speed} mph</p>`);
        $(day).append(`<p>Humidity: ${data.daily[i].humidity} % </p>`);
  
      $('.forecast').append(day)
    };
  }

  const date = function (time) {
    var currentDate = new Date();
    currentDate.setTime(time * 1000);
    //Get day as a number (1-31)
    var days = currentDate.getDate();
    //Get month as a number (0-11)
    var months = currentDate.getMonth() + 1;
    //Get year as a four digit number (yyyy)
    var year = currentDate.getFullYear();
    return months + '/' + days + '/' + year;
  }