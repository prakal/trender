function padToTwo(numberString) {
    if (numberString.length < 2) {
        numberString = '0' + numberString;
    }
    return numberString;
}

function hexAverage(colorArray) {
    return colorArray.reduce(function (previousValue, currentValue) {
        return currentValue
            .replace(/^#/, '')
            .match(/.{2}/g)
            .map(function (value, index) {
                return previousValue[index] + parseInt(value, 16);
            });
    }, [0, 0, 0])
    .reduce(function (previousValue, currentValue) {
        return previousValue + padToTwo(Math.floor(currentValue / colorArray.length).toString(16));
    }, '#');
}