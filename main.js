window.onload = function() {
    var paper = Snap("#svg");
    centerX = 400; // A variable that doesn't have the 'var' keyword is global.
    centerY = 300;
    radius = 200;
    mainTickmarkHeight = 20;
    tickmarkHeight = 10;
    tickmarkWidth = 2;
    historicalDays = 30;
    exerciseDays = 8;
    globalDays = historicalDays + exerciseDays;
    currentRotation = 0;
    var center = new Point(centerX, centerY);
    var circle = paper.circle(center.x, center.y, radius);
    circle.attr({
        fill: "none",
        stroke: "black",
        strokeWidth: 1,
    })
    var tickmarkTopLeftX = center.x - tickmarkWidth/2;
    var tickmarkTopLeftY = center.y - radius - tickmarkHeight;
    var mainTickmarkTopLeftY = center.y - radius - mainTickmarkHeight;
    var mainTickmark = paper.rect(tickmarkTopLeftX, mainTickmarkTopLeftY, tickmarkWidth, mainTickmarkHeight);
    mainTickmark.attr({
        fill: "red",
    });
    var mainGroup = paper.g();
    mainGroup.add(circle, mainTickmark);
    var populateDayRange = function(startDate, endDate, startingDegrees, endingDegrees) {
        var numberOfTickmarks = endDate - startDate;
        var degreesOfSeparation = (endingDegrees - startingDegrees)/(numberOfTickmarks - 1);
        var realStartingDegrees = -currentRotation + startingDegrees;
        var bigIndices = [];
        var paddingForInnerTickmarks = Math.ceil((numberOfTickmarks - 1)/3);
        bigIndices.push(0); // First ending tickmark.
        bigIndices.push(numberOfTickmarks - 1); // Last ending tickmark.
        bigIndices.push(paddingForInnerTickmarks); // Left inner big tickmark.
        bigIndices.push(numberOfTickmarks - 1 - paddingForInnerTickmarks); // Right inner big tickmark.
        for (var i = 0; i < numberOfTickmarks; i++) {
            var tickmark;
            var currentRotationFromStartingDegrees = degreesOfSeparation*i;
            var totalDesiredRotation = realStartingDegrees + currentRotationFromStartingDegrees;
            if (bigIndices.includes(i)) {
                var heightIncrease = 10;
                tickmark = paper.rect(tickmarkTopLeftX, tickmarkTopLeftY - heightIncrease, tickmarkWidth, tickmarkHeight + heightIncrease);
                var dayNumber = startDate + i;
                if (i >= -startDate) {
                    dayNumber++;
                }
                var labelRotation = startingDegrees + currentRotationFromStartingDegrees;
                var label = paper.text(tickmarkTopLeftX, tickmarkTopLeftY - 12, "Day " + dayNumber);
                label.attr({
                    transform: "r" + labelRotation + ", " + center.x + ", " + center.y,
                });
            } else {
                tickmark = paper.rect(tickmarkTopLeftX, tickmarkTopLeftY, tickmarkWidth, tickmarkHeight);
            }
            tickmark.attr({
                transform: "r" + totalDesiredRotation + ", " + center.x + ", " + center.y,
            });
            mainGroup.add(tickmark);
        }
    }
    var button = paper.circle(center.x + 1.5*radius, center.y, radius/10);
    button.click(function() {
        currentRotation = -200;
        mainGroup.animate({
            transform: "r" + currentRotation + ", " + center.x + ", " + center.y,
        }, 1000, mina.easein, function() {
            var startDate = -7;
            var endDate = 3;
            populateDayRange(startDate, endDate, -45, 45);
        });
    });
};