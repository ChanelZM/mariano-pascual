/*jslint browser: true, devel: true, eqeq: true, plusplus: true, sloppy: true, vars: true, white: true*/
// (function(){
//     var elTriggerDrag = document.querySelectorAll('.desktop-folder__title.drag'),
//         elemTriggerDrag = document.querySelectorAll('a.drag'),
//         body = document.querySelector('body'),
//         i,
//         moving;
//
//     var drag = {
//         starts: function(e){
//             //Get the parent to drag the whole section
//             var section = e.target.parentNode;
//             moving = true;
//
//             var relativeX = e.clientX - section.offsetLeft,
//                 relativeY = e.clientY - section.offsetTop;
//
//             document.addEventListener('mousemove', function(e){
//                 //Otherwise this will still be true when you're not holding the mouse but simply hovering
//                 if (moving === true){
//                     //Get the coordinates of the mouse
//                     var sectionX = e.clientX - relativeX,
//                         sectionY = e.clientY - relativeY;
//
//                     //place the section where the mouse is located
//                     section.style.top = sectionY + 'px';
//                     section.style.left = sectionX + 'px';
//                 }
//             });
//         },
//         startss: function(e){
//
//         },
//         end: function(){
//             moving = false;
//         }
//     };
//
//     for(i = 0; i < elTriggerDrag.length; i++){
//         elTriggerDrag[i].addEventListener('mousedown', drag.starts);
//     }
//
//     for(j = 0; j < elTriggerDrag.length; j++){
//         elemTriggerDrag[j].addEventListener('mousedown', drag.startss);
//     }
//
//     body.addEventListener('mouseup', drag.end);
// })();
(function(){
    var elTriggerDrag = document.querySelectorAll('.drag'),
        body = document.querySelector('body'),
        i,
        moving,
        containerX,
        containerY;
    console.log(elTriggerDrag);

    var dragContainer,
        mouseX,
        mouseY;

    var drag = {
        starts: function(section, mouseX, mouseY, containerX, containerY, boolean){
            console.log(section);
            moving = true;

            var relativeX = mouseX - containerX,
                relativeY = mouseY - containerY;

            document.addEventListener('mousemove', function(e){
                //Otherwise this will still be true when you're not holding the mouse but simply hovering
                if (moving === true){
                    if(boolean == true){
                        section.classList.add('move');
                    }
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

        function checkWhichElement(e){
            e.preventDefault();
            if(e.target.className.includes('link_style')){
                dragContainer = e.target.parentNode.parentNode.parentNode;
                mouseX = e.clientX;
                mouseY = e.clientY;
                containerX = dragContainer.offsetLeft;
                containerY = dragContainer.offsetTop;

                drag.starts(dragContainer, mouseX, mouseY, containerX, containerY, true);

            } else if(e.target.className.includes('desktop-folder')){
                dragContainer = e.target.parentNode;
                mouseX = e.clientX;
                mouseY = e.clientY;
                containerX = dragContainer.offsetLeft;
                containerY = dragContainer.offsetTop;

                drag.starts(dragContainer, mouseX, mouseY, containerX, containerY, false);
            }
        }

    for(i = 0; i < elTriggerDrag.length; i++){
        console.log(i);
        elTriggerDrag[i].addEventListener('mousedown', checkWhichElement);
    }

    body.addEventListener('mouseup', drag.end);

//Creating JavaScript drag and drop: https://codepen.io/nickmoreton/pen/ogryWa
//Getting mouse offset relative to section: http://jsfiddle.net/WhrFt/
})();
