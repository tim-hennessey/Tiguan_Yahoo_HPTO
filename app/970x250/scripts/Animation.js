var app = app || {};


app.Animation = (function () {

    var tl1 = new TimelineMax();

    var curtain;
    var txt1;
    var hero;
    var vignette;
    var buttonExit;
    var cta_arrow;

    // --------------------------------------------------------------------------------------
    // set default properties
    function initialize() {
        curtain = document.getElementById('curtain');
        txt1 = document.getElementById('txt1');
        hero = document.getElementById('hero');
        vignette = document.getElementById('vignette');
        buttonExit = document.getElementById('button-exit');
        cta_arrow = document.getElementById('cta_arrow');


        buttonExit.addEventListener('mouseover', function () {
            TweenMax.to(cta_arrow, .25, {y: 5, ease: Sine.easeOut});
            TweenMax.to(cta_arrow, .25, {y: 0, delay: .25, ease: Sine.easeIn});
        });
    }

    // --------------------------------------------------------------------------------------
    // Starts the animation
    function start() {
        TweenMax.to(hero, 4, {scale:1, ease: Sine.easeOut});

        tl1.to(curtain, .5, {opacity: 0})
            .to(vignette, 2, {opacity: 1, x:"+=500", ease: Sine.easeOut}, "-=.5")
            .to(txt1, 1, {opacity: 1}, "-=1")
            .to(cta, .5, {opacity: 1}, "-=.5");
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
