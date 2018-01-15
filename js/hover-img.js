/*jslint browser: true, devel: true, eqeq: true, plusplus: true, sloppy: true, vars: true, white: true*/
(function(){
    var hoverImages = document.querySelectorAll('.hover-img');

    var parent,
        i,
        src,
        splitSrc;

    function changeImg(e){
        parent = e.target.parentNode.parentNode;
        src = parent.children[0].getAttribute('src');

        if(src.includes('-hover')){
            splitSrc = src.split('-hover');
            parent.children[0].setAttribute('src', (splitSrc[0] + '.svg'));
        } else {
            splitSrc = src.split('.svg');
            parent.children[0].setAttribute('src', (splitSrc[0] + '-hover.svg'));
        }
    }

    for(i = 0; i < hoverImages.length; i++){
        hoverImages[i].addEventListener('mouseenter', changeImg);
        hoverImages[i].addEventListener('mouseleave', changeImg);
        hoverImages[i].addEventListener('focus', changeImg);
        hoverImages[i].addEventListener('focusout', changeImg);
    }
})();
