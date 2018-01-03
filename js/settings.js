/*jslint browser: true, devel: true, eqeq: true, plusplus: true, sloppy: true, vars: true, white: true*/
(function(){
    var appleSliders = document.querySelectorAll('.a-slider__circle'),
        body = document.querySelector('body');

    var i,
        val;

    function getClickedColor(e){
        e.preventDefault();
        changeBodyColor(e.target.id);
    }

    function changeBodyColor(color){
        document.querySelector('.body-wrap').className = 'body-wrap' + ' ' + color;
    }

    function getValue(){
        val = document.querySelector('.range').value;

        if (val == 100){
            document.querySelector('.body-wrap').style.transform = 'scaleX(' + 1 + ')';
        } else {
            document.querySelector('.body-wrap').style.transform = 'scaleX(0.' + val + ')';
        }
    }

    function switchOnOff(e){
        if(e.target.parentNode.className.includes('switch-on')){
            e.target.parentNode.classList.remove('switch-on');
            setTimeout(fullscreen.off, 300);
        } else {
            e.target.parentNode.classList.add('switch-on');
            setTimeout(fullscreen.on, 300);
        }
    }

    var fullscreen = {
        on: function(){
            if(body.requestFullscreen){
                body.requestFullscreen();
            } else if(body.mozRequestFullScreen){
                body.mozRequestFullScreen();
            } else if(body.webkitRequestFullscreen){
                body.webkitRequestFullscreen();
            } else if(body.msRequestFullscreen){
                body.msRequestFullscreen();
            }
        },
        off: function(){
            if(document.exitFullscreen){
                document.exitFullscreen();
            } else if(document.mozCancelFullScreen){
                document.mozCancelFullScreen();
            } else if(document.webkitExitFullscreen){
                document.webkitExitFullscreen();
            } else if(document.msExitFullscreen){
                document.msExitFullscreen();
            }
        }
    };

    document.querySelector('.color-list').addEventListener('click', getClickedColor);
    document.querySelector('.range').addEventListener('change', getValue);

    for(i = 0; i < appleSliders.length; i++){
        appleSliders[i].addEventListener('click', switchOnOff);
    }
})();
