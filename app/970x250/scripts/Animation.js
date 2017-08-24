var app = app || {};


app.Animation = (function () {

    var tl1 = new TimelineMax();

    var curtain;
    var txt1;

    var hero;



    // --------------------------------------------------------------------------------------
    // set default properties
    function initialize() {
        curtain = document.getElementById('curtain');
        txt1 = document.getElementById('txt1');

        hero = document.getElementById('hero');

    }

    // --------------------------------------------------------------------------------------
    // Starts the animation
    function start() {

        tl1.to(curtain, .5, {opacity: 0})
            .to(collapse, .5, {opacity: 1}, "-=.5");


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
