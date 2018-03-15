/*jslint browser: true, devel: true, eqeq: true, plusplus: true, sloppy: true, vars: true, white: true*/
(function(){
    var images = document.querySelectorAll('.trash__img'),
        bodyWidth = window.innerWidth,
        bodyHeight = window.innerHeight;

    var i;

    function randomizeImg(){
        for(i = 0; i < images.length; i++){
            var xPosition = randomCoordinate(bodyWidth),
                yPosition = randomCoordinate(bodyHeight),
                rotation = randomDeg(45);

            images[i].style.transform = 'translate(' + xPosition + 'px, ' + yPosition + 'px) rotate(' + rotation + 'deg)';
        }
    }

    function randomCoordinate(parent){
        var coordinate = Math.floor(Math.random() * (parent - 500));

        return coordinate;
    }

    function randomDeg(maxDeg){
        var direction = Math.random() < 0.5 ? '-' : '';
        return direction + Math.floor(Math.random() * maxDeg);
    }

    document.getElementById('nav-trash').addEventListener('click', randomizeImg);
})();
