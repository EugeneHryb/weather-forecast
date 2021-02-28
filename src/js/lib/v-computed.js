import tempToCelsium from './function/tempToCelsium';

export const vComputed = {

    getBgApp(){

        if(this.currentWeather.weather !== undefined){
            const icon = this.currentWeather.weather.icon;
            return {
                page_clear: icon === '01d' || icon === '01n',
                page_cloudy: icon !== '01d' && icon !== '01n' && icon!=='11d' && icon !== '11n' && icon !== '02d' && icon !== '02n' && icon !== '10d' && icon !== '10n',
                page_storm: icon ==='11d' || icon === '11n',
                page_litleClouudy: icon === '02d' || icon === '02n' || icon === '10d' || icon === '10n',
            }
        }else {
            return {};
        }

    },

    ifCities(){
        return this.findCity.cityList.length > 0
    }
}
