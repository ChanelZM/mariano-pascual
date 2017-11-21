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
            detailSections = document.querySelectorAll('.detail'),
            i;

        function removeAttribute(dataType, variable){
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

        removeAttribute('array', folderImg);
        removeAttribute('array', folderNav);
        removeAttribute('el', bottomNav);
        removeAttribute('el', macBar);

        changeClass('add', desktopFolderContent, 'desktop-folder_hidden');
        changeClass('add', folderContent, 'js');
        changeClass('add', folderLinks, 'link_style_desktop');
        changeClass('add', detailSections, 'detail_hidden');
        changeClass('remove', folderLinks, 'link_style_normal');
    }

    init();
})();
