import {
    weatherAppiKey
} from "./apiKey";

export function getUrlCurrenWeatherToCite(cityName) {
    return `https://api.openweathermap.org/data/2.5/weather?q=${cityName},UA&appid=${weatherAppiKey}&lang=ru&units=metric`
};

export function getUrlCurrentWeatherToCord(latitude, longitude) {
    return `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${weatherAppiKey}&lang=ru&units=metric`
}

export function getUrlFindCity(sity){
    return `https://api.openweathermap.org/geo/1.0/direct?q=${sity}&limit=10&appid=${weatherAppiKey}`
}

export function getUrl5DeyForecastToGeo(latitude, longitude){
    return `https://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&appid=${weatherAppiKey}&units=metric&lang=ru`
}
