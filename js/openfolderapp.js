/*jslint browser: true, devel: true, eqeq: true, plusplus: true, sloppy: true, vars: true, white: true*/
(function(){
    var folderContainer = document.querySelector('.top-nav'),
        folders = document.querySelectorAll('.top-nav__item');
    var clickCount = 0;
    var singleClickTimer;

    function giveSelectedDesign(el){
        if(el.getAttribute('class') == 'top-nav__item'){
            for(var i = 0; i < folders.length; i++){
                folders[i].classList.remove('top-nav__item_selected');
            }
            el.classList.add('top-nav__item_selected');
        }
    }

    var item = {
        //Function gives the parent item a selected design
        select: function(parent){
            giveSelectedDesign(parent);
        },
        //Function will open the right window
        open: function(parent, id){
            giveSelectedDesign(parent);
            console.log(id);
            var section = document.querySelector(id);
            console.log(section);

            if(section.getAttribute('class').includes('desktop-folder_hidden')){
                section.classList.add('desktop-folder_open');
                section.classList.remove('desktop-folder_hidden');
            }
        }
    };

    //Depending on the amount of clicks, a different function will be triggered.
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
            item.open(e.target.parentElement.parentElement, e.target.hash);
        }
    }

    folderContainer.addEventListener('click', checkAmountOfClicks);
})();
//Single and double click function by Karbassi: https://gist.github.com/karbassi/639453
