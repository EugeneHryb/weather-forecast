import windToString from './windToString';
import {
    getDayName,
    getDayNumber,
    getMonthName
} from './dtToString';
import getIcon from './getMIcon';

export function filterWetherData(inputObj) {
    const answer = {};
    const date = new Date(inputObj.dt * 1000);

    answer.main = inputObj.main
    answer.weather = inputObj.weather[0];
    answer.wind = windToString(inputObj.wind);
    answer.dt = {
            dt: date,
            dayName: getDayName(date),
            dayNumber: getDayNumber(date),
            monthName: getMonthName(date),
        },
    answer.mIcon = getIcon(inputObj.weather[0].icon);

    return answer;
}
