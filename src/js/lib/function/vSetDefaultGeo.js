const axios = require('axios');

function vSetDefaultGeo(){
    axios.get('https://api.ipgeolocation.io/ipgeo?apiKey=4969c2e7eb3249218b001bd058c1bade&fields=geo&lang=ru').then(
        (response) =>{
            console.log(response)
        }
    )
}

export default vSetDefaultGeo;
