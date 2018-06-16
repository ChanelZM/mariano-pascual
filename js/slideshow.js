/*jslint browser: true, devel: true, eqeq: true, plusplus: true, sloppy: true, vars: true, white: true*/
(function(){
    var i;

    var slideButtons = document.querySelectorAll('.slideshow__nav-button'),
        slideShows = document.querySelectorAll('.slideshow');
        count = {};

    function getDirection(e){
        var prevCount,
            slideInfo = getSlideInfo(e);

        if(e.target.parentNode.id.indexOf('prev') >= 0){
            count[slideInfo.slideshow.id] == 0 ? count[slideInfo.slideshow.id] = slideInfo.amount - 1 : count[slideInfo.slideshow.id]--;
            animateSlideshow(count[slideInfo.slideshow.id], slideInfo);
        } else {
            count[slideInfo.slideshow.id] == slideInfo.amount - 1 ? count[slideInfo.slideshow.id] = 0 : count[slideInfo.slideshow.id]++;
            animateSlideshow(count[slideInfo.slideshow.id], slideInfo);
        }
    }

    function getSlideInfo(e){
        var slideCont = e.target.parentNode.parentNode.querySelector('.slideshow'),
            slides = slideCont.querySelectorAll('li'),
            rect = slideCont.getBoundingClientRect();

        return {
            amount: slides.length,
            width: rect.width / slides.length,
            parent: e.target.parentNode.parentNode,
            slideshow: e.target.parentNode.parentNode.querySelector('.slideshow')
        };
    }

    function animateSlideshow(to, slide){
        var position = to * slide.width;

        slide.parent.scroll({
            top: 0,
            left: position,
            behavior: 'smooth'
        });
    }

    if(window.innerWidth >= 1088){
        for(i = 0; i < slideButtons.length; i++){
            slideButtons[i].addEventListener('click', getDirection);
        }
        for(i = 0; i < slideShows.length; i++){
            count[slideShows[i].id] = 0;
            slideShows[i].parentNode.style.overflowX = 'hidden';
        }
    }
})();
