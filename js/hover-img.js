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

        var splits = src.split('img/icon-');
        var iconName = splits[1].split('.svg');
        console.log(splits);

        switch (iconName[0]){
            case 'about':
                console.log('about');
                document.querySelector('about-sound').autoplay = true;
                document.querySelector('about-sound').play();
                break;
            case 'bin':
                console.log('bin');
                document.querySelector('bin-sound').autoplay = true;
                document.querySelector('bin-sound').play();
                break;
            case 'folder':
                //play folder sound
                console.log('folder');
                break;
            case 'home':
                //play home sound
                console.log('home');
                break;
            case 'mail':
                //play mail sound
                console.log('mail');
                break;
            // case message:
            //     //play message sound
            //     break;
            // case photos:
            //     //play photos sound
            //     break;
            case 'printer':
                //play printer sound
                console.log('printer');
                break;
            case 'settings':
                //play settings sound
                console.log('settings');
                break;
            case 'web':
                //play web sound
                console.log('web');
                break;
        }
    }

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
        hoverImages[i].addEventListener('mouseenter', playSound);
        hoverImages[i].addEventListener('mouseenter', changeImg);
        hoverImages[i].addEventListener('mouseleave', changeImg);
        hoverImages[i].addEventListener('focus', changeImg);
        hoverImages[i].addEventListener('focusout', changeImg);
    }
})();
