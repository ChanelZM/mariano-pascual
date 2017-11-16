/*jslint browser: true, devel: true, eqeq: true, plusplus: true, sloppy: true, vars: true, white: true*/
(function(){
    function init(){
        var folderImg = document.querySelectorAll('.top-nav__item [hidden]'),
            desktopFolderContent = document.querySelectorAll('.desktop-folder'),
            bottomNav = document.querySelector('.bottom-nav'),
            i,
            j;

        for(i = 0; i < folderImg.length; i++){
            folderImg[i].removeAttribute('hidden');
        }

        for(j = 0; j < desktopFolderContent.length; j++){
            desktopFolderContent[j].classList.add('desktop-folder__hidden');
        }

        bottomNav.removeAttribute('hidden');
    }

    init();
})();
