import windToString from './windToString';
import {
    getDayName,
    getDayNumber,
    getMonthName
} from './dtToString';
import getIcon from './getMIcon';

function filterForecastData(data){
    let answer = [];
    let eIn = {};
    let eOu = {};
    let date = {};

    function getNewDay(dt){
        eOu.day = {};
        eOu.day.dayName = getDayName(dt);
        eOu.day.dayNumber = getDayNumber(dt);
        eOu.day.monthName = getMonthName(dt);
        eOu.weather = [];
    }

    function newItemHR(element, date){
        return {
            time: `${date.getHours()}:00`,
            temp: element.main.temp,
            tempMin: element.main.temp_min,
            tempMax: element.main.temp_max,
            humidity: element.main.humidity,
            feelsLike: element.main.feels_like,
            icon: getIcon(element.weather[0].icon),
            wind: windToString(element.wind),
            description: element.weather[0].description,
        }
    }

    function ifTime(date){
        return date.getHours() === 2 || date.getHours() === 8 || date.getHours() === 14 || date.getHours() === 20 ;
    }

    for(let i=0; i<data.length; i++){
        eIn = data[i];
        date = new Date(eIn.dt * 1000);

        if(eOu.day === undefined){
            getNewDay(date);
        }

        if(getDayName(date) === eOu.day.dayName){

            if(ifTime(date)){
                eOu.weather.push(newItemHR(eIn, date));
            }

        }else{
            answer.push(JSON.parse(JSON.stringify(eOu)));
            getNewDay(date);
            if(ifTime(date)){
                eOu.weather.push(newItemHR(eIn, date));
            }
        }

    }

    return answer
}

export default filterForecastData;
