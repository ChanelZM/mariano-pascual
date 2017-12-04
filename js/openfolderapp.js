/*jslint browser: true, devel: true, eqeq: true, plusplus: true, sloppy: true, vars: true, white: true*/
(function(){
    var topNavCon = document.querySelector('.top-nav'),
        bottomNavCon = document.querySelector('.bottom-nav'),
        folders = document.querySelectorAll('.top-nav__item');

    var clickCount = 0;
        // clickedOpen = [];

    var singleClickTimer,
        i;

    function giveSelectedDesign(el){
        if(!el.getAttribute('class').includes('selected') && !el.getAttribute('class').includes('app')){
            for(i = 0; i < folders.length; i++){
                folders[i].classList.remove('top-nav__item_selected');
            }
            el.classList.add('top-nav__item_selected');
        }
    }

    // function changeZIndex(windows){
    //     var amountOpenWindows = clickedOpen.length;
    //     //Every time a folder opens, this folder needs to be displayed at the front
    // }

    var item = {
        //Function gives the parent item a selected design
        select: function(parent){
            giveSelectedDesign(parent);
        },
        //Function will open the right window
        open: function(parent, id){
            giveSelectedDesign(parent);
            // changeZIndex(parent);

            var section = document.querySelector(id);

            if(section.getAttribute('class').includes('desktop-folder_hidden')){
                section.classList.add('desktop-folder_open');
                section.classList.remove('desktop-folder_hidden');
            }
        }
    };

    //Depending on the amount of clicks, a different function will be triggered.
    function checkAmountOfClicks(e){
        clickCount++;

        if(clickCount === 1){
            singleClickTimer = setTimeout(function(){
                clickCount = 0;

                item.select(e.target.parentElement.parentElement.parentElement);
            }, 200);
        } else if(clickCount === 2){
            clearTimeout(singleClickTimer);

            clickCount = 0;

            item.open(e.target.parentElement.parentElement.parentElement, e.target.hash);
        }
    }

    topNavCon.addEventListener('click', checkAmountOfClicks);
    bottomNavCon.addEventListener('click', function(e){
        item.open(e.target, e.target.hash);
    });
})();
//Single and double click function by Karbassi: https://gist.github.com/karbassi/639453
