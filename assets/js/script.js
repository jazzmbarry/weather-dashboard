var historyEl = document.getElementById('history')
var infoEl = document.getElementById('info')
var forecastEl = document.getElementById('forecast')
var today = moment().format('MM-DD-YYYY')
// console.log(today)
var tomorrow = moment().add(1,'days').format('MM-DD-YYYY')
// console.log(tomorrow)
position = 0

var saveHistory = function(cityName){
    var history = document.createElement('button')
    history.setAttribute('id', position)
    history.setAttribute('onclick', 'search()')
    history.innerHTML = cityName
    historyEl.append(history)
    position++
}

var search = function (){
    var cityName = document.getElementById('searchInput').value
    if (history.innerHTML !== cityName){
        saveHistory(cityName);
    }

    fetch('https:/api.openweathermap.org/data/2.5/weather?q='+ cityName +'&units=imperial&appid=badb9c4f8530c2fefd3cc2064d4f67c7')
    .then(function(response) {
    return response.json()
    })
    .then(function(data) {
    var lat = data.coord.lat
    var lon = data.coord.lon
    
    fetch('https://api.openweathermap.org/data/2.5/onecall?lat=' + lat + '&lon=' + lon + '&units=imperial&appid=badb9c4f8530c2fefd3cc2064d4f67c7')
    .then(function(response) {
    return response.json()
    })
    .then(function(data) {
    console.log(data)
    })

    })


}