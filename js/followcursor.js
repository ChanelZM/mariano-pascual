/*jslint browser: true, devel: true, eqeq: true, plusplus: true, sloppy: true, vars: true, white: true*/
(function(){
    var slides = document.querySelectorAll('.slideshow__slide');

    var i;

    function getMousePosition(e){
        var rect = this.querySelector('.slideshow__pjt-title').getBoundingClientRect(),
            titleHeight = rect.height/2,
            titleWidth = rect.width/2,
            titleX = e.clientX - titleWidth,
            titleY = e.clientY - titleHeight;

        this.querySelector('.slideshow__pjt-title').style.left = titleX + 'px';
        this.querySelector('.slideshow__pjt-title').style.top = titleY + 'px';
    }

    for(i = 1; i < slides.length; i++){
        slides[i].addEventListener('mousemove', getMousePosition);
    }
})();
