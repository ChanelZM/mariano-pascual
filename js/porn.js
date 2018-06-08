/*jslint browser: true, devel: true, eqeq: true, plusplus: true, sloppy: true, vars: true, white: true*/
(function(){
    var pornLinks = document.querySelectorAll('[href="#porn"]'),
        pornWindows = document.querySelectorAll('.porn-window'),
        pornContainer = document.querySelector('.porn');

    var i;

    var delay = 900,
        called = false;

    function delayWindowOpen(el, time){
        setTimeout(function(){
            el.classList.remove('hidden');
        }, time)
    }

    function animatePornWindows(){
        for(i = 1; i < pornWindows.length; i++){
            var time = delay * i;
            delayWindowOpen(pornWindows[i], time);
        }
    }

    for(i = 0; i < pornLinks.length; i++){
        pornLinks[i].addEventListener('click', function(){
            setTimeout(function(){
                if(called == false){
                    document.querySelector('#porn1').classList.remove('hidden');
                    called = true;
                    animatePornWindows();
                }
            }, 2000);
        });
    }

    pornContainer.addEventListener('click', function(){
        if(pornContainer.querySelector('.hidden')){
            called = false;
            for(i = 1; i < pornWindows.length; i++){
                pornWindows[i].classList.remove('.hidden');
            }
        }
    });
})();
