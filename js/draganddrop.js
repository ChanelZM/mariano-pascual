/*jslint browser: true, devel: true, eqeq: true, plusplus: true, sloppy: true, vars: true, white: true*/
(function(){
    var elTriggerDrag = document.querySelectorAll('.drag'),
        body = document.querySelector('body'),
        i,
        moving;

    var drag = {
        starts: function(e){
            //Get the parent to drag the whole section
            var section = e.target.parentNode;
            moving = true;

            var relativeX = e.clientX - section.offsetLeft,
                relativeY = e.clientY - section.offsetTop;

            document.addEventListener('mousemove', function(e){
                //Otherwise this will still be true when you're not holding the mouse but simply hovering
                if (moving === true){
                    //Get the coordinates of the mouse
                    var sectionX = e.clientX - relativeX,
                        sectionY = e.clientY - relativeY;

                    //place the section where the mouse is located
                    section.style.top = sectionY + 'px';
                    section.style.left = sectionX + 'px';
                }
            });
        },
        end: function(){
            moving = false;
        }
    };

    for(i = 0; i < elTriggerDrag.length; i++){
        elTriggerDrag[i].addEventListener('mousedown', drag.starts);
    }

    body.addEventListener('mouseup', drag.end);

//Creating JavaScript drag and drop: https://codepen.io/nickmoreton/pen/ogryWa
//Getting mouse offset relative to section: http://jsfiddle.net/WhrFt/
})();
