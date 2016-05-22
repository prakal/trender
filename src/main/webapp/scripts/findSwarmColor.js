function findSwarmColor(number, swarmList){
    var color = d3.scale.category10();

    var swarmColors = [];
    for (var i = 0; i < 11; i++){
        swarmColors.push(color(i));
    }

    var allColorsForNumber = [];
    var colorToBeReturned = 'ffffff';
    swarmList.forEach(function(item, index){
        if (item.indexOf(number) !== -1){
            colorToBeReturned = swarmColors[index];
            allColorsForNumber.push(colorToBeReturned);
        }
    });
    // if allColorsForNumber has values, get an average
    if (allColorsForNumber.length > 0){
        colorToBeReturned = hexAverage(allColorsForNumber);
    }
    return colorToBeReturned;
};