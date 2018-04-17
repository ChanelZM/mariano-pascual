/*jslint browser: true, devel: true, eqeq: true, plusplus: true, sloppy: true, vars: true, white: true*/
(function(){
    var closeButtons = document.querySelectorAll('.close'),
        i;

    for(i = 0; i < closeButtons.length; i++){
        closeButtons[i].addEventListener('click', function(e){
            if(document.querySelector('.bottom-nav').className.includes('hidden')){
                document.querySelector('.bottom-nav').classList.remove('hidden');
            }
            e.target.parentNode.classList.add('hidden');
        });
    }
})();
