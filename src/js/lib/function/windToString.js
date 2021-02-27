function windToString(wind){
    let answer = '';
    let deg = wind.deg;

    if( deg > 337.5 || deg <= 22.5){
        answer = 'северный';
    }else if(deg > 22.5 && deg <= 67.5){
        answer = 'северо-восточный';
    }else if(deg > 67.5 && deg <= 112.5){
        answer = 'восточный';
    }else if(deg > 112.5 && deg <= 157.5){
        answer = 'юго-восточный';
    }else if(deg > 157.5 && deg <= 202.5){
        answer = 'южный';
    }else if(deg > 202.5 && deg <= 247.5){
        answer = 'юго-западный';
    }else if(deg > 247.5 && deg <= 292.5){
        answer = 'западный';
    }else if(deg > 292.5 && deg <= 337.5){
        answer = 'северо-западный';
    }

    answer = answer + ' ' + wind.speed;


    return answer;
}

export default windToString;
