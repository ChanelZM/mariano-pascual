/*jslint browser: true, devel: true, eqeq: true, plusplus: true, sloppy: true, vars: true, white: true*/
(function(){
    var folderContainer = document.querySelector('.top-nav'),
        folders = document.querySelectorAll('.top-nav__item');
    var clickCount = 0;
    var singleClickTimer;

    var item = {
        //Function that will handle the single click
        select: function(parent){
            console.log(parent);
            if(parent.getAttribute('class') == 'top-nav__item'){
                for(var i = 0; i < folders.length; i++){
                    folders[i].classList.remove('top-nav__item_selected');
                }
                parent.classList.add('top-nav__item_selected');
            }
        },
        //Function that will handle the double click
        open: function(e){
            console.log('double click worked: ' + e.target);
        }
    };

    function checkAmountOfClicks(e){
        console.log(e);
        clickCount++;
        if(clickCount === 1){
            singleClickTimer = setTimeout(function(){
                clickCount = 0;
                item.select(e.target.parentElement.parentElement);
            }, 200);
        } else if(clickCount === 2){
            clearTimeout(singleClickTimer);
            clickCount = 0;
            item.open(e);
        }
    }

    folderContainer.addEventListener('click', checkAmountOfClicks);
})();
//Single and double click function by Karbassi: https://gist.github.com/karbassi/639453
