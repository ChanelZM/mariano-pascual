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

        if(isActive == true){
            stopScreensaver();
        }

        mouseTimeout = setTimeout(function(){
            isActive = true;
            showScreensaver();
        }, 13000);
    }

    document.addEventListener('mousemove', clearScreensaver);
})();
