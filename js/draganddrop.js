/*jslint browser: true, devel: true, eqeq: true, plusplus: true, sloppy: true, vars: true, white: true*/
(function(){
    var dropZone = document.querySelector('body'),
        elTriggerDrag = document.querySelectorAll('.drag');

    var drag = {
        start: function(){
            console.log('drag start');
        },
        over: function(){
            console.log('drag over');
        },
        enter: function(){
            console.log('drag enter');
        },
        drop: function(){
            console.log('drop');
        },
        end: function(){
            console.log('drag end');
        }
    };
})();
