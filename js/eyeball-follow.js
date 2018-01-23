/*jslint browser: true, devel: true, eqeq: true, plusplus: true, sloppy: true, vars: true, white: true*/
(function(){
    var screenWidth = window.innerWidth,
        halfWidth = screenWidth / 2,
        screenHeight = window.innerHeight,
        halfHeight = screenHeight / 2,
        mouseX = halfWidth,
		mouseY = halfHeight,
		eyeX = 50,
		eyeY = 50;

    document.addEventListener('mousemove', function(e){
        mouseX = e.pageX;
        mouseY = e.pageY;
    });

    function move(){
        eyeX = mouseX / screenWidth * 70;
        eyeY = mouseY / screenHeight * 70;
        // console.log(eyeX);

        document.querySelector('.pupil').style.left = eyeX + '%';
        document.querySelector('.pupil').style.top = eyeY + '%';

        window.requestAnimationFrame(move);
    }

    move();
})();
