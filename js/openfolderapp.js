/*jslint browser: true, devel: true, eqeq: true, plusplus: true, sloppy: true, vars: true, white: true*/
(function(){
    var topNavCon = document.querySelector('.top-nav'),
        bottomNavCon = document.querySelector('.bottom-nav'),
        folders = document.querySelectorAll('.top-nav__item'),
        dropDownButtons = document.querySelectorAll('.dropdown-button'),
        macBar = document.querySelector('.mac-bar'),
        windows = document.querySelectorAll('.window'),
        dropDownLists = document.querySelectorAll('.dropdown'),
        detail = document.querySelectorAll('.detail');

    var clickCount = 0,
        zIndex = 2;

    var singleClickTimer,
        i;

    function findNearestWindowEl(e){
        console.log('findNearest');
        var el = findAncestor(e.target, 'window');

        windowToFront(el);
    }

    function findAncestor(el, cls) {
        while ((el = el.parentElement) && !el.classList.contains(cls));
        return el;
    }

    function windowToFront(win){
        if(win.style.zIndex != zIndex){
            zIndex++;
            win.style.zIndex = zIndex;
        }
    }

    //if where you clicked has a link to an application/folder open it up
    function checkIfApp(e){
        if(e.target.hash == '#latestwork' && window.innerWidth >= 1088){
            animateFullscreen(e, removeNav);
        } else if(e.target.hash == '#latestwork' && window.innerWidth < 1088){
            openWindow(e.target, e.target.hash);
        } else if(e.target.hash == '#porn'){
            openWindow(e.target, e.target.hash);
        } else if(e.target.hash != '#print'){
            openWindow(e.target, e.target.hash);
        }
    }

    function openWindow(parent, id){
        var section = document.querySelector(id);

        console.log('open window');
        if(section.classList.contains('window') || section.classList.contains('fullscreen-folder')){
            console.log('contains window');
            windowToFront(section);
        }

        //If you're viewing this page on desktop
        if(window.innerWidth >= 1088 && section.getAttribute('class').indexOf('desktop-folder') >= 0){
            if(section.getAttribute('class').indexOf('hidden') >= 0){
                section.classList.add('desktop-folder_open');
                section.classList.remove('hidden');
            }
        }
        if(window.innerWidth >= 1088 && section.getAttribute('id') == 'porn'){
            section.classList.remove('hidden');
        }
        //If you're viewing this page on desktop
        if(window.innerWidth >= 1088 && section.getAttribute('class').indexOf('fullscreen-folder') >= 0){
            section.removeAttribute('hidden');
            section.classList.remove('hidden');
        }

        if(section.className.indexOf('lazyload') >= 0){
            loadImages(section);
        }

        //If you're viewing this page on a touch device, styling is different
        if (window.innerWidth < 1088) {
            var folders = document.querySelectorAll('.mobile-app');

            for(i = 0; i < folders.length; i++){
                folders[i].classList.add('hidden');
            }
            for(i = 0; i < detail.length; i++){
                detail[i].classList.add('hidden');
            }
            section.classList.remove('hidden');
        }
    }

    function loadImages(parent){
        [].forEach.call(parent.querySelectorAll('img[data-src]'), function(img) {
            img.setAttribute('src', img.getAttribute('data-src'));
            img.removeAttribute('data-src');
        });
    }

    function toggleDropDown(e){
        e.preventDefault();

        if(e.target.parentNode.querySelector('.dropdown').className.indexOf('hidden') >= 0){
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

    function animateFullscreen(e, callback){
        var animCircle = document.querySelector('.slider-anim__circle');

        document.querySelector('.slider-anim_wrap').removeAttribute('hidden');

        setTimeout(function(){
            animCircle.style.height = '130vw';
            animCircle.style.width = '130vw';
        }, 1);

        setTimeout(function(){
            callback();
            document.querySelector('.slider-anim_wrap').setAttribute('hidden', 'true');
            animCircle.removeAttribute('style');

            openWindow(e.target, e.target.hash);
        }, 1001);
    }

    function removeNav(){
        document.querySelector('.bottom-nav').classList.add('hidden');
    }

    topNavCon.addEventListener('click', checkIfApp);
    bottomNavCon.addEventListener('click', checkIfApp);
    macBar.addEventListener('click', checkIfApp);

    for(var i = 0; i < dropDownButtons.length; i++){
        dropDownButtons[i].addEventListener('mouseenter', toggleDropDown);
    }
    for(var i = 0; i < dropDownLists.length; i++){
        dropDownLists[i].addEventListener('mouseleave', toggleDropDown);
    }
    if(window.innerWidth >= 1088){
        for(var i = 0; i < windows.length; i++){
            windows[i].addEventListener('click', findNearestWindowEl);
        }
    }
})();
//Single and double click function by Karbassi: https://gist.github.com/karbassi/639453
