(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
/*jslint browser: true, devel: true, eqeq: true, plusplus: true, sloppy: true, vars: true, white: true*/
(function(){
    var buttonsWrap = document.querySelectorAll('.buttons-wrap'),
        i;

    //Close window with the id of the section
    function closeWindow(id, classNam){
        document.querySelector('#' + id).classList.add(classNam);
        document.querySelector('#' + id).classList.remove('desktop-folder_open');
    }

    //Trigger the right function for the right button.
    function forwardToFunction(el, targetWindow, classNam){
        var id = targetWindow.getAttribute('id');

        if (el.className.includes('close')){
            closeWindow(id, classNam);
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
            forwardToFunction(e.target, e.target.parentNode.parentNode, 'hidden');
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
        var folderLinks = document.querySelectorAll('.top-nav__item a'),
            loadingSound = document.querySelector('.loading-screen__audio');

        var i;

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

        removeHidden('array', document.querySelectorAll('.top-nav__item [hidden]'));
        removeHidden('array', document.querySelectorAll('.folder-nav'));
        removeHidden('array', document.querySelectorAll('.detail .close'));
        removeHidden('array', document.querySelectorAll('.porn-window'));
        removeHidden('el', document.querySelector('.mac-bar'));
        removeHidden('el', document.querySelector('.bottom-nav'));
        removeHidden('el', document.querySelector('.loading-screen'));

        changeClass('add', document.querySelectorAll('.desktop-folder'), 'hidden');
        changeClass('add', document.querySelectorAll('.folder-content'), 'js');
        changeClass('add', folderLinks, 'link_style_desktop');
        changeClass('add', document.querySelectorAll('.detail'), 'hidden');
        changeClass('remove', folderLinks, 'link_style_normal');

        document.querySelector('.contact-info').classList.add('hidden');
        document.querySelector('body').classList.add('body-overflow-h');
        document.querySelector('#projects').classList.remove('hidden');
        document.querySelector('#projects').classList.add('desktop-folder_open');

        loadingSound.autoplay = true;
        loadingSound.load();

        setTimeout(function(){
            document.querySelector('.loading-screen').classList.add('hidden');
        }, 3001);

        document.getElementById('print-art').addEventListener('click', function(){
            window.print();
        });
    }

    init();
})();

},{}],4:[function(require,module,exports){
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

            if(section.getAttribute('class').includes('hidden')){
                section.classList.add('desktop-folder_open');
                section.classList.remove('hidden');
            }
            if(id == '#snake'){
                var mySnakeBoard = new SNAKE.Board({
                                        boardContainer: "game-area",
                                        fullScreen: false,
                                        width: 954,
                                        height: 608
                                    });
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
        if(e.target.hash){
            item.open(e.target, e.target.hash);
        }
    });
})();
//Single and double click function by Karbassi: https://gist.github.com/karbassi/639453

},{}],5:[function(require,module,exports){
/*jslint browser: true, devel: true, eqeq: true, plusplus: true, sloppy: true, vars: true, white: true*/
(function(){
    var pornLinks = document.querySelectorAll('[href="#porn"]'),
        pornWindows = document.querySelectorAll('.porn-window'),
        pornContainer = document.querySelector('.porn');

    var i;

    var delay = 900,
        called = false;
    //
    // function animationDone(animationTime){
    //     setTimeout(function(){
    //         called = false;
    //     }, animationTime);
    // }

    function delayWindowOpen(el, time, xOffset, yOffset){
        setTimeout(function(){
            el.classList.remove('hidden');
            el.classList.add('desktop-folder_open');
            el.style.left = xOffset + 'rem';
            el.style.top = yOffset + 'rem';
        }, time);
    }

    function animatePornWindows(){
        //Starting at 1 because the first one doesn't need to change positions
        for(i = 1; i < pornWindows.length; i++){
            var time = delay * i,
                xOffset = Math.floor((Math.random() * 70) + 7),
                yOffset = Math.floor((Math.random() * 12) + 7);

            delayWindowOpen(pornWindows[i], time, xOffset, yOffset);
        }
        //animationDone(pornWindows.length * delay);
    }

    for(i = 0; i < pornLinks.length; i++){
        pornLinks[i].addEventListener('click', function(){
            setTimeout(function(){
                if(document.querySelector('#porn.desktop-folder_open') && called == false){
                    called = true;
                    animatePornWindows();
                }
            }, 1);
        });
    }

    pornContainer.addEventListener('click', function(){
        if(!pornContainer.querySelector('.desktop-folder_open')){
            called = false;
            for(i = 1; i < pornWindows.length; i++){
                pornWindows[i].classList.remove('desktop-folder_open');
            }
        }
    });
})();

},{}],6:[function(require,module,exports){
/*jslint browser: true, devel: true, eqeq: true, plusplus: true, sloppy: true, vars: true, white: true*/
(function(){
    document.querySelector('body').style.backgroundColor = 'white';
    document.querySelector('.sldr-info').removeAttribute('hidden');

    var count = 0;

    var projects = [
        {
            name: 'Daniel & Emma',
            href: '#project1',
            imgSrc: 'http://payload541.cargocollective.com/1/5/167802/13130602/SayHiTo_slide_2000_c_2000_c.jpg'
        },
        {
            name: '36 Days of Type #2',
            href: '#project1',
            imgSrc: 'http://payload541.cargocollective.com/1/5/167802/13130373/A_2000_c.jpg'
        },
        {
            name: 'Penetrate',
            href: '#project1',
            imgSrc: 'http://payload490.cargocollective.com/1/5/167802/12119976/theastonshuffle_penetrate_2000_c.jpg'
        },
        {
            name: '36 Days of type',
            href: '#project1',
            imgSrc: 'http://payload388.cargocollective.com/1/5/167802/10074091/36slide_2_2000_c.jpg'
        },
        {
            name: 'Ghost Army',
            href: '#project1',
            imgSrc: 'http://payload432.cargocollective.com/1/5/167802/10946398/Ghost_Army_1_1000.jpg'
        },
        {
            name: 'Roald Dahl Tribute',
            href: '#project1',
            imgSrc: 'http://payload482.cargocollective.com/1/5/167802/11953073/lixivate-it-s-nice-that-09_2000_c.jpg'
        },
        {
            name: 'La velocidad de una fiesta',
            href: '#project1',
            imgSrc: 'http://payload474.cargocollective.com/1/5/167802/11789231/lvvduf_8_2000_c.jpg'
        },
        {
            name: 'Read nothing here',
            href: '#project1',
            imgSrc: 'http://payload447.cargocollective.com/1/5/167802/11257371/Read_cover_2000_c.jpg'
        },
        {
            name: 'Cherry Glazer',
            href: '#project1',
            imgSrc: 'http://payload490.cargocollective.com/1/5/167802/12107233/cherry_2000_c.jpg'
        }
        ,
        {
            name: 'Isamo Noguchi\'s sculptures',
            href: '#project1',
            imgSrc: 'http://payload490.cargocollective.com/1/5/167802/12112855/noguchi_total-06_900.jpg'
        },
        {
            name: 'The floating world',
            href: '#project1',
            imgSrc: 'http://payload407.cargocollective.com/1/5/167802/10453919/the-floating-world-02_2000_c.jpg'
        }
    ];

    function randomImg(){
        checkCount();
        var backgroundImg = 'background-image: url(' + projects[count].imgSrc + ')';

        document.querySelector('body').classList.add('opac');

        setTimeout(function(){
            document.querySelector('body').classList.remove('opac');
            document.styleSheets[0].addRule('body::before', backgroundImg);
            document.querySelector('.sldr-info__link').innerHTML = projects[count].name;
            document.querySelector('.sldr-info__link').setAttribute('href', projects[count].href);
        }, 401);

        setTimeout(function(){
            count++;
            randomImg();
        }, 7000);
    }

    function checkCount(){
        if(count == projects.length){
            count = 0;
        }
    }

    setTimeout(function(){
        randomImg();
    }, 3000);
})();

},{}],7:[function(require,module,exports){
/*jslint browser: true, devel: true, eqeq: true, plusplus: true, sloppy: true, vars: true, white: true*/
(function(){
    var screensaver = document.querySelector('.screensaver');

    var isActive = false;

    var mouseTimeout;

    function showScreensaver(){
        screensaver.removeAttribute('hidden');
    }

    function stopScreensaver(){
        screensaver.setAttribute('hidden', 'true');

        isActive = false;
    }

    function clearScreensaver(){
        clearTimeout(mouseTimeout);

        if(isActive == true){
            stopScreensaver();
        }

        mouseTimeout = setTimeout(function(){
            isActive = true;
            showScreensaver();
        }, 13000);
    }

    document.addEventListener('mousemove', clearScreensaver);
})();

},{}],8:[function(require,module,exports){
/*jslint browser: true, devel: true, eqeq: true, plusplus: true, sloppy: true, vars: true, white: true*/
(function(){
    var detailSections = document.querySelectorAll('.detail'),
        folderLinks = document.querySelectorAll('.folderlink'),
        closeButtons = document.querySelectorAll('.project__close'),
        i;

    var detail = {
        open: function(e){
            var id = e.target.hash.replace('#','');

            for(i = 0; i < detailSections.length; i++){
                if(!detailSections[i].className.includes('hidden')){
                    detailSections[i].classList.add('hidden');
                }
            }

            document.getElementById(id).classList.remove('hidden');
        },
        close: function(e){
            e.target.parentNode.classList.add('hidden');

            if(e.target.parentNode.querySelector('.project__desc').className.includes('hidden')){
                e.target.parentNode.querySelector('.project__desc').classList.remove('hidden');
            }
        }
    };

    for(i = 0; i < folderLinks.length; i++){
        folderLinks[i].addEventListener('click', detail.open);
    }
    for(i = 0; i < closeButtons.length; i++){
        closeButtons[i].addEventListener('click', detail.close);
    }
})();

},{}]},{},[3,4,1,2,8,5,6,7]);
