var app = app || {};


app.Animation = (function () {

    var tl1 = new TimelineMax();
    var tl2 = new TimelineMax();
    var curtain;
    var introText;
    var meTime;

    var $dragMe = $("#dragme");
    var $beforeAfter = $("#before-after");
    var $viewAfter = $(".view-after");


    // --------------------------------------------------------------------------------------
    // set default properties
    function initialize() {
        curtain = document.getElementById('curtain');
        introText = document.getElementById('introText');
    }

    // --------------------------------------------------------------------------------------
    // Starts the animation
    function start() {
        TweenMax.set($dragMe, {x: 485, onUpdate: updateImages});

        tl1.to(curtain, .5, {opacity: 0});

        tl2.to($dragMe, 1, {x: "+=200", ease: Sine.easeInOut, onUpdate: updateImages}, "+=1")
            .to($dragMe, 2, {x: "-=400", ease: Sine.easeInOut, onUpdate: updateImages}, "+=.5")
            .to($dragMe, 1, {x: "+=200", ease: Sine.easeInOut, onUpdate: updateImages}, "+=.5")
            .to(introText, .5, {opacity: 1})
            .to(introText, .5, {opacity: 0, onComplete: introEnd}, "+=2");

        function updateImages() {
            TweenMax.set($viewAfter, {width: $dragMe[0]._gsTransform.x});
        }

        function introEnd() {
            Draggable.create($dragMe, {
                type: "x",
                bounds: $beforeAfter,
                throwProps: true,
                onDrag: updateImages,
                onThrowUpdate: updateImages,
                overshootTolerance: 0,
                onDragEnd: function () {
                    console.log("stopped")
                    meTime = setTimeout(function(){ alert("Hello"); }, 3000);
                },
                onDragStart:function() {
                    clearTimeout(meTime);
                }
            });

            var draggable = Draggable.get($dragMe);

            $beforeAfter.on("click", function (event) {
                if (draggable.isDragging || draggable.isThrowing) return;

                var eventLeft = event.clientX - $beforeAfter.offset().left;
                animateTo(eventLeft);
                clearTimeout(meTime);
            });
        }

        function animateTo(x) {
            TweenMax.to($dragMe, 1, {x: x, onUpdate: updateImages, onComplete: stopFunc});
        }

        function stopFunc() {
            console.log("stopped");
            meTime = setTimeout(function(){ alert("Hello"); }, 3000);
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
