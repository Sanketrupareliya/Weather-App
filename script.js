const getWeatherData = async (userInput) => {
    const cityArray = userInput.split(',');
    const city = cityArray[0];
    const url = 'https://api.openweathermap.org/data/2.5/weather?q=' +
        city +
        '&appid=1dd25a275ab8e06be3fd6801b43972dd';
    const response = await fetch(url);
    const data = await response.json();
    const weather = {
      location: data.name,
      description: data.weather[0].main,
      temp: Math.round(data.main.temp)+' °C',
      feelsLike: Math.round(data.main.feels_like) + '°C',
      wind: Math.round(data.wind.speed) + ' km/h',
      humidity: data.main.humidity + '% humidity',
    };
    return weather;
  };


document.getElementById("button").addEventListener("click", search);
function search() {
    const city = document.getElementById('address').value;
    update(getWeatherData(city))
}

const update = async (promise) => {
    const response = await promise;
    Promise.all([
      Promise.resolve(documentUp(response)),
    ])
  };

const documentUp = (weaob)=>{
    const ob=Object.keys(weaob)
    ob.forEach((key)=>{
      const DOM = document.getElementById(key);
      DOM.textContent =weaob[key]
    })
};
  
class render{
  constructor(){
    this.template=document.getElementById('templ');
    this.host=document.getElementById('main');

    const impor=document.importNode(this.template.content, true);
    this.ele=impor.firstElementChild;
    this.attach();
  }

  attach(){
    this.host.insertAdjacentElement('afterend', this.ele)
  }
}

const renders=new render();

