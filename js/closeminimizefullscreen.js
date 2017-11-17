/*jslint browser: true, devel: true, eqeq: true, plusplus: true, sloppy: true, vars: true, white: true*/
(function(){
    var buttonsWrap = document.querySelectorAll('.buttons-wrap'),
        i;

    //Close window with the id of the section
    function closeWindow(id){
        document.querySelector('#' + id).classList.add('desktop-folder_hidden');
    }

    //Trigger the right function for the right button.
    function forwardToFunction(el){
        var windowSection = el.parentNode.parentNode.getAttribute('id');

        if (el.className.includes('close')){
            closeWindow(windowSection);
        }

        if (el.className.includes('minimize')){
            // Function reference for minimize here
            console.log('minimize');
        }

        if (el.className.includes('fullscreen')){
            // Function reference for fullscreen here
            console.log('fullscreen');
        }
    }

    for(i = 0; i < buttonsWrap.length; i++){
        buttonsWrap[i].addEventListener('click', function(e){
            forwardToFunction(e.target);
        });
    }
})();
