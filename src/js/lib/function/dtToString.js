export function getDayName(dt) {

    const day = dt.getDay();

    switch (day) {
        case 1:
            return 'Понедельник';
        case 2:
            return 'Вторник';
        case 3:
            return 'Среда';
        case 4:
            return 'Четрверг';
        case 5:
            return 'Пятница';
        case 6:
            return 'Субота';
        case 0:
            return 'Воскресение';
    }

}

export function getDayNumber(dt) {

    return dt.getDate() < 10 ? '0' + dt.getDate() : dt.getDate();

}

export function getMonthName(dt) {

    const month = dt.getMonth();

    switch (month) {
        case 0:
            return 'Января';
        case 1:
            return 'Февраля';
        case 2:
            return 'Марта';
        case 3:
            return 'Апреля';
        case 4:
            return 'Майя';
        case 5:
            return 'Июня';
        case 6:
            return 'Июля';
        case 7:
            return 'Августа';
        case 8:
            return 'Сентября';
        case 9:
            return 'Октября';
        case 10:
            return 'Ноября';
        case 11:
            return 'Декабря';
    }

}
