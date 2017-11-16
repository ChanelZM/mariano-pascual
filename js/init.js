/*jslint browser: true, devel: true, eqeq: true, plusplus: true, sloppy: true, vars: true, white: true*/
(function(){
    function init(){
        var folderImg = document.querySelectorAll('.top-nav__item [hidden]'),
            desktopFolderContent = document.querySelectorAll('.desktop-folder'),
            bottomNav = document.querySelector('.bottom-nav'),
            folderLinks = document.querySelectorAll('.top-nav__item a'),
            macBar = document.querySelector('.mac-bar'),
            folderNav = document.querySelectorAll('.folder-nav'),
            i,
            j,
            k,
            m;

        for(i = 0; i < folderImg.length; i++){
            folderImg[i].removeAttribute('hidden');
        }
        for(m = 0; m < folderNav.length; m++){
            folderNav[m].removeAttribute('hidden');
        }

        for(j = 0; j < desktopFolderContent.length; j++){
            desktopFolderContent[j].classList.add('desktop-folder_hidden');
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
