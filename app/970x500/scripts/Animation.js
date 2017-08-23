var app = app || {};


app.Animation = (function () {

    var tl1 = new TimelineMax();
    var curtain;

    // --------------------------------------------------------------------------------------
    // set default properties
    function initialize() {
        curtain = document.getElementById('curtain');

    }

    // --------------------------------------------------------------------------------------
    // Starts the animation
    function start() {
        tl1.to(curtain, .5, {opacity: 0});
    }

    // --------------------------------------------------------------------------------------
    // Stops the animation
    function stop() {
        console.log("stopping animation");
    }

    // --------------------------------------------------------------------------------------
    // Publicly accessible methods and properties
    return {
        initialize: initialize,
        start: start,
        stop: stop
    }

})();
