/*jslint browser: true, devel: true, eqeq: true, plusplus: true, sloppy: true, vars: true, white: true*/
(function(){
    function detectOrientation(){
        var orientation = window.innerWidth > window.innerHeight ? 'Landscape' : 'Portrait';

        var ua = navigator.userAgent.toLowerCase(),
            isAndroid = ua.indexOf('android') > -1;

        if(isAndroid){
            var orientationNum =  screen.orientation || screen.mozOrientation || screen.msOrientation || window.orientation;

            orientation = orientationNum.type === "portrait-secondary" || orientationNum.type === "portrait-primary" ? 'Portrait' : 'Landscape';
        }


        if(orientation == 'Landscape' && window.innerWidth < 1088 && document.getElementById('browser-old-overlay').hasAttribute('hidden')){
            document.getElementById('orientation-overlay').removeAttribute('hidden');
        } else {
            document.getElementById('orientation-overlay').setAttribute('hidden', '');
        }
    }

    detectOrientation();

    window.addEventListener('resize', function(){
        setTimeout(function(){
            detectOrientation();
        }, 5);
    });
})();
