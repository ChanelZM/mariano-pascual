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
        i,
        moving,
        containerX,
        containerY;

    var dragContainer,
        mouseX,
        mouseY;

    var drag = {
        starts: function(section, mouseX, mouseY, containerX, containerY, boolean){
            moving = true;

            var relativeX = mouseX - containerX,
                relativeY = mouseY - containerY;

            var moveFunction = function(e){
                //Otherwise this will still be true when you're not holding the mouse but simply hovering
                if (moving === true){
                    if(boolean == true){
                        section.classList.add('move');
                    }
                    //Get the coordinates of the mouse
                    var sectionX = e.clientX - relativeX,
                        sectionY = e.clientY - relativeY;
                    //place the section where the mouse is located
                    section.style.top = sectionY + 'px';
                    section.style.left = sectionX + 'px';
                }
            };

            document.addEventListener('mousemove', moveFunction);
            document.addEventListener('mouseup', function(){
                document.removeEventListener('mousemove', moveFunction);
                moving = false;
            });
        }
    };

        function checkWhichElement(e){
            e.preventDefault();

            mouseX = e.clientX;
            mouseY = e.clientY;

            if(e.target.className.includes('link_style')){
                dragContainer = e.target.parentNode.parentNode.parentNode;
                containerX = dragContainer.offsetLeft;
                containerY = dragContainer.offsetTop;

                drag.starts(dragContainer, mouseX, mouseY, containerX, containerY, true);

            } else if(e.target.className.includes('desktop-folder')){
                dragContainer = e.target.parentNode;
                containerX = dragContainer.offsetLeft;
                containerY = dragContainer.offsetTop;

                drag.starts(dragContainer, mouseX, mouseY, containerX, containerY, false);
            }
        }

    for(i = 0; i < elTriggerDrag.length; i++){
        elTriggerDrag[i].addEventListener('mousedown', checkWhichElement);
    }

//Creating JavaScript drag and drop: https://codepen.io/nickmoreton/pen/ogryWa
//Getting mouse offset relative to section: http://jsfiddle.net/WhrFt/
})();

},{}],3:[function(require,module,exports){
/*jslint browser: true, devel: true, eqeq: true, plusplus: true, sloppy: true, vars: true, white: true*/
(function(){
    function init(){
        var folderImg = document.querySelectorAll('.top-nav__item [hidden]'),
            desktopFolderContent = document.querySelectorAll('.desktop-folder'),
            closeButtonsDetail = document.querySelectorAll('.detail .close'),
            bottomNav = document.querySelector('.bottom-nav'),
            folderLinks = document.querySelectorAll('.top-nav__item a'),
            macBar = document.querySelector('.mac-bar'),
            folderNav = document.querySelectorAll('.folder-nav'),
            folderContent = document.querySelectorAll('.folder-content'),
            detailSections = document.querySelectorAll('.detail'),
            loadingScreen = document.querySelector('.loading-screen'),
            loadingSound = document.querySelector('.loading-screen__audio'),
            i;

        function removeHidden(dataType, variable){
            if(dataType == 'array'){
                for(i = 0; i < variable.length; i++){
                    variable[i].removeAttribute('hidden');
                }
            }
            if(dataType == 'el'){
                variable.removeAttribute('hidden');
            }
        }

        function changeClass(change, variable, className){
            if(change == 'add'){
                for(i = 0; i < variable.length; i++){
                    variable[i].classList.add(className);
                }
            }
            if(change == 'remove'){
                for(i = 0; i < variable.length; i++){
                    variable[i].classList.remove(className);
                }
            }
        }

        removeHidden('array', folderImg);
        removeHidden('array', folderNav);
        removeHidden('array', closeButtonsDetail);
        removeHidden('el', bottomNav);
        removeHidden('el', macBar);
        removeHidden('el', loadingScreen);

        changeClass('add', desktopFolderContent, 'desktop-folder_hidden');
        changeClass('add', folderContent, 'js');
        changeClass('add', folderLinks, 'link_style_desktop');
        changeClass('add', detailSections, 'detail_hidden');
        changeClass('remove', folderLinks, 'link_style_normal');

        loadingSound.autoplay = true;
        loadingSound.load();

        setTimeout(function(){
            loadingScreen.classList.add('hidden');
        }, 3001);
    }

    init();
})();

},{}],4:[function(require,module,exports){
/*jslint browser: true, devel: true, eqeq: true, plusplus: true, sloppy: true, vars: true, white: true*/
(function(){
    var folderContainer = document.querySelector('.top-nav'),
        folders = document.querySelectorAll('.top-nav__item');

    var clickCount = 0,
        clickedOpen = [];

    var singleClickTimer,
        i;

    function giveSelectedDesign(el){
        if(!el.getAttribute('class').includes('selected')){
            for(i = 0; i < folders.length; i++){
                folders[i].classList.remove('top-nav__item_selected');
            }
            el.classList.add('top-nav__item_selected');
        }
    }

    function changeZIndex(windows){
        var amountOpenWindows = clickedOpen.length;
        //Every time a folder opens, this folder needs to be displayed at the front
    }

    var item = {
        //Function gives the parent item a selected design
        select: function(parent){
            giveSelectedDesign(parent);
        },
        //Function will open the right window
        open: function(parent, id){
            clickedOpen.push(parent);

            giveSelectedDesign(parent);
            changeZIndex(parent);

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

    folderContainer.addEventListener('click', checkAmountOfClicks);
})();
//Single and double click function by Karbassi: https://gist.github.com/karbassi/639453

},{}],5:[function(require,module,exports){
/*jslint browser: true, devel: true, eqeq: true, plusplus: true, sloppy: true, vars: true, white: true*/
(function(){
    var detailSections = document.querySelectorAll('.detail'),
        folderLinks = document.querySelectorAll('.folderlink'),
        closeButtons = document.querySelectorAll('.detail .close'),
        i;

    var detail = {
        open: function(e){
            var id = e.target.hash.replace('#','');

            for(i = 0; i < detailSections.length; i++){
                if(!detailSections[i].className.includes('detail_hidden')){
                    detailSections[i].classList.add('detail_hidden');
                }
            }

            document.getElementById(id).classList.remove('detail_hidden');
        },
        close: function(e){
            e.target.parentNode.classList.add('detail_hidden');
        }
    };

    for(i = 0; i < folderLinks.length; i++){
        folderLinks[i].addEventListener('click', detail.open);
    }
    for(i = 0; i < closeButtons.length; i++){
        closeButtons[i].addEventListener('click', detail.close);
    }
})();

},{}]},{},[3,4,1,2,5]);
