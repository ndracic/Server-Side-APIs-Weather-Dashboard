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

