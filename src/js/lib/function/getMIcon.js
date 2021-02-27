function getIcon(codIcon) {

    if (codIcon === '04n' || codIcon === '04d' || codIcon === '03n') {
        codIcon = '03d';
    }

    return '#_' + codIcon;

}

export default getIcon;
