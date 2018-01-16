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

        //Hide screensaver if shown
        if(isActive == true){
            stopScreensaver();
        }

        //If You're playing snake, don't show the screensaver
        if(document.querySelector('#snake').className.includes('desktop-folder_open') == false){
            //Set again so when the user doesn't move anymore, the screensaver will be shown.
            mouseTimeout = setTimeout(function(){
                isActive = true;
                showScreensaver();
            }, 13000);
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
