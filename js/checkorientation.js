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


        if(orientation == 'Landscape' && window.innerWidth < 1088){
            console.log('landscape');
            document.getElementById('orientation-overlay').removeAttribute('hidden');
        } else {
            console.log('portrait');
            document.getElementById('orientation-overlay').setAttribute('hidden', 'true');
        }
    }

    detectOrientation();

    window.addEventListener('resize', function(){
        console.log('resize');
        setTimeout(function(){
            detectOrientation();
        }, 5);
    });
})();
