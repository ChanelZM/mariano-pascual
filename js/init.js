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
        removeHidden('el', document.querySelector('.mac-bar_center'));
        removeHidden('el', document.querySelector('#nav-phone'));

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
            removeHidden('el', document.querySelector('#print'));
            removeHidden('el', document.querySelector('#snake'));
            removeHidden('el', document.querySelector('#print-art'));
            removeHidden('el', document.querySelector('#nav-setting'));
            removeHidden('el', document.querySelector('#nav-snake'));
            removeHidden('el', document.querySelector('#nav-chrome'));
            removeHidden('el', document.querySelector('#nav-trash'));
            removeHidden('el', document.querySelector('#settings'));
            removeHidden('el', document.querySelector('#tumblr'));

            document.querySelector('body').classList.remove('touch');
            document.querySelector('.mac-bar_left').classList.remove('hidden');
            document.querySelector('.top-nav').classList.remove('hidden');
            document.querySelector('.mac-bar_right').classList.remove('hidden');
            document.querySelector('#projects').classList.remove('device-app_open');
            document.querySelector('.mac-bar_center').classList.add('hidden');
            document.querySelector('#nav-phone').classList.add('hidden');
            document.querySelector('#projects').classList.add('desktop-folder_open');

            document.getElementById('print-art').addEventListener('click', function(){
                document.querySelector('.bottom-nav').classList.add('hidden');

                var closePrint = function(){
                    document.querySelector('.bottom-nav').classList.remove('hidden');
                    document.querySelector('#print').classList.add('hidden');
                };

                setTimeout(function(){
                    window.print();
                    closePrint();
                }, 1000);
            });
        }

        //Screaming goat sound when 'fake loading'
        loadingSound.autoplay = true;
        loadingSound.load();

        setTimeout(function(){
            document.querySelector('.loading-screen').classList.add('hidden');
        }, 3001);
    }

    init();
})();
