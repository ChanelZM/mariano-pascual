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
        if(src.indexOf('-hover') >= 0){
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
