/*jslint browser: true, devel: true, eqeq: true, plusplus: true, sloppy: true, vars: true, white: true*/
(function(){
    var closeButtons = document.querySelectorAll('.close'),
        i;

    for(i = 0; i < closeButtons.length; i++){
        closeButtons[i].addEventListener('click', function(e){
            e.target.parentNode.classList.add('hidden');
        });
    }
})();
