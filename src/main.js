const urlw = "api.openweathermap.org/data/2.5/weather?q=Starokostiantyniv,ua&APPID=bca033875e504a8fddfd1c4a1afc9237"

var input = document.querySelector('.input_text');
var main = document.querySelector('#name');
var temp = document.querySelector('.temp');
var desc = document.querySelector('.desc');
var clouds = document.querySelector('.clouds');
var button= document.querySelector('.submit');

function fetching(){
  fetch('https://api.openweathermap.org/data/2.5/weather?q='+input.value+'&appid=bca033875e504a8fddfd1c4a1afc9237')
    .then(response => response.json())
    .then(data => {
      console.log(data);
      main.innerHTML = data['name'];
      desc.innerHTML = "Weather: " + data['weather'][0]['description'];
      temp.innerHTML = "Temp: " + Math.round(data['main']['temp'] - 272.15) + "<hr> Feels like: " + Math.round(data['main']['feels_like'] - 272.15) + "<hr> max: " + Math.round(data['main']['temp_max'] - 272.15) + "<hr> min: " + Math.round(data['main']['temp_min'] - 272.15) ;
      input.value ="";
})

.catch(err => alert("Wrong city name!"));
}





fetching();
button.addEventListener('click', function(name){
  fetching();
})