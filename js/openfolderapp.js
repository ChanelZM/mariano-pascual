/*jslint browser: true, devel: true, eqeq: true, plusplus: true, sloppy: true, vars: true, white: true*/
(function(){
    var folders = document.querySelectorAll('.top-nav__item'),
        i;

    var item = {
        //Function that will handle the single click
        select: function(e){
            console.log('single click worked: ' + e.target);
        },
        //Function that will handle the double click
        open: function(e){
            console.log('double click worked: ' + e.target);
        }
    };

    //Add one click for selection and double click for opening folder/file/application
    for (i = 0; i < folders.length; i++){
        var clickCount = 0;
        folders[i].addEventListener('click', function(){
            clickCount++;
            if(clickCount === 1){
                 var singleClickTimer = setTimeout(function(){
                     clickCount = 0;
                     item.open();
                 }, 400);
            } else if (clickCount ===2){
                clearTimeout(singleClickTimer);
                clickCount = 0;
                item.select();
            }
        });
    }
})();
//Single and double click function by Karbassi: https://gist.github.com/karbassi/639453
