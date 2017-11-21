/*jslint browser: true, devel: true, eqeq: true, plusplus: true, sloppy: true, vars: true, white: true*/
(function(){
    var detailSections = document.querySelectorAll('.detail'),
        folderLinks = document.querySelectorAll('.folderlink'),
        closeButtons = document.querySelectorAll('.detail .close'),
        i;

    var detail = {
        open: function(e){
            var id = e.target.hash.replace('#','');

            for(i = 0; i < detailSections.length; i++){
                if(!detailSections[i].className.includes('detail_hidden')){
                    detailSections[i].classList.add('detail_hidden');
                }
            }

            document.getElementById(id).classList.remove('detail_hidden');
        },
        close: function(e){
            e.target.parentNode.classList.add('detail_hidden');
        }
    };

    for(i = 0; i < folderLinks.length; i++){
        folderLinks[i].addEventListener('click', detail.open);
    }
    for(i = 0; i < closeButtons.length; i++){
        closeButtons[i].addEventListener('click', detail.close);
    }
})();
