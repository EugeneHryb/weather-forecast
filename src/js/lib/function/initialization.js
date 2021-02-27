import {
    ipAppiKey
} from "./apiKey";
const axios = require('axios');


function initialization(self) {
    self.showLoader = true;
    let city = self.city;

    function getPositionToUser() {

        return new Promise((resolve, reject) => {

            function success(position) {
                resolve({
                    status: false,
                    latitude: position.coords.latitude,
                    longitude: position.coords.longitude,
                })
            }

            function error() {
                return reject(false);
            }

            if (!navigator.geolocation) {
                reject(false);
            } else {
                navigator.geolocation.getCurrentPosition(success, error)
            }
        })
    }

    function endPullCurentWeather(response) {
        self.location.latitude = response.data.coord.lat;
        self.location.longitude = response.data.coord.lon;
        self.showLoader = false;
        self.showCurrentWeather = true;
        self.flagActualDatta.currentWeather = true;
    }

    getPositionToUser()
        .then((cord) => {
            self.pullCurentWeatherToGeo(cord.latitude, cord.longitude)
                .then((response) => {
                    endPullCurentWeather(response)
                })
        }).catch(() => {
            axios.get(' https://api.2ip.ua/geo.json?ip=')
                .then((response) => {
                    if (response.status === 200) {
                        self.location.countryCode = response.data.country_code;
                        city = response.data.city;
                    }

                    self.pullCurentWeatherToSity(city)
                        .then((response) => {
                            endPullCurentWeather(response);
                        })
                }).catch((error) => {

                    axios.get(`https://api.ipgeolocation.io/ipgeo?apiKey=${ipAppiKey}&lang=ru`).
                    then((response) => {
                        if (response.status === 200) {
                            self.location.countryCode = response.data.country_code2
                            city = response.data.city;

                            self.pullCurentWeatherToSity(city)
                                .then((response) => {
                                    endPullCurentWeather(response);
                                })
                        }
                    })
                })

        })

}

export default initialization;
