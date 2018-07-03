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
                if(!detailSections[i].className.indexOf('hidden') >= 0){
                    detailSections[i].classList.add('hidden');
                }
            }

            document.getElementById(id).classList.remove('hidden');

            loadImages(document.querySelector(e.target.hash));

            for(i = 0; i < windows.length; i++){
                windows[i].classList.remove('hidden');
            }
        },
        close: function(e){
            e.target.parentNode.classList.add('hidden');

            if(e.target.parentNode.querySelector('.project__desc').className.indexOf('hidden') >= 0){
                e.target.parentNode.querySelector('.project__desc').classList.remove('hidden');
            }
        }
    };

    function loadImages(parent){
        [].forEach.call(parent.querySelectorAll('img[data-src]'), function(img) {
            img.setAttribute('src', img.getAttribute('data-src'));
            img.removeAttribute('data-src');
            img.style.opacity = '0';
            setTimeout(function(){
                img.style.opacity = '1';
            }, 150);
        });
    }

    for(i = 0; i < folderLinks.length; i++){
        folderLinks[i].addEventListener('click', detail.open);
    }
    for(i = 0; i < closeButtons.length; i++){
        closeButtons[i].addEventListener('click', detail.close);
    }
})();
