const axios = require('axios');
import {
    getUrlCurrenWeatherToCite,
    getUrlCurrentWeatherToCord,
    getUrlFindCity,
    getUrl5DeyForecastToGeo
} from "./function/getWether";
import {
    filterWetherData
} from "./function/filterWetherData";
import filterForecastData from './function/filterForecastData';

const vMethods = {
    pullCurentWeatherToSity(city) {

        return axios.get(getUrlCurrenWeatherToCite(city))
            .then((response) => {
                if (response.status === 200) {
                    this.currentWeather = filterWetherData(response.data);
                    this.location.city = response.data.name;

                    return new Promise((resolve, reject) => {
                        resolve(response);
                    })
                }
            })
    },

    pullCurentWeatherToGeo(latitude, longitude) {

        return axios.get(getUrlCurrentWeatherToCord(latitude, longitude))
            .then((response) => {
                if (response.status === 200) {
                    this.currentWeather = filterWetherData(response.data);
                    this.location.city = response.data.name;
                    this.location.latitude = response.data.coord.lat;
                    this.location.longitude = response.data.coord.lon;

                    return new Promise((resolve, reject) => {
                        resolve(response);
                    })
                }
            })
    },

    openFindCity(){
        this.findCity.show = true;
    },

    closeFindCity(){
        const self = this;
        this.findCity.show = false;
        self.findCity.cityList = [];
        self.inputData = '';

    },

    getCityList(){
        axios.get(getUrlFindCity(this.inputData))
        .then((response) => {
            this.findCity.cityList = response.data.map((element) => {
                let cityName = '';

                if (element.local_names.ru === undefined){
                    cityName = element.name;
                }else{
                    cityName = element.local_names.ru;
                }

                return {
                    cityName: cityName,
                    latitude: element.lat,
                    longitude: element.lon,
                };
            })
            this.findCity.search = false;

        })
    },

    resetCity(newCity){
        let activeForecast = false;
        let activeCurrentWeather =false;
        const self = this;

        function togleOnLoader(){
            if(self.showForecast){
                activeForecast = true;
                self.showForecast = false;
                self.showLoader = true;
            }else if(self.showCurrentWeather){
                activeCurrentWeather = true;
                self.showCurrentWeather = false;
                self.showLoader = true;
            }
        }

        function togleOffLoader(){
            if(activeForecast){
                self.showForecast = true;
                self.showLoader = false;
            }else if(activeCurrentWeather){
                self.showCurrentWeather = true;
                self.showLoader = false;
            }
        }

        self.flagActualDatta.currentWeather = false;
        self.flagActualDatta.forecast = false;

        const latitude = newCity.latitude;
        const longitude = newCity.longitude;

        togleOnLoader();

        if(activeCurrentWeather){
            self.pullCurentWeatherToGeo(latitude, longitude)
            .then((response) => {
                togleOffLoader();
                self.closeFindCity();
                self.flagActualDatta.currentWeather = true;
            })
        }else if(activeForecast){
            self.pullForecastTo5Dey(latitude, longitude)
            .then( () => {
                togleOffLoader();
                self.closeFindCity();
                self.flagActualDatta.forecast = true;
            })
        }

    },

    openForecast(){
        const self = this;

        if(!self.showForecast){
            self.showCurrentWeather = false;

            if(!self.flagActualDatta.forecast){

                self.pullForecastTo5Dey(self.location.latitude , self.location.longitude)
                .then(() => {
                    self.forecastShowFlag = 0;
                    self.showLoader = false;
                    self.showForecast = true;
                })
            }else{
                self.showForecast = true;
            }

        }

    },

    openCurrentWeather(){

        const self = this;

        if(!self.showCurrentWeather){
            self.showForecast = false;

            if(!self.flagActualDatta.currentWeather){
                self.showLoader = true;

                self.pullCurentWeatherToGeo(self.location.latitude , self.location.longitude)
                .then(() => {
                    self.showLoader = false;
                    self.showCurrentWeather = true;
                    self.flagActualDatta.currentWeather = true;
                })

            }else{
                self.showCurrentWeather = true;
            }
        }

    },

    pullForecastTo5Dey(latitude, longitude){
        const self = this;

        return axios.get(getUrl5DeyForecastToGeo(latitude, longitude))
            .then( (response) => {
                    return new Promise((resolve, reject) => {
                        if(response.status === 200){
                            self.forecastData = filterForecastData(response.data.list);
                            self.updateForecastList();
                            this.location.city = response.data.city.name;
                            this.location.latitude = response.data.city.coord.lat;
                            this.location.longitude = response.data.city.coord.lon;

                        }

                        resolve(response);
                    })
            })
    },

    updateForecastList(){
        let flag = this.forecastShowFlag;
        const maxLengthList = this.forecastData.length - 3;

        if(flag > maxLengthList){
            flag = maxLengthList
        }else if(flag < 0){
            flag = 0;
        }

        this.forecastShowFlag = flag;

        for(let i=0; i<3; i++){
            this.forecastShowList[i] = this.forecastData[flag];
            flag++
        }

        this.showForecast = false;
        this.showForecast = true;
    },

    forecastDayAhead(){
        this.forecastShowFlag = this.forecastShowFlag + 1;
    },

    forecastDayAgo(){
        this.forecastShowFlag = this.forecastShowFlag - 1;
    }


}


export default vMethods
