/*jslint browser: true, devel: true, eqeq: true, plusplus: true, sloppy: true, vars: true, white: true*/
(function(){
    var tabs = document.querySelectorAll('.tab'),
        links = document.querySelectorAll('.btn1-list__item'),
        tabNav = document.querySelector('.btn1-list_top');

    var i;

    function getHash(e){
        var id = e.target.hash,
            link = e.target;

        openTab(id, link);
    }

    function openTab(id, link){
        closeTabs();
        console.log(link);

        document.querySelector(id).classList.remove('hidden');
        link.parentNode.classList.add('btn1-list__item_active');
    }
    function closeTabs(){
        for(i = 0; i < tabs.length; i++){
            links[i].classList.remove('btn1-list__item_active');
            tabs[i].classList.add('hidden');
        }
    }

    if(window.innerWidth >= 1088){
        closeTabs();
        links[0].classList.add('btn1-list__item_active');
        tabs[0].classList.remove('hidden');

        tabNav.addEventListener('click', getHash);
    }
})();
