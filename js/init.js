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

        changeClass('add', desktopFolderContent, 'hidden');
        changeClass('add', folderContent, 'js');
        changeClass('add', folderLinks, 'link_style_desktop');
        changeClass('add', detailSections, 'hidden');
        changeClass('remove', folderLinks, 'link_style_normal');

        document.querySelector('.contact-info').classList.add('hidden');

        loadingSound.autoplay = true;
        loadingSound.load();

        setTimeout(function(){
            loadingScreen.classList.add('hidden');
        }, 3001);
    }

    init();
})();
