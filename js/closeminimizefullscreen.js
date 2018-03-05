/*jslint browser: true, devel: true, eqeq: true, plusplus: true, sloppy: true, vars: true, white: true*/
(function(){
    var buttonsWrap = document.querySelectorAll('.buttons-wrap'),
        closeButtons = document.querySelectorAll('.close'),
        i;

    //Close window with the id of the section
    function closeWindow(id, classNam){
        location.hash = '#home';
        document.querySelector('#' + id).classList.add(classNam);
        document.querySelector('.eyeball').classList.remove('hidden');
        document.querySelector('.bottom-nav').classList.remove('hidden');
    }

    for(i = 0; i < closeButtons.length; i++){
        closeButtons[i].addEventListener('click', function(e){
            var id = e.target.parentNode.parentNode.id;
            closeWindow(id, 'hidden');
        });
    }
})();
