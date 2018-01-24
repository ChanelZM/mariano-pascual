/*jslint browser: true, devel: true, eqeq: true, plusplus: true, sloppy: true, vars: true, white: true*/
(function(){
    var topNavCon = document.querySelector('.top-nav'),
        bottomNavCon = document.querySelector('.bottom-nav'),
        folders = document.querySelectorAll('.top-nav__item'),
        dropDownButtons = document.querySelectorAll('.dropdown-button'),
        macBar = document.querySelector('.mac-bar'),
        eye = document.querySelector('.eyeball');

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

    //if where you clicked has a link to an application/folder open it up
    function checkIfApp(e){
        if(e.target.hash){
            item.open(e.target, e.target.hash);
        }
    }

    var item = {
        //Function will open the right window
        open: function(parent, id){
            giveSelectedDesign(parent);
            // changeZIndex(parent);

            var section = document.querySelector(id);

            //If you're viewing this page on desktop
            if("ontouchstart" in document.documentElement == false && section.getAttribute('class').includes('desktop-folder')){
                if(section.getAttribute('class').includes('hidden')){
                    section.classList.add('desktop-folder_open');
                    section.classList.remove('hidden');
                }
            }
            //If you're viewing this page on desktop
            if("ontouchstart" in document.documentElement == false && section.getAttribute('class').includes('fullscreen-folder')){
                if(section.getAttribute('class').includes('hidden')){
                    section.classList.remove('hidden');
                }
            }
            //If you're viewing this page on a touch device, styling is different
            if ("ontouchstart" in document.documentElement == true) {
                section.classList.add('device-app_open');
                section.classList.remove('hidden');
            }
        }
    };

    function toggleDropDown(e){
        e.preventDefault();

        if(e.target.parentNode.querySelector('.dropdown').className.includes('hidden')){
            closeOtherDropDowns();
            e.target.parentNode.querySelector('.dropdown').classList.remove('hidden');
        } else {
            e.target.parentNode.querySelector('.dropdown').classList.add('hidden');
        }
    }

    function closeOtherDropDowns(){
        var dropDowns = document.querySelectorAll('.dropdown');
        for(var i = 0; i < dropDowns.length; i++){
            dropDowns[i].classList.add('hidden');
        }
    }

    topNavCon.addEventListener('click', checkIfApp);
    bottomNavCon.addEventListener('click', checkIfApp);
    eye.addEventListener('click', function(e){
        var animCircle = document.querySelector('.slider-anim__circle');

        document.querySelector('.slider-anim_wrap').removeAttribute('hidden');
        setTimeout(function(){
            animCircle.style.height = '130vw';
            animCircle.style.width = '130vw';
        }, 2);

        setTimeout(function(){
            document.querySelector('.bottom-nav').classList.add('hidden');
            document.querySelector('.eyeball').classList.add('hidden');

            document.querySelector('.slider-anim_wrap').setAttribute('hidden', 'true');
            animCircle.removeAttribute('style');

            checkIfApp(e);
        }, 1001);
    });
    macBar.addEventListener('click', checkIfApp);

    for(var i = 0; i < dropDownButtons.length; i++){
        dropDownButtons[i].addEventListener('click', toggleDropDown);
    }
})();
//Single and double click function by Karbassi: https://gist.github.com/karbassi/639453
