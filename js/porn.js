/*jslint browser: true, devel: true, eqeq: true, plusplus: true, sloppy: true, vars: true, white: true*/
(function(){
    var pornLinks = document.querySelectorAll('[href="#porn"]'),
        pornWindows = document.querySelectorAll('.porn-window'),
        pornContainer = document.querySelector('.porn');

    var i;

    var delay = 900,
        called = false;
    //
    // function animationDone(animationTime){
    //     setTimeout(function(){
    //         called = false;
    //     }, animationTime);
    // }

    // function delayWindowOpen(el, time, xOffset, yOffset){
    //     setTimeout(function(){
    //         el.classList.remove('hidden');
    //         el.style.left = xOffset/16 + 'rem';
    //         el.style.top = yOffset/16 + 'rem';
    //     }, time);
    // }
    function delayWindowOpen(el, time){
        setTimeout(function(){
            el.classList.remove('hidden');
        }, time)
    }

    function animatePornWindows(){
        // var widthRange = window.innerWidth * 0.50,
        //     heightRange = window.innerHeight * 0.20;
        // //Starting at 1 because the first one doesn't need to change positions
        // for(i = 1; i < pornWindows.length; i++){
        //     var time = delay * i,
        //         xOffset = Math.floor((Math.random() * widthRange) + 32),
        //         yOffset = Math.floor((Math.random() * heightRange) + 32);
        //
        //     delayWindowOpen(pornWindows[i], time, xOffset, yOffset);
        // }
        //animationDone(pornWindows.length * delay);
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
            }, 1);
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
