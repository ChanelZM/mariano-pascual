/*jslint browser: true, devel: true, eqeq: true, plusplus: true, sloppy: true, vars: true, white: true*/
(function(){
    function init(){
        var folderLinks = document.querySelectorAll('.top-nav__item a'),
            loadingSound = document.querySelector('.loading-screen__audio'),
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

        //Screaming goat sound when 'fake loading'
        loadingSound.autoplay = true;
        loadingSound.load();

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
