var app = app || {};


app.Animation = (function () {

    var tl1 = new TimelineMax();
    var tl2 = new TimelineMax();
    var tl3 = new TimelineMax();
    var curtain;
    var introText;
    var txt1;
    var txt2;
    var meTime;
    var introTime;
    var collapse;
    var resolve;
    var hero;
    var resolve_txtb;
    var resolve_cta;
    var myBool;
    var knobArrowLeft;
    var knobArrowRight;
    var knob;
    var buttonExit;

    var $dragMe = $("#dragme");
    var $beforeAfter = $("#before-after");
    var $viewAfter = $(".view-after");


    // --------------------------------------------------------------------------------------
    // set default properties
    function initialize() {
        myBool = true;
        curtain = document.getElementById('curtain');
        introText = document.getElementById('introText');
        txt1 = document.getElementById('txt1');
        txt2 = document.getElementById('txt2');
        collapse = document.getElementById('collapse');
        resolve = document.getElementById('resolve');
        hero = document.getElementById('hero');
        resolve_txtb = document.getElementById('resolve_txtb');
        resolve_cta = document.getElementById('resolve_cta');
        knobArrowLeft = document.getElementById('knobArrowLeft');
        knobArrowRight = document.getElementById('knobArrowRight');
        knob = document.getElementById('knob');
        buttonExit = document.getElementById('button-exit');
    }

    // --------------------------------------------------------------------------------------
    // Starts the animation
    function start() {
        TweenMax.set($dragMe, {x: 485, onUpdate: updateImages});

        tl1.to(curtain, .5, {opacity: 0})
            .to(collapse, .5, {opacity: 1}, "-=.5");

        tl2.to($dragMe, 1, {x: "+=200", ease: Power2.easeInOut, onUpdate: updateImages}, "+=1")
            .to($dragMe, 2, {x: "-=400", ease: Power2.easeInOut, onUpdate: updateImages})
            .to($dragMe, 2, {x: "+=200", ease: Power2.easeInOut, onUpdate: updateImages})
            .to(introText, 1, {opacity: 1}, "-=.5")
            .to(txt1, .5, {opacity: 1}, "-=.5")
            .to(txt2, .5, {opacity: 1, onComplete: introEnd}, "-=.5")
            .to(introText, .5, {opacity: 0}, "+=3")
            .addLabel("myLabel", "-=.5");

        function updateImages() {
            TweenMax.set($viewAfter, {width: $dragMe[0]._gsTransform.x});
        }

        function killKnobTween() {
            TweenMax.killTweensOf(knobArrowLeft);
            TweenMax.killTweensOf(knobArrowRight);
            TweenMax.to(knobArrowLeft, .25, {x: 0, ease: Power2.easeInOut});
            TweenMax.to(knobArrowRight, .25, {x: 0, ease: Power2.easeInOut});
        }

        function introEnd() {
            TweenMax.to(knobArrowLeft, .25, {x: "-=3", repeat: -1, yoyo: true, ease: Power2.easeInOut});
            TweenMax.to(knobArrowRight, .25, {x: "+=3", repeat: -1, yoyo: true, ease: Power2.easeInOut});

            introTime = setTimeout(resolveFunc, 10000);

            Draggable.create($dragMe, {
                type: "x",
                bounds: $beforeAfter,
                edgeResistance: 1,
                dragResistance: 0,
                throwProps: true,
                onDrag: updateImages,
                onThrowUpdate: updateImages,
                overshootTolerance: 0,
                onDragEnd: function () {
                    console.log("stopped")
                    meTime = setTimeout(resolveFunc, 3000);
                },
                onDragStart: function () {
                    clearTimeout(meTime);
                    clearTimeout(introTime);
                    killKnobTween();
                    if (myBool){
                        tl2.seek("myLabel");
                        myBool = false;
                    }

                }
            });

            var draggable = Draggable.get($dragMe);

            $beforeAfter.on("click", function (event) {
                // myBool = false;
                if (draggable.isDragging || draggable.isThrowing) return;

                var eventLeft = event.clientX - $beforeAfter.offset().left;
                animateTo(eventLeft);
                clearTimeout(meTime);
                clearTimeout(introTime);
                killKnobTween();
                if (myBool){
                    tl2.seek("myLabel");
                    myBool = false;
                }
            });
        }

        function animateTo(x) {
            TweenMax.to($dragMe, 1, {x: x, onUpdate: updateImages, onComplete: stopFunc});
        }

        function stopFunc() {
            console.log("stopped");
            meTime = setTimeout(resolveFunc, 3000);
        }

        function resolveFunc() {
            clearTimeout(meTime);
            clearTimeout(introTime);
            Draggable.get($dragMe).disable();
            $beforeAfter.off();
            TweenMax.set(buttonExit, {zIndex:1000});
            tl3.to(resolve, 1, {opacity: 1})
                .to($dragMe, 1, {autoAlpha: 0}, "-=1")
                .to(hero, 3, {scale: 1, x:"+=50", ease: Power1.easeOut}, "-=1")
                .to(resolve_txtb, .5, {opacity:1})
                .to(resolve_cta, .5, {opacity:1}, "+=.5");
        }


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
