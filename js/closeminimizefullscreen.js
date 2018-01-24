/*jslint browser: true, devel: true, eqeq: true, plusplus: true, sloppy: true, vars: true, white: true*/
(function(){
    var buttonsWrap = document.querySelectorAll('.buttons-wrap'),
        closeButtons = document.querySelectorAll('.close'),
        i;

    //Close window with the id of the section
    function closeWindow(id, classNam){
        location.hash = '#home';
        document.querySelector('#' + id).classList.add(classNam);
        document.querySelector('#' + id).classList.remove('desktop-folder_open');
        document.querySelector('.eyeball').classList.remove('hidden');
        document.querySelector('.bottom-nav').classList.remove('hidden');
    }

    for(i = 0; i < closeButtons.length; i++){
        closeButtons[i].addEventListener('click', function(e){
            var id = e.target.parentNode.parentNode.id;
            closeWindow(id, 'hidden');
        });
    }

    // //Trigger the right function for the right button.
    // function forwardToFunction(el, targetWindow, classNam){
    //     console.log(targetWindow);
    //     var id = targetWindow.getAttribute('id');
    //
    //     if (el.className.includes('close')){
    //         closeWindow(id, classNam);
    //     }
    //
    //     if (el.className.includes('minimize')){
    //         // Function reference for minimize here
    //         console.log('minimize');
    //     }
    //
    //     if (el.className.includes('fullscreen')){
    //         // Function reference for fullscreen here
    //         console.log('fullscreen');
    //     }
    // }

    // for(i = 0; i < buttonsWrap.length; i++){
    //     buttonsWrap[i].addEventListener('click', function(e){
    //         forwardToFunction(e.target, e.target.parentNode.parentNode, 'hidden');
    //     });
    // }
})();
