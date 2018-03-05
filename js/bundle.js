(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
/*jslint browser: true, devel: true, eqeq: true, plusplus: true, sloppy: true, vars: true, white: true*/
(function(){
    //Functions that handle the clock
    function parseHourMin(num){
        var parseNum;

        //Otherwise there will only be one digit when the minute/hour is less then 10
        if(num < 10){
            parseNum = '0' + num;
        } else {
            parseNum = num;
        }
        return parseNum;
    }

    //Change date into correct apple format
    function formatDate(day, hour, min){
        var parseHour = parseHourMin(hour),
            parseMin = parseHourMin(min),
            date = day + ' ' + parseHour + ':' + parseMin;

        return date;
    }

    function updateTime(){
        var d = new Date(),
            days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

        document.querySelector('.time').innerHTML = formatDate(days[d.getDay() -1], d.getHours(), d.getMinutes());

        //Check every half a second if the time has changed
        var timeout = setTimeout(updateTime, 500);
    }

    updateTime();
})();

},{}],2:[function(require,module,exports){
/*jslint browser: true, devel: true, eqeq: true, plusplus: true, sloppy: true, vars: true, white: true*/
(function(){
    var buttonsWrap = document.querySelectorAll('.buttons-wrap'),
        closeButtons = document.querySelectorAll('.close'),
        i;

    //Close window with the id of the section
    function closeWindow(id, classNam){
        location.hash = '#home';
        document.querySelector('#' + id).classList.add(classNam);
        document.querySelector('.eyeball').classList.remove('hidden');
        document.querySelector('.bottom-nav').classList.remove('hidden');
    }

    for(i = 0; i < closeButtons.length; i++){
        closeButtons[i].addEventListener('click', function(e){
            var id = e.target.parentNode.parentNode.id;
            closeWindow(id, 'hidden');
        });
    }

    // //Trigger the right function for the right button.
    // function forwardToFunction(el, targetWindow, classNam){
    //     console.log(targetWindow);
    //     var id = targetWindow.getAttribute('id');
    //
    //     if (el.className.includes('close')){
    //         closeWindow(id, classNam);
    //     }
    //
    //     if (el.className.includes('minimize')){
    //         // Function reference for minimize here
    //         console.log('minimize');
    //     }
    //
    //     if (el.className.includes('fullscreen')){
    //         // Function reference for fullscreen here
    //         console.log('fullscreen');
    //     }
    // }

    // for(i = 0; i < buttonsWrap.length; i++){
    //     buttonsWrap[i].addEventListener('click', function(e){
    //         forwardToFunction(e.target, e.target.parentNode.parentNode, 'hidden');
    //     });
    // }
})();

},{}],3:[function(require,module,exports){
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

            //If it's a desktop icon
            if(e.target.className.includes('link_style')){
                dragContainer = e.target.parentNode.parentNode.parentNode;
                containerX = dragContainer.offsetLeft;
                containerY = dragContainer.offsetTop;

                drag.starts(dragContainer, mouseX, mouseY, containerX, containerY, true);
            //If it's a desktop folder
            } else if(e.target.className.includes('desktop-folder')){
                dragContainer = e.target.parentNode;
                containerX = dragContainer.offsetLeft;
                containerY = dragContainer.offsetTop;

                drag.starts(dragContainer, mouseX, mouseY, containerX, containerY, false);
            }
        }

    for(i = 0; i < elTriggerDrag.length; i++){
        //No mouse/touchpad, no drag and drop
        elTriggerDrag[i].addEventListener('mousedown', checkWhichElement);
    }

//Creating JavaScript drag and drop: https://codepen.io/nickmoreton/pen/ogryWa
//Getting mouse offset relative to section: http://jsfiddle.net/WhrFt/
})();

},{}],4:[function(require,module,exports){
/*jslint browser: true, devel: true, eqeq: true, plusplus: true, sloppy: true, vars: true, white: true*/
(function(){
    var hoverImages = document.querySelectorAll('.hover-img');

    var parent,
        i,
        src,
        splitSrc;

    function playSound(e){
        parent = e.target.parentNode.parentNode;
        src = parent.children[0].getAttribute('src');

        //Only get the cion name
        var splits = src.split('img/icon-');
        var iconName = splits[1].split('.svg');

        //The name of the icon depends on which sound will be played when hovering
        document.querySelector('.' + iconName[0] + '-sound').autoplay = true;
        document.querySelector('.' + iconName[0] + '-sound').play();
    }

    function changeImg(e){
        parent = e.target.parentNode.parentNode;
        src = parent.children[0].getAttribute('src');

        //Toggle images when hovering
        if(src.includes('-hover')){
            splitSrc = src.split('-hover');
            parent.children[0].setAttribute('src', (splitSrc[0] + '.svg'));
        } else {
            splitSrc = src.split('.svg');
            parent.children[0].setAttribute('src', (splitSrc[0] + '-hover.svg'));
        }
    }

    //For every image that needs a hover effect, add Eventlistener
    for(i = 0; i < hoverImages.length; i++){
        hoverImages[i].addEventListener('mouseenter', playSound);
        hoverImages[i].addEventListener('mouseenter', changeImg);
        hoverImages[i].addEventListener('mouseleave', changeImg);
        hoverImages[i].addEventListener('focus', changeImg);
        hoverImages[i].addEventListener('focusout', changeImg);
    }
})();

},{}],5:[function(require,module,exports){
/*jslint browser: true, devel: true, eqeq: true, plusplus: true, sloppy: true, vars: true, white: true*/
(function(){
    function init(){
        var folderLinks = document.querySelectorAll('.top-nav__item a'),
            loadingSound = document.querySelector('.loading-screen__audio'),
            clickSound = document.querySelector('.click-sound');

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
        removeHidden('el', document.querySelector('.mac-bar_center'));
        removeHidden('el', document.querySelector('#nav-phone'));
        removeHidden('el', document.querySelector('#photos'));

        changeClass('add', document.querySelectorAll('.desktop-folder'), 'hidden');
        changeClass('add', document.querySelectorAll('.folder-content'), 'js');
        changeClass('add', folderLinks, 'link_style_desktop');
        changeClass('add', document.querySelectorAll('.detail'), 'hidden');
        changeClass('remove', folderLinks, 'link_style_normal');

        document.querySelector('.mac-bar_left').classList.add('hidden');
        document.querySelector('.mac-bar_right').classList.add('hidden');
        document.querySelector('.contact-info').classList.add('hidden');
        document.querySelector('body').classList.add('body-overflow-h');
        document.querySelector('.top-nav').classList.add('hidden');
        document.querySelector('#projects').classList.add('device-app_open');
        document.querySelector('body').classList.add('touch');
        document.querySelector('#projects').classList.remove('hidden');

        //If you're viewing this page on desktop
        if("ontouchstart" in document.documentElement == false){
            removeHidden('array', document.querySelectorAll('.dropdown'));
            removeHidden('el', document.querySelector('.eyeball'));
            removeHidden('el', document.querySelector('.fullscreen-folder'));
            removeHidden('el', document.querySelector('#print'));
            removeHidden('el', document.querySelector('#print-art'));
            removeHidden('el', document.querySelector('#nav-setting'));
            removeHidden('el', document.querySelector('#nav-messages'));
            removeHidden('el', document.querySelector('#nav-photos'));
            removeHidden('el', document.querySelector('#nav-chrome'));
            removeHidden('el', document.querySelector('#nav-trash'));
            removeHidden('el', document.querySelector('#settings'));
            removeHidden('el', document.querySelector('#latestproject'));

            changeClass('add', document.querySelectorAll('.dropdown'), 'hidden');
            changeClass('add', document.querySelectorAll('.desktop-folder'), 'hidden');
            changeClass('add', document.querySelectorAll('.desktop-folder'), 'desktop-folder_open');

            document.querySelector('body').classList.remove('touch');
            document.querySelector('.mac-bar_left').classList.remove('hidden');
            document.querySelector('.top-nav').classList.remove('hidden');
            document.querySelector('.mac-bar_right').classList.remove('hidden');
            document.querySelector('#projects').classList.remove('device-app_open');
            document.querySelector('.mac-bar_center').classList.add('hidden');
            document.querySelector('#nav-phone').classList.add('hidden');
            document.querySelector('.fullscreen-folder').classList.add('hidden');
            document.querySelector('#latestproject').classList.remove('hidden');

            window.addEventListener('hashchange', function(){
                if(location.hash == '#print'){
                    document.querySelector('.bottom-nav').classList.add('hidden');

                    var closePrint = function(){
                        document.querySelector('.bottom-nav').classList.remove('hidden');
                        document.querySelector('#print').classList.add('hidden');
                    };

                    setTimeout(function(){
                        window.print();
                        closePrint();
                    }, 1000);
                }
            });
        }

        //Screaming goat sound when 'fake loading'
        loadingSound.autoplay = true;
        loadingSound.load();

        setTimeout(function(){
            document.querySelector('.loading-screen').classList.add('hidden');
        }, 3001);

        //Click sound
        document.querySelector('body').addEventListener('click', function(){
            clickSound.autoplay = true;
            clickSound.load();
        });
    }

    init();
})();

},{}],6:[function(require,module,exports){
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

            checkIfApp(e);
        }, 1001);
    }

    function removeNavAndEye(){
        document.querySelector('.bottom-nav').classList.add('hidden');
        document.querySelector('.eyeball').classList.add('hidden');
    }

    topNavCon.addEventListener('click', checkIfApp);
    bottomNavCon.addEventListener('click', checkIfApp);
    macBar.addEventListener('click', checkIfApp);
    eye.addEventListener('click', function(e){
        animateFullscreen(e, removeNavAndEye);
    });

    for(var i = 0; i < dropDownButtons.length; i++){
        dropDownButtons[i].addEventListener('click', toggleDropDown);
    }
})();
//Single and double click function by Karbassi: https://gist.github.com/karbassi/639453

},{}],7:[function(require,module,exports){
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
            el.style.left = xOffset/16 + 'rem';
            el.style.top = yOffset/16 + 'rem';
        }, time);
    }

    function animatePornWindows(){
        var widthRange = window.innerWidth * 0.50,
            heightRange = window.innerHeight * 0.20;
        //Starting at 1 because the first one doesn't need to change positions
        for(i = 1; i < pornWindows.length; i++){
            var time = delay * i,
                xOffset = Math.floor((Math.random() * widthRange) + 10),
                yOffset = Math.floor((Math.random() * heightRange) +10);

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
        if(pornContainer.querySelector('.hidden')){
            called = false;
            for(i = 1; i < pornWindows.length; i++){
                pornWindows[i].classList.remove('.hidden');
            }
        }
    });
})();

},{}],8:[function(require,module,exports){
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

        mouseTimeout = setTimeout(function(){
            isActive = true;
            showScreensaver();
        }, 15000);

        //Hide screensaver if shown
        if(isActive == true){
            stopScreensaver();
        }
    }

    if("ontouchstart" in document.documentElement == false){
        document.addEventListener('mousemove', clearScreensaver);
        document.addEventListener('keydown', function(e){
            if(e.keyCode == 9){
                clearScreensaver();
            }
        });
    }
})();

},{}],9:[function(require,module,exports){
/*jslint browser: true, devel: true, eqeq: true, plusplus: true, sloppy: true, vars: true, white: true*/
(function(){
    var appleSliders = document.querySelectorAll('.a-slider__circle'),
        body = document.querySelector('body'),
        brightnessImgs = document.querySelectorAll('.brightness');

    var i,
        val;

    function getClickedColor(e){
        e.preventDefault();
        changeBodyColor(e.target.id);
    }

    function changeBodyColor(color){
        document.querySelector('.body-wrap').className = 'body-wrap' + ' ' + color;
    }

    function getValue(){
        val = document.querySelector('.range').value;

        if (val == 100){
            document.querySelector('.body-wrap').style.transform = 'scaleX(' + 1 + ')';
        } else {
            document.querySelector('.body-wrap').style.transform = 'scaleX(0.' + val + ')';
        }
    }

    function switchOnOff(e){
        if(e.target.parentNode.className.includes('switch-on')){
            e.target.parentNode.classList.remove('switch-on');
            getSetting(e.target.id, 'off');
        } else {
            e.target.parentNode.classList.add('switch-on');
            getSetting(e.target.id, 'on');
        }
    }

    function getSetting(id, state){
        if(id == 'btn-fullscreen'){
            setTimeout(fullscreen[state], 300);
        } else if (id == 'btn-brightness'){
            brightness[state]();
        }
    }

    var fullscreen = {
        on: function(){
            if(body.requestFullscreen){
                body.requestFullscreen();
            } else if(body.mozRequestFullScreen){
                body.mozRequestFullScreen();
            } else if(body.webkitRequestFullscreen){
                body.webkitRequestFullscreen();
            } else if(body.msRequestFullscreen){
                body.msRequestFullscreen();
            }
        },
        off: function(){
            if(document.exitFullscreen){
                document.exitFullscreen();
            } else if(document.mozCancelFullScreen){
                document.mozCancelFullScreen();
            } else if(document.webkitExitFullscreen){
                document.webkitExitFullscreen();
            } else if(document.msExitFullscreen){
                document.msExitFullscreen();
            }
        }
    };

    var brightness = {
        on: function(){
            for(var i = 0; i < brightnessImgs.length; i++){
                brightnessImgs[i].removeAttribute('hidden');
            }
        },
        off: function(){
            for(var i = 0; i < brightnessImgs.length; i++){
                brightnessImgs[i].setAttribute('hidden', 'true');
            }
        }
    }

    document.querySelector('.color-list').addEventListener('click', getClickedColor);
    document.querySelector('.range').addEventListener('change', getValue);

    for(i = 0; i < appleSliders.length; i++){
        appleSliders[i].addEventListener('click', switchOnOff);
    }
})();

},{}],10:[function(require,module,exports){
/*jslint browser: true, devel: true, eqeq: true, plusplus: true, sloppy: true, vars: true, white: true*/
(function(){
    var i;

    var slideButtons = document.querySelectorAll('.slideshow__nav-button'),
        slideShows = document.querySelectorAll('.slideshow');
        count = {};

    function getDirection(e){
        var prevCount,
            slideInfo = getSlideInfo(e);

        if(e.target.parentNode.id.includes('prev')){
            count[slideInfo.slideshow.id] == 0 ? count[slideInfo.slideshow.id] = slideInfo.amount - 1 : count[slideInfo.slideshow.id]--;
            animateSlideshow(count[slideInfo.slideshow.id], slideInfo);
        } else {
            count[slideInfo.slideshow.id] == slideInfo.amount - 1 ? count[slideInfo.slideshow.id] = 0 : count[slideInfo.slideshow.id]++;
            animateSlideshow(count[slideInfo.slideshow.id], slideInfo);
        }
    }

    function getSlideInfo(e){
        var slideCont = e.target.parentNode.parentNode.querySelector('.slideshow'),
            slides = slideCont.querySelectorAll('li'),
            rect = slideCont.getBoundingClientRect();

        return {
            amount: slides.length,
            width: rect.width / slides.length,
            parent: e.target.parentNode.parentNode,
            slideshow: e.target.parentNode.parentNode.querySelector('.slideshow')
        };
    }

    function animateSlideshow(to, slide){
        var position = to * slide.width;

        slide.parent.scroll({
            top: 0,
            left: position,
            behavior: 'smooth'
        });
    }

    for(i = 0; i < slideButtons.length; i++){
        slideButtons[i].addEventListener('click', getDirection);
    }
    for(i = 0; i < slideShows.length; i++){
        count[slideShows[i].id] = 0;
        slideShows[i].parentNode.style.overflowX = 'hidden';
    }
})();

},{}],11:[function(require,module,exports){
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

},{}]},{},[5,6,2,3,11,7,8,1,9,4,10]);
