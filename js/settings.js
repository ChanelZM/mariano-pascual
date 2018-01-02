/*jslint browser: true, devel: true, eqeq: true, plusplus: true, sloppy: true, vars: true, white: true*/
(function(){
    function getClickedColor(e){
        e.preventDefault();
        changeBodyColor(e.target.id);
    }

    function changeBodyColor(color){
        document.querySelector('body').className = 'body-overflow-h' + ' ' + color;
    }

    document.querySelector('.color-list').addEventListener('click', getClickedColor);
})();
