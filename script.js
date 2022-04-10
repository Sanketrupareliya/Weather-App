const getWeatherData = async (userInput) => {
    const cityArray = userInput.split(' ');
    const city = cityArray[0];
    const url = 'https://api.openweathermap.org/data/2.5/weather?q=' +
        city +
        '&appid=1dd25a275ab8e06be3fd6801b43972dd';
    const response = await fetch(url).catch(error=>{alert(error)});
    const data = await response.json();
    console.log(data)
    if(data.base==undefined){
      var myModal = new bootstrap.Modal(document.getElementById('myModal'), {
        keyboard: false
      })
      myModal.show()
    }
    const weather = {
      location: data.name,
      description: data.weather[0].main,
      temp: Math.round((data.main.temp-273.15))+' °C',
      feelsLike: Math.round((data.main.feels_like-273.15)) + '°C',
      wind: Math.round(data.wind.speed) + ' km/h',
      humidity: data.main.humidity + '%',
      pressure: data.main.pressure + ' hPa',
      Visibility: (data.visibility)/1000 + ' km' 
    };
    setbackground(weather)
    return weather;
  };


const setbackground= weather=>{
  console.log(weather.description)
  switch(weather.description){
    case 'Clear':
      document.body.style.backgroundImage ="url(./img/clear.jpg)"
      break;
    case 'Clouds':
      document.body.style.backgroundImage ="url(./img/Cloudy.jpg)"
      break;
  }
}

document.getElementById("button").addEventListener("click", search);
function search() {
    const city = document.getElementById('address').value;
    if(address.value.length==0){
      matchList.innerHTML='';
      matchList.style.display="none";
    }
    update(getWeatherData(city))
}



const searc=document.getElementById('address');
const matchList=document.getElementById('match-list');


const searchStates= async searchText=>{
  const res = await fetch('./cities.json');
  const data = await res.json();

  let matches=data.filter(state=>{
    const regx=new RegExp(`^${searchText}`,'gi');
    return state.name.match(regx) ;
  });

  if(searchText.length ==0){
    matches=[];
    matchList.style.display="none";
    matchList.innerHTML='';
  }

  outputHtml(matches);
};

const outputHtml=matches=>{
  if(matches.length>0){
    const html=matches.map(match=>`
    <div class='card card-body my-1' style='width: 155px; cursor: pointer; margin-right: 0px;'> 
      <div>${match.name}</div>
    </div>
    `).join('');
    matchList.innerHTML=html;
    matchList.style.display="block";
    matchList.addEventListener("click",function(e){
      if(e.path[0].textContent.length<15 && e.path[0].textContent.length>0){
        address.value=e.path[0].textContent;
        search()
        matchList.innerHTML='';
        matchList.style.display="none";
      }
    })
  }
}

searc.addEventListener('input',()=>{searchStates(searc.value)})



const update = async (promise) => {
    const response = await promise;
    Promise.all([
      Promise.resolve(documentUp(response)),
    ])
  };

const documentUp = (weaob)=>{
    const ob=Object.keys(weaob)
    if (c==0){
      const renders=new render();
      c+=1;
    }
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

let c=0;

