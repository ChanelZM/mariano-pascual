/*jslint browser: true, devel: true, eqeq: true, plusplus: true, sloppy: true, vars: true, white: true*/
(function(){
    var screensaver = document.querySelector('.screensaver');

    var isActive = false;

    var mouseTimeout;

    function showScreensaver(){
        screensaver.removeAttribute('hidden');
    }

    function stopScreensaver(){
        screensaver.setAttribute('hidden', 'true');

        isActive = false;
    }

    function clearScreensaver(){
        clearTimeout(mouseTimeout);

        mouseTimeout = setTimeout(function(){
            isActive = true;
            showScreensaver();
        }, 15000);

        //Hide screensaver if shown
        if(isActive == true){
            stopScreensaver();
        }
    }

    if("ontouchstart" in document.documentElement == false){
        document.addEventListener('mousemove', clearScreensaver);
        document.addEventListener('keydown', function(e){
            if(e.keyCode == 9){
                clearScreensaver();
            }
        });
    }
})();
