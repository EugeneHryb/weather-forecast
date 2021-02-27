
const vWatch = {

    inputData(newValue, oldValue){

        if(this.findCity.show ){
            this.findCity.search = true;
            this.debounceFindCity();
        }
    },

    forecastShowFlag(newValue, oldValue){
        this.updateForecastList();
    }
}

export default vWatch;


// v-on:change = "resetSity"
