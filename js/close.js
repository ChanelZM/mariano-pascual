/*jslint browser: true, devel: true, eqeq: true, plusplus: true, sloppy: true, vars: true, white: true*/
(function(){
    var closeButtons = document.querySelectorAll('.close'),
        i;

    for(i = 0; i < closeButtons.length; i++){
        closeButtons[i].addEventListener('click', function(e){
            if(document.querySelector('.bottom-nav').className.indexOf('hidden') >= 0){
                document.querySelector('.bottom-nav').classList.remove('hidden');
            }
            if(e.target.parentNode.parentNode.parentNode.parentNode.className.indexOf('detail') >= 0){
                e.target.parentNode.parentNode.parentNode.parentNode.classList.add('hidden');
            } else {
                e.target.parentNode.classList.add('hidden');
            }
        });
    }
})();
