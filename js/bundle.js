(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
/*jslint browser: true, devel: true, eqeq: true, plusplus: true, sloppy: true, vars: true, white: true*/
(function(){
    var buttonsWrap = document.querySelectorAll('.buttons-wrap'),
        i;

    //Close window with the id of the section
    function closeWindow(id){
        document.querySelector('#' + id).classList.add('desktop-folder_hidden');
    }

    //Trigger the right function for the right button.
    function forwardToFunction(el){
        var windowSection = el.parentNode.parentNode.getAttribute('id');

        if (el.className.includes('close')){
            closeWindow(windowSection);
        }

        if (el.className.includes('minimize')){
            // Function reference for minimize here
            console.log('minimize');
        }

        if (el.className.includes('fullscreen')){
            // Function reference for fullscreen here
            console.log('fullscreen');
        }
    }

    for(i = 0; i < buttonsWrap.length; i++){
        buttonsWrap[i].addEventListener('click', function(e){
            forwardToFunction(e.target);
        });
    }
})();

},{}],2:[function(require,module,exports){
/*jslint browser: true, devel: true, eqeq: true, plusplus: true, sloppy: true, vars: true, white: true*/
(function(){
    var elTriggerDrag = document.querySelectorAll('.drag'),
        body = document.querySelector('body'),
        i,
        moving;

    var drag = {
        starts: function(e){
            //Get the parent to drag the whole section
            var section = e.target.parentNode;
            moving = true;

            var relativeX = e.clientX - section.offsetLeft,
                relativeY = e.clientY - section.offsetTop;

            document.addEventListener('mousemove', function(e){
                //Otherwise this will still be true when you're not holding the mouse but simply hovering
                if (moving === true){
                    //Get the coordinates of the mouse
                    var sectionX = e.clientX - relativeX,
                        sectionY = e.clientY - relativeY;

                    //place the section where the mouse is located
                    section.style.top = sectionY + 'px';
                    section.style.left = sectionX + 'px';
                }
            });
        },
        end: function(){
            moving = false;
        }
    };

    for(i = 0; i < elTriggerDrag.length; i++){
        elTriggerDrag[i].addEventListener('mousedown', drag.starts);
    }

    body.addEventListener('mouseup', drag.end);

//https://codepen.io/nickmoreton/pen/ogryWa
})();

},{}],3:[function(require,module,exports){
/*jslint browser: true, devel: true, eqeq: true, plusplus: true, sloppy: true, vars: true, white: true*/
(function(){
    function init(){
        var folderImg = document.querySelectorAll('.top-nav__item [hidden]'),
            desktopFolderContent = document.querySelectorAll('.desktop-folder'),
            bottomNav = document.querySelector('.bottom-nav'),
            folderLinks = document.querySelectorAll('.top-nav__item a'),
            macBar = document.querySelector('.mac-bar'),
            folderNav = document.querySelectorAll('.folder-nav'),
            folderContent = document.querySelectorAll('.folder-content'),
            i,
            j,
            k,
            m,
            n;

        for(i = 0; i < folderImg.length; i++){
            folderImg[i].removeAttribute('hidden');
        }
        for(m = 0; m < folderNav.length; m++){
            folderNav[m].removeAttribute('hidden');
        }

        for(j = 0; j < desktopFolderContent.length; j++){
            desktopFolderContent[j].classList.add('desktop-folder_hidden');
        }
        for(n = 0; n < folderContent.length; n++){
            folderContent[n].classList.add('js');
        }

        for(k = 0; k < folderLinks.length; k++){
            folderLinks[k].classList.remove('link_style_normal');
            folderLinks[k].classList.add('link_style_desktop');
        }

        bottomNav.removeAttribute('hidden');
        macBar.removeAttribute('hidden');
    }

    init();
})();

},{}],4:[function(require,module,exports){
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

},{}]},{},[3,4,1,2]);
