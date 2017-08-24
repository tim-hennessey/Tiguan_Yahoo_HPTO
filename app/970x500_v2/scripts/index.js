$(function () {

    var $dragMe = $("#dragme");
    var $beforeAfter = $("#before-after");
    var $viewAfter = $(".view-after");
    var tl2 = new TimelineMax();
    var introText = $("#introText");
    ;

    function updateImages() {
        TweenMax.set($viewAfter, {width: $dragMe[0]._gsTransform.x});
    }

    //Intro Animation
    // animateTo(485);
    TweenMax.set($dragMe, {x: 485, onUpdate: updateImages});

    tl2.to($dragMe, 1, {x: "+=200", ease: Sine.easeInOut, onUpdate: updateImages}, "+=1")
        .to($dragMe, 2, {x: "-=400", ease: Sine.easeInOut, onUpdate: updateImages}, "+=.5")
        .to($dragMe, 1, {x: "+=200", ease: Sine.easeInOut, onUpdate: updateImages}, "+=.5")
        .to(introText, .5, {opacity: 1})
        .to(introText, .5, {opacity: 0, onComplete: introEnd}, "+=2");

    function animateTo(x) {
        TweenLite.to($dragMe, 1, {x: x, onUpdate: updateImages, onComplete:stopFunc});
    }

    function stopFunc() {
        console.log("stopped");
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
            }
        });


        var draggable = Draggable.get($dragMe);

        $beforeAfter.on("click", function (event) {
            if (draggable.isDragging || draggable.isThrowing) return;

            var eventLeft = event.clientX - $beforeAfter.offset().left;
            animateTo(eventLeft);
        });

    }

});
