let key = '640a83e1973db525d8014b10ebf30875'

let userCity = "";

var currentWeather = function (userCity) {

  let apiURL = `https://api.openweathermap.org/data/2.5/forecast?q=${userCity}&appid=`+ key;
  
  fetch(apiURL)
    .then(function (response) {
      return response.json();
    })

    .then(function (data) {
      if (data.cod !== '200') {
        console.log('Error');
        return;
      }
    })
}

