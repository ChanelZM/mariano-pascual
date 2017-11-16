/*jslint browser: true, devel: true, eqeq: true, plusplus: true, sloppy: true, vars: true, white: true*/
(function(){
    var buttonsWrap = document.querySelectorAll('.buttons-wrap');

    for(var i = 0; i < buttonsWrap.length; i++){
        buttonsWrap[i].addEventListener('click', function(e){
            console.log(e.target.parentNode);
            if (e.target.parentNode.className.includes('close')){
                // Function reference for close here
                console.log('close');
            } else if (e.target.parentNode.className.includes('minimize')){
                // Function reference for minimize here
                console.log('minimize');
            } else if (e.target.parentNode.className.includes('fullscreen')){
                // Function reference for fullscreen here
                console.log('fullscreen');
            }
        });
    }
})();
