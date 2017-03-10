
function getRandomCity(){
  var cities = ['Paris', 'Helsinki', 'Dublin', 'London', 'Madrid', 'Berlin', 'Oslo', 'Brussels', 'Stockholm', 'Prague']
  var index = Math.floor((Math.random() * cities.length));
  return cities[index]
}

function getHour(city){
    var date = (new Date()).toLocaleString([], {timeZone: 'Europe/Paris'})
    var hours = date.slice(date.indexOf(':')-2, date.indexOf(':'))
    return hours
}

function getMins(city){
    var date = (new Date()).toLocaleString([], {timeZone: 'Europe/Paris'})
    var mins = date.slice(date.indexOf(':')+1, date.indexOf(':')+3)
    return mins
}


function getWeather(city){

  var api_key = "ca497744dd7e223818739a6983555d61"
  var api_point = "http://api.openweathermap.org/data/2.5/weather?q="+city+"&APPID="


  $.get( api_point+api_key, function(data){
    var cityName = data.name
    var tempKelvin = data.main.temp
    var tempCelcius = Math.round(tempKelvin-273.15)
    var weather = data.weather[0].main



    document.querySelector("#title").innerHTML = "<b>"+cityName+"</b> "+ getHour(cityName)+":"+getMins(cityName)
    document.querySelector("#descr").innerHTML = "Temperature: <b>"+tempCelcius+"°C</b>, "+weather


    var q = cityName+" city "+weather
    if (getHour(cityName)>20 || getHour(cityName)<8) {
      q+=" night"
    } else {
      q+=" day"
    }
    console.log(q)
    var cx = "001308167617373275063:cri02evdkiu"
    var apiKey = "AIzaSyCUwqvQF5VbXJgJ1wudIbtk7mEEJMwkx9s"
    var urlBingSearch = "https://api.cognitive.microsoft.com/bing/v5.0/images/search?size=Wallpaper&q="

    $.ajax({
      url: urlBingSearch+q,
      type: "GET",
      beforeSend: function(xhr){
        xhr.setRequestHeader('Content-Type', 'multipart/form-data');
        xhr.setRequestHeader('Ocp-Apim-Subscription-Key', '14d9d50265d4433c83d7c07a1d6d6474');
      },
      success: function(data){
        img_url = data.value[0].contentUrl
        document.querySelector("#pic").src = img_url
      }
    })
  });

}

var city = getRandomCity()
getWeather(city)
