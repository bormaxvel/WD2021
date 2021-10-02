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
/////-------------------------------------------------------------------------
let lst = document.querySelector('.list');
let lels = ""
function fetching2(){
  fetch('https://jsonplaceholder.typicode.com/posts')
    .then(response => response.json())
    .then(ldata => {
      console.log(ldata);
      for (let i = 0; i < 5; i++) {
        let l = ldata[i]
        lels += "<li><b>" + l.id + ") Bug: </b>" + l.title + "<br><b>How to fix: </b>" + l.body + "<br>"
      }
      lst.innerHTML = lels
})}




fetching2()






/////-------------------------------------------------------------------------
var tbl = document.querySelector('.table');
var tablecontent = ""
element = document.querySelector("tbtn");
console.log(element)
function fetching3(){
  fetch('data.json')
    .then(response => response.json())
    .then(tdata => {
      console.log(tdata);
      for (let i = 0; i < 4; i++) {
        tablecontent += "<tr><td>" + tdata[i].name + "</td><td>" + tdata[i].price + "</td><td>" + tdata[i].quantity + "</td></tr>"
      }
      tbl.innerHTML = "<tr><th>Name</th><th>Price</th><th>Quantity</th></tr>" + tablecontent;
      
})}

fetching3()