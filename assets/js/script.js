var historyEl = document.getElementById('history')
var infoEl = document.getElementById('info')
var forecastEl = document.getElementById('forecast')
var infoCityEl = document.getElementById('infoCity')
var infoCityTempEl = document.getElementById('infoCityTemp')
var infoCityWindEl = document.getElementById('infoCityWind')
var infoCityHumidityEl = document.getElementById('infoCityHumidity')
var infoCityUVEl = document.getElementById('infoCityUV')
var infoCityDateEl = document.getElementById('infoCityDate')
var day1El = document.getElementById('day1')
var day1DateEl = document.getElementById('day1Date')
var day1TempEl = document.getElementById('day1Temp')
var day1WindEl = document.getElementById('day1Wind')
var day1HumidityEl = document.getElementById('day1Humidity')

var day2El = document.getElementById('day2')
var day2DateEl = document.getElementById('day2Date')
var day2TempEl = document.getElementById('day2Temp')
var day2WindEl = document.getElementById('day2Wind')
var day2HumidityEl = document.getElementById('day2Humidity')

var day3El = document.getElementById('day3')
var day3DateEl = document.getElementById('day3Date')
var day3TempEl = document.getElementById('day3Temp')
var day3WindEl = document.getElementById('day3Wind')
var day3HumidityEl = document.getElementById('day3Humidity')

var day4El = document.getElementById('day4')
var day4DateEl = document.getElementById('day4Date')
var day4TempEl = document.getElementById('day4Temp')
var day4WindEl = document.getElementById('day4Wind')
var day4HumidityEl = document.getElementById('day4Humidity')

var day5El = document.getElementById('day5')
var day5DateEl = document.getElementById('day5Date')
var day5TempEl = document.getElementById('day5Temp')
var day5WindEl = document.getElementById('day5Wind')
var day5HumidityEl = document.getElementById('day5Humidity')

var position = 0


var saveHistory = function (cityName) {
    var history = document.createElement('button')
    history.setAttribute('id', position)
    history.setAttribute('onclick', 'search()')
    history.innerHTML = cityName
    historyEl.append(history)
    position++
}

var search = function () {
    var cityName = document.getElementById('searchInput').value
    if (history.innerHTML !== cityName) {
        saveHistory(cityName);
    }

    fetch('https:/api.openweathermap.org/data/2.5/weather?q=' + cityName + '&units=imperial&appid=badb9c4f8530c2fefd3cc2064d4f67c7')
        .then(function (response) {
            return response.json()
        })
        .then(function (data) {
            // console.log(data)
            var lat = data.coord.lat
            var lon = data.coord.lon




            fetch('https://api.openweathermap.org/data/2.5/onecall?lat=' + lat + '&lon=' + lon + '&units=imperial&appid=badb9c4f8530c2fefd3cc2064d4f67c7')
                .then(function (response) {
                    return response.json()
                })
                .then(function (data) {
                    console.log(data)

                    var iconC = 0

                    var iconChange = function () {
                        if (data.daily[iconC].weather[0].main === "Clear") {
                            var icon = "☀"
                            iconC++
                            return icon
                        } else if (data.daily[iconC].weather[0].main === "Clouds") {
                            var icon = "☁"
                            iconC++
                            return icon
                        } else if (data.daily[iconC].weather[0].main === "Rain") {
                            var icon = "🌧"
                            iconC++
                            return icon
                        } else {
                            var icon = "💦"
                            iconC++
                            return icon
                        }
                        
                    }


                    // Set up Current Day Info
                    infoCityEl.textContent = cityName
                    infoCityDateEl.textContent = " " + moment().format('MM-DD-YYYY')
                    infoCityTempEl.textContent = data.current.temp + ' °F'
                    infoCityWindEl.textContent = data.current.wind_speed + ' mph'
                    infoCityHumidityEl.textContent = data.current.humidity + '%'
                    infoCityUVEl.textContent = data.current.uvi
                    
                    // Set up 5 Day Forcast
                    // Day 1
                    day1DateEl.textContent = " " + moment().add(1, 'days').format('MM-DD-YYYY') + " " + iconChange()
                    day1TempEl.textContent = data.daily[0].temp.day + ' °F'
                    day1WindEl.textContent = data.daily[0].wind_speed + ' mph'
                    day1HumidityEl.textContent = data.daily[0].humidity + '%'

                    // Day 2
                    day2DateEl.textContent = " " + moment().add(2, 'days').format('MM-DD-YYYY') + " " + iconChange()        
                    day2TempEl.textContent = data.daily[1].temp.day + ' °F'
                    day2WindEl.textContent = data.daily[1].wind_speed + ' mph'
                    day2HumidityEl.textContent = data.daily[1].humidity + '%'

                    // Day 3
                    day3DateEl.textContent = " " + moment().add(3, 'days').format('MM-DD-YYYY') + " " + iconChange()
                    day3TempEl.textContent = data.daily[2].temp.day + ' °F'
                    day3WindEl.textContent = data.daily[2].wind_speed + ' mph'
                    day3HumidityEl.textContent = data.daily[2].humidity + '%'

                    // Day 4
                    day4DateEl.textContent = " " + moment().add(4, 'days').format('MM-DD-YYYY') + " " + iconChange()
                    day4TempEl.textContent = data.daily[3].temp.day + ' °F'
                    day4WindEl.textContent = data.daily[3].wind_speed + ' mph'
                    day4HumidityEl.textContent = data.daily[3].humidity + '%'

                    // Day 5
                    day5DateEl.textContent = " " + moment().add(5, 'days').format('MM-DD-YYYY') + " " + iconChange()
                    day5TempEl.textContent = data.daily[4].temp.day + ' °F'
                    day5WindEl.textContent = data.daily[4].wind_speed + ' mph'
                    day5HumidityEl.textContent = data.daily[4].humidity + '%'


                    // if for UV Color
                    if (data.current.uvi < 3) {
                        infoCityUVEl.removeAttribute('style')
                        console.log('test<3')
                        infoCityUVEl.style.backgroundColor = "green"
                        
                        
                    }
                    else if (data.current.uvi >= 3 && data.current.uvi < 6) {
                        infoCityUVEl.removeAttribute('style')
                        console.log('test<6')
                        infoCityUVEl.style.backgroundColor = "yellow"
                        
            
                    }
                    else if (data.current.uvi >= 6 && data.current.uvi < 8) {
                        infoCityUVEl.removeAttribute('style')
                        console.log('test<8')
                        infoCityUVEl.style.backgroundColor = "red"
                
            
                    }
                    else if (data.current.uvi >= 8 && data.current.uvi <11) {
                        infoCityUVEl.removeAttribute('style')
                        console.log('test<11')
                        infoCityUVEl.style.backgroundColor = "purple"
                        
            
                    }
                    else if (data.current.uvi >= 11) {
                        infoCityUVEl.removeAttribute('style')
                        console.log('test>11')
                        infoCityUVEl.style.backgroundColor = "blue"
                    
            
                    }
                    else {
                        infoCityUVEl.removeAttribute('style')
                        console.log('testAllElse')
                        infoCityUVEl.style.backgroundColor = "grey"
                    
                    }
                })
        })
}