(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
/*jslint browser: true, devel: true, eqeq: true, plusplus: true, sloppy: true, vars: true, white: true*/
(function(){
    var tabs = document.querySelectorAll('.tab'),
        links = document.querySelectorAll('.btn1-list__item'),
        tabNav = document.querySelector('.btn1-list_top');

    var i;

    function getHash(e){
        var id = e.target.hash,
            link = e.target;

        openTab(id, link);
    }

    function openTab(id, link){
        closeTabs();
        console.log(link);

        document.querySelector(id).classList.remove('hidden');
        link.parentNode.classList.add('btn1-list__item_active');
    }
    function closeTabs(){
        for(i = 0; i < tabs.length; i++){
            links[i].classList.remove('btn1-list__item_active');
            tabs[i].classList.add('hidden');
        }
    }

    if(window.innerWidth >= 1088){
        closeTabs();
        links[0].classList.add('btn1-list__item_active');
        tabs[0].classList.remove('hidden');

        tabNav.addEventListener('click', getHash);
    }
})();

},{}],2:[function(require,module,exports){
/*jslint browser: true, devel: true, eqeq: true, plusplus: true, sloppy: true, vars: true, white: true*/
(function(){
    function detectOrientation(){
        var orientation = window.innerWidth > window.innerHeight ? 'Landscape' : 'Portrait';

        var ua = navigator.userAgent.toLowerCase(),
            isAndroid = ua.indexOf('android') > -1;

        if(isAndroid){
            var orientationNum =  screen.orientation || screen.mozOrientation || screen.msOrientation || window.orientation;

            orientation = orientationNum.type === "portrait-secondary" || orientationNum.type === "portrait-primary" ? 'Portrait' : 'Landscape';
        }


        if(orientation == 'Landscape' && window.innerWidth < 1088 && document.getElementById('browser-old-overlay').hasAttribute('hidden')){
            document.getElementById('orientation-overlay').removeAttribute('hidden');
        } else {
            document.getElementById('orientation-overlay').setAttribute('hidden', '');
        }
    }

    detectOrientation();

    window.addEventListener('resize', function(){
        setTimeout(function(){
            detectOrientation();
        }, 5);
    });
})();

},{}],3:[function(require,module,exports){
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
            days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

        document.querySelector('.time').innerHTML = formatDate(days[d.getDay()], d.getHours(), d.getMinutes());

        //Check every half a second if the time has changed
        var timeout = setTimeout(updateTime, 500);
    }

    updateTime();
})();

},{}],4:[function(require,module,exports){
/*jslint browser: true, devel: true, eqeq: true, plusplus: true, sloppy: true, vars: true, white: true*/
(function(){
    var closeButtons = document.querySelectorAll('.close'),
        i;

    for(i = 0; i < closeButtons.length; i++){
        closeButtons[i].addEventListener('click', function(e){
            if(document.querySelector('.bottom-nav').className.includes('hidden')){
                document.querySelector('.bottom-nav').classList.remove('hidden');
            }
            e.target.parentNode.classList.add('hidden');
        });
    }
})();

},{}],5:[function(require,module,exports){
/*jslint browser: true, devel: true, eqeq: true, plusplus: true, sloppy: true, vars: true, white: true*/
(function(){
    var dragables = document.querySelectorAll('.drag'),
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
                    if(sectionY > 32){
                        section.style.top = sectionY + 'px';
                        section.style.left = sectionX + 'px';
                    }
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
            } else {
                dragContainer = e.target;
                containerX = dragContainer.offsetLeft;
                containerY = dragContainer.offsetTop;

                drag.starts(dragContainer, mouseX, mouseY, containerX, containerY, false);
            }
        }

    for(i = 0; i < dragables.length; i++){
        //No mouse/touchpad, no drag and drop
        dragables[i].addEventListener('mousedown', checkWhichElement);
    }

//Creating JavaScript drag and drop: https://codepen.io/nickmoreton/pen/ogryWa
//Getting mouse offset relative to section: http://jsfiddle.net/WhrFt/
})();

},{}],6:[function(require,module,exports){
/*jslint browser: true, devel: true, eqeq: true, plusplus: true, sloppy: true, vars: true, white: true*/
(function(){
    var slides = document.querySelectorAll('.slideshow__slide');

    var i;

    function getMousePosition(e){
        var rect = this.querySelector('.slideshow__pjt-title').getBoundingClientRect(),
            titleX = e.clientX,
            titleY = e.clientY;

        this.querySelector('.slideshow__pjt-title').style.left = titleX + 'px';
        this.querySelector('.slideshow__pjt-title').style.top = titleY + 'px';
    }

    for(i = 1; i < slides.length; i++){
        slides[i].addEventListener('mousemove', getMousePosition);
    }
})();

},{}],7:[function(require,module,exports){
/*jslint browser: true, devel: true, eqeq: true, plusplus: true, sloppy: true, vars: true, white: true*/
(function(){
    var hoverImages = document.querySelectorAll('.hover-img'),
        projectLinks = document.querySelectorAll('.folderlink');

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

    function scaleUp(e){
        var img = e.target.parentNode.parentNode.querySelector('.project-list__preview');
        img.classList.add('project-list__preview-bigger');
    }
    function scaleDown(e){
        var img = e.target.parentNode.parentNode.querySelector('.project-list__preview');
        img.classList.remove('project-list__preview-bigger');
    }

    if(window.innerWidth >= 1088){
        //For every image that needs a hover effect, add Eventlistener
        for(i = 0; i < hoverImages.length; i++){
            hoverImages[i].addEventListener('mouseenter', playSound);
            hoverImages[i].addEventListener('mouseenter', changeImg);
            hoverImages[i].addEventListener('mouseleave', changeImg);
            hoverImages[i].addEventListener('focus', changeImg);
            hoverImages[i].addEventListener('focusout', changeImg);
        }

        for(i = 0; i < projectLinks.length; i++){
            projectLinks[i].addEventListener('mouseenter', scaleUp);
            projectLinks[i].addEventListener('mouseleave', scaleDown);
            projectLinks[i].addEventListener('focus', scaleUp);
            projectLinks[i].addEventListener('focusout', scaleDown);
        }
    }
})();

},{}],8:[function(require,module,exports){
/*jslint browser: true, devel: true, eqeq: true, plusplus: true, sloppy: true, vars: true, white: true*/
(function(){
    function init(){
        var folderLinks = document.querySelectorAll('.top-nav__item a'),
            clickSound = document.querySelector('.click-sound'),
            scrollbars = document.querySelectorAll('.scrollbar'),
            deviceApps = [document.querySelector('#latestwork'), document.querySelector('#about'), document.querySelector('#projects')],
            projectInfoButtons = document.querySelectorAll('.see-project-info'),
            projectInfoClose = document.querySelectorAll('.project-info-close'),
            projectTitles = document.querySelectorAll('.project__desc .desktop-folder__title-span');

        var i;

        location.hash = "";

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

        removeHidden('array', deviceApps);
        removeHidden('array', document.querySelectorAll('.top-nav__item [hidden]'));
        removeHidden('array', document.querySelectorAll('.folder-nav'));
        removeHidden('array', document.querySelectorAll('.detail .close'));
        removeHidden('el', document.querySelector('.mac-bar'));
        removeHidden('el', document.querySelector('.bottom-nav'));
        removeHidden('el', document.querySelector('.mac-bar_center'));

        changeClass('add', deviceApps, 'mobile-app');
        changeClass('add', deviceApps, 'hidden');
        changeClass('add', document.querySelectorAll('.desktop-folder'), 'hidden');
        changeClass('add', document.querySelectorAll('.folder-content'), 'js');
        changeClass('add', folderLinks, 'link_style_desktop');
        changeClass('add', document.querySelectorAll('.detail'), 'hidden');
        changeClass('add', projectTitles, 'hidden');
        changeClass('remove', projectInfoButtons, 'hidden');
        changeClass('remove', scrollbars, 'scrollbar');
        changeClass('remove', folderLinks, 'link_style_normal');

        document.querySelector('#latestwork').classList.remove('hidden');
        document.querySelector('.mac-bar_left').classList.add('hidden');
        document.querySelector('.mac-bar_right').classList.add('hidden');
        document.querySelector('.contact-info').classList.add('hidden');
        document.querySelector('body').classList.add('body-overflow-h');
        document.querySelector('.top-nav').classList.add('hidden');

        window.addEventListener('hashchange', function(){
            if(location.hash == '#print'){
                print();
            }
            if(location.hash.includes('#project')){
                document.querySelector('#latestproject').style.zIndex = '1';
                document.querySelector('#latestwork').classList.add('hidden');
                document.querySelector('#projects').classList.remove('hidden');
                document.querySelector('.bottom-nav').classList.remove('hidden');
                document.querySelector(location.hash).classList.remove('hidden');
            }
        });

        //If you're viewing this page on desktop
        if(window.innerWidth >= 1088){
            var mobileIcons = document.querySelectorAll('bottom-nav__item-m');
            for(i = 1; i < mobileIcons; i++){
                mobileIcons[i].classList.add('hidden');
            }
            removeHidden('array', document.querySelectorAll('.dropdown'));
            removeHidden('array', document.querySelectorAll('.bottom-nav__item'));
            removeHidden('el', document.querySelector('.fullscreen-folder'));
            removeHidden('el', document.querySelector('#print-art'));
            removeHidden('el', document.querySelector('#settings'));
            removeHidden('el', document.querySelector('#photos'));
            removeHidden('el', document.querySelector('.porn'));
            removeHidden('el', document.querySelector('#latestproject'));
            removeHidden('el', document.querySelector('#trash'));

            changeClass('add', scrollbars, 'scrollbar');
            changeClass('remove', document.querySelectorAll('.desktop-folder__title-span'), 'hidden');
            changeClass('add', document.querySelectorAll('.see-project-info'), 'hidden');
            changeClass('add', document.querySelectorAll('.bottom-nav__item-m'), 'hidden');
            changeClass('add', document.querySelectorAll('.dropdown'), 'hidden');
            changeClass('add', document.querySelectorAll('.desktop-folder'), 'hidden');
            changeClass('add', document.querySelectorAll('.desktop-folder'), 'desktop-folder_open');
            document.querySelector('body').classList.remove('touch');
            document.querySelector('.mac-bar_left').classList.remove('hidden');
            document.querySelector('.top-nav').classList.remove('hidden');
            document.querySelector('.mac-bar_right').classList.remove('hidden');
            document.querySelector('#projects').classList.remove('device-app_open');
            document.querySelector('.mac-bar_center').classList.add('hidden');
            document.querySelector('#latestwork').classList.add('hidden');
            document.querySelector('.fullscreen-folder').classList.add('hidden');
            document.querySelector('#latestproject').classList.remove('hidden');
            document.querySelector('#trash').classList.add('hidden');
        }

        //Print artwork using library
        function print(){
            console.log('print');
            printJS('https://chanelzm.github.io/mariano-pascual/PrintArtwork.pdf', 'pdf');
        }

        function toggleProjectInfo(info, state){
            if(state == 'open'){
                info.querySelector('.folder-content').classList.remove('hidden');
                info.querySelector('.see-project-info').classList.add('hidden');
                info.querySelector('.desktop-folder__title-span').classList.remove('hidden');
            } else {
                console.log(info);
                info.querySelector('.folder-content').classList.add('hidden');
                info.querySelector('.see-project-info').classList.remove('hidden');
                info.querySelector('.desktop-folder__title-span').classList.add('hidden');
            }
        }

        window.addEventListener('load', function(){
            document.querySelector('.loading-screen').classList.add('hidden');
        });

        //Click sound
        document.querySelector('body').addEventListener('click', function(){
            clickSound.autoplay = true;
            clickSound.load();
        });

        if(window.innerWidth < 1088){
            var projectInfos = document.querySelectorAll('.project__desc .folder-content');

            for(i = 0; i < projectInfos.length; i++){
                projectInfos[i].classList.add('hidden');
            }

            for(i = 0; i < projectInfoButtons.length; i++){
                projectInfoButtons[i].addEventListener('click', function(e){
                    toggleProjectInfo(e.target.parentNode.parentNode, 'open');
                });
            }
            for(i = 0; i < projectInfoClose.length; i++){
                projectInfoClose[i].addEventListener('click', function(e){
                    toggleProjectInfo(e.target.parentNode.parentNode.parentNode, 'close');
                });
            }
        }
    }

    init();
})();

},{}],9:[function(require,module,exports){
/*jslint browser: true, devel: true, eqeq: true, plusplus: true, sloppy: true, vars: true, white: true*/
(function(){
    var topNavCon = document.querySelector('.top-nav'),
        bottomNavCon = document.querySelector('.bottom-nav'),
        folders = document.querySelectorAll('.top-nav__item'),
        dropDownButtons = document.querySelectorAll('.dropdown-button'),
        macBar = document.querySelector('.mac-bar'),
        windows = document.querySelectorAll('.window');

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
        if(section.classList.contains('window')){
            console.log('contains window');
            windowToFront(section);
        }

        //If you're viewing this page on desktop
        if(window.innerWidth >= 1088 && section.getAttribute('class').includes('desktop-folder')){
            if(section.getAttribute('class').includes('hidden')){
                section.classList.add('desktop-folder_open');
                section.classList.remove('hidden');
            }
        }
        if(window.innerWidth >= 1088 && section.getAttribute('id') == 'porn'){
            section.classList.remove('hidden');
        }
        //If you're viewing this page on desktop
        if(window.innerWidth >= 1088 && section.getAttribute('class').includes('fullscreen-folder')){
            section.removeAttribute('hidden');
            section.classList.remove('hidden');
        }
        //If you're viewing this page on a touch device, styling is different
        if (window.innerWidth < 1088) {
            var folders = document.querySelectorAll('.mobile-app');

            for(i = 0; i < folders.length; i++){
                folders[i].classList.add('hidden');
            }
            section.classList.remove('hidden');
        }
    }

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
            console.log('test');
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
        dropDownButtons[i].addEventListener('click', toggleDropDown);
    }
    if(window.innerWidth >= 1088){
        for(var i = 0; i < windows.length; i++){
            windows[i].addEventListener('click', findNearestWindowEl);
        }
    }
})();
//Single and double click function by Karbassi: https://gist.github.com/karbassi/639453

},{}],10:[function(require,module,exports){
/*jslint browser: true, devel: true, eqeq: true, plusplus: true, sloppy: true, vars: true, white: true*/
(function(){
    var pornLinks = document.querySelectorAll('[href="#porn"]'),
        pornWindows = document.querySelectorAll('.porn-window'),
        pornContainer = document.querySelector('.porn');

    var i;

    var delay = 900,
        called = false;

    function delayWindowOpen(el, time){
        setTimeout(function(){
            el.classList.remove('hidden');
        }, time)
    }

    function animatePornWindows(){
        for(i = 1; i < pornWindows.length; i++){
            var time = delay * i;
            delayWindowOpen(pornWindows[i], time);
        }
    }

    for(i = 0; i < pornLinks.length; i++){
        pornLinks[i].addEventListener('click', function(){
            setTimeout(function(){
                if(called == false){
                    document.querySelector('#porn1').classList.remove('hidden');
                    called = true;
                    animatePornWindows();
                }
            }, 2000);
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

},{}],11:[function(require,module,exports){
/*jslint browser: true, devel: true, eqeq: true, plusplus: true, sloppy: true, vars: true, white: true*/
(function(){
    var appleSliders = document.querySelectorAll('.a-slider__circle'),
        body = document.querySelector('body'),
        brightnessImgs = document.querySelectorAll('.brightness');

    var i,
        val;

    function toggleDropDown(){
        var dropDown = document.querySelector('.setting__dropdown');

        if(dropDown.className.includes('hidden')){
            dropDown.classList.remove('hidden');
        } else {
            dropDown.classList.add('hidden');
        }
    }

    function getFilter(e){
        e.preventDefault();

        var dropDown = document.querySelector('.setting__dropdown'),
            dropDownButton = document.querySelector('.setting__dropdown-button');

        dropDown.classList.add('hidden');
        dropDownButton.textContent = e.target.textContent;

        document.querySelector('body').className = 'body-overflow-h' + ' ' + e.target.id;
    }

    function getClickedColor(e){
        e.preventDefault();
        document.querySelector('.body-wrap').className = 'body-wrap' + ' ' + e.target.id;
    }

    function getValue(){
        val = document.querySelector('.range').value;

        if (val == 100){
            document.querySelector('.body-wrap').style.transform = 'scale(' + 1 + ')';
        } else {
            document.querySelector('.body-wrap').style.transform = 'scale(0.' + val + ')';
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
    document.querySelector('.setting__dropdown-button').addEventListener('click', toggleDropDown);
    document.querySelector('.setting__dropdown').addEventListener('click', getFilter);
    document.querySelector('.color-list').addEventListener('click', getClickedColor);
    document.querySelector('.range').addEventListener('change', getValue);

    for(i = 0; i < appleSliders.length; i++){
        appleSliders[i].addEventListener('click', switchOnOff);
    }
})();

},{}],12:[function(require,module,exports){
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

    if(window.innerWidth >= 1088){
        for(i = 0; i < slideButtons.length; i++){
            slideButtons[i].addEventListener('click', getDirection);
        }
        for(i = 0; i < slideShows.length; i++){
            count[slideShows[i].id] = 0;
            slideShows[i].parentNode.style.overflowX = 'hidden';
        }
    }
})();

},{}],13:[function(require,module,exports){
/*jslint browser: true, devel: true, eqeq: true, plusplus: true, sloppy: true, vars: true, white: true*/
(function(){
    var images = document.querySelectorAll('.trash__img'),
        bodyWidth = window.innerWidth,
        bodyHeight = window.innerHeight;

    var i;

    function randomizeImg(){
        for(i = 0; i < images.length; i++){
            var xPosition = randomCoordinate(bodyWidth),
                yPosition = randomCoordinate(bodyHeight),
                rotation = randomDeg(45);

            images[i].style.transform = 'translate(' + xPosition + 'px, ' + yPosition + 'px) rotate(' + rotation + 'deg)';
        }
    }

    function randomCoordinate(parent){
        var coordinate = Math.floor(Math.random() * (parent - 300));

        return coordinate;
    }

    function randomDeg(maxDeg){
        var direction = Math.random() < 0.5 ? '-' : '';
        return direction + Math.floor(Math.random() * maxDeg);
    }

    document.getElementById('nav-trash').addEventListener('click', randomizeImg);
})();

},{}],14:[function(require,module,exports){
/*jslint browser: true, devel: true, eqeq: true, plusplus: true, sloppy: true, vars: true, white: true*/
(function(){
    var detailSections = document.querySelectorAll('.detail'),
        folderLinks = document.querySelectorAll('.folderlink'),
        closeButtons = document.querySelectorAll('.project__close'),
        i;

    var detail = {
        open: function(e){
            var id = e.target.hash.replace('#',''),
                windows = document.getElementById(id).querySelectorAll('.window');

            for(i = 0; i < detailSections.length; i++){
                if(!detailSections[i].className.includes('hidden')){
                    detailSections[i].classList.add('hidden');
                }
            }

            document.getElementById(id).classList.remove('hidden');

            for(i = 0; i < windows.length; i++){
                windows[i].classList.remove('hidden');
            }
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

},{}]},{},[8,9,4,5,14,10,3,11,7,12,13,1,6,2]);
