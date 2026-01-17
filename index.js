// API Key
const API_KEY = "168771779c71f3d64106d8a88376808a";

const userTab = document.querySelector("[data-userWeather]");
const searchTab = document.querySelector("[data-searchWeather]");
const searchForm=document.querySelector("[data-searchForm]");
const searchInput=document.querySelector("[data-searchInput]");
const grantLocationContainer=document.querySelector(".grantLocationContainer");
const grantAccessBtn=document.querySelector("[data-grantAccess]");
const loadingContainer=document.querySelector(".loadingContainer");
const userInfoContainer=document.querySelector(".userInfoContainer");
const errorContainer=document.querySelector(".errorContainer");
const errorBtn = document.querySelector('[data-errorButton]');
const errorText = document.querySelector('[data-errorText]');
const errorImage = document.querySelector('[data-errorImg]');


let currentTab=userTab;
currentTab.classList.add("currentTab");
getFromSessionStorage();

function switchTab(clickedTab){
    errorContainer.classList.remove("active");
    if(clickedTab!=currentTab){
        currentTab.classList.remove("currentTab");
        currentTab=clickedTab;
        currentTab.classList.add("currentTab");

        if(!searchForm.classList.contains("active")){
            searchForm.classList.add("active");
            userInfoContainer.classList.remove("active");
            grantLocationContainer.classList.remove("active");
        }
        else{
            searchForm.classList.remove("active");
            userInfoContainer.classList.remove("active");
            getFromSessionStorage();
        }
    }
}

userTab.addEventListener("click", () => { switchTab(userTab) });
searchTab.addEventListener("click", () => { switchTab(searchTab) });

function getFromSessionStorage(){
    const localCoordinates=sessionStorage.getItem("userCoordinates");

    if(!localCoordinates){
        grantLocationContainer.classList.add('active');
    }
    else{
        const coordinates=JSON.parse(localCoordinates);
        fetchWeatherInfo(coordinates);
    }
}

async function fetchWeatherInfo(coordinates){
    const {lat, lon}=coordinates;

    grantLocationContainer.classList.remove("active");
    loadingContainer.classList.add("active");

    try{
        const response=await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`); 
        const data=await response.json();
        
        if(!data?.sys){
            throw data;
        }

        loadingContainer.classList.remove("active");
        userInfoContainer.classList.add("active");
        renderWeatherInfo(data);
    }
    catch(e){
        loadingContainer.classList.remove("active");
        errorContainer.classList.add("active");
        errorText.innerText = `Error: ${e?.message}`;
        errorBtn.style.display = 'block';
    }
}

function renderWeatherInfo(weatherInfo){
    const cityName=document.querySelector('[data-cityName]');
    const countryFlag=document.querySelector('[data-countryFlag]');
    const description=document.querySelector('[data-weatherDesc]');
    const weatherIcon=document.querySelector('[data-weatherIcon]');
    const temp=document.querySelector('[data-temp]');
    const windspeed=document.querySelector('[data-windspeed]');
    const humidity=document.querySelector('[data-humidity]');
    const clouds=document.querySelector('[data-clouds]');

    cityName.innerText=weatherInfo?.name;
    countryFlag.src=`https://flagcdn.com/144x108/${weatherInfo?.sys?.country.toLowerCase()}.png`;
    description.innerText=weatherInfo?.weather?.[0]?.description;
    weatherIcon.src=`http://openweathermap.org/img/w/${weatherInfo?.weather?.[0]?.icon}.png`;
    temp.innerText=`${weatherInfo?.main?.temp.toFixed(2)} °C`;
    windspeed.innerText=`${weatherInfo?.wind?.speed.toFixed(2)} m/s`;
    humidity.innerText=`${weatherInfo?.main?.humidity.toFixed(2)} %`;
    clouds.innerText=`${weatherInfo?.clouds?.all.toFixed(2)} %`;
}

function getLocation() {
    if(navigator.geolocation){
        navigator.geolocation.getCurrentPosition(showPosition);
    }
    else{
        grantAccessBtn.style.display='none';
    }
}

function showPosition(position){
    const userCoordinates={
        lat: position.coords.latitude,
        lon: position.coords.longitude
    };
    sessionStorage.setItem("userCoordinates", JSON.stringify(userCoordinates));
    fetchWeatherInfo(userCoordinates);
}

grantAccessBtn.addEventListener('click', getLocation);

searchForm.addEventListener("submit", (e) => {
    e.preventDefault();

    let city=searchInput.value;

    if(city==="") return;
    else fetchSearchWeatherInfo(city);
});

async function fetchSearchWeatherInfo(city){
    loadingContainer.classList.add("active");
    userInfoContainer.classList.remove("active");
    grantLocationContainer.classList.remove("active");
    errorContainer.classList.remove("active");

    try{
        const response=await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`); 
        const data=await response.json();
        
        if(!data?.sys){
            throw data;
        }

        loadingContainer.classList.remove("active");
        userInfoContainer.classList.add("active");
        renderWeatherInfo(data);
    }
    catch(e){
        loadingContainer.classList.remove("active");
        errorContainer.classList.add("active");
        errorText.innerText = `Error: ${e?.message}`;
        errorBtn.style.display = 'block';
    }
}

