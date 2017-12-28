/*jslint browser: true, devel: true, eqeq: true, plusplus: true, sloppy: true, vars: true, white: true*/
(function(){
    function init(){
        var folderLinks = document.querySelectorAll('.top-nav__item a'),
            loadingSound = document.querySelector('.loading-screen__audio');

        var i;

        function removeHidden(dataType, variable){
            if(dataType == 'array'){
                for(i = 0; i < variable.length; i++){
                    variable[i].removeAttribute('hidden');
                }
            }
            if(dataType == 'el'){
                variable.removeAttribute('hidden');
            }
        }

        function changeClass(change, variable, className){
            if(change == 'add'){
                for(i = 0; i < variable.length; i++){
                    variable[i].classList.add(className);
                }
            }
            if(change == 'remove'){
                for(i = 0; i < variable.length; i++){
                    variable[i].classList.remove(className);
                }
            }
        }

        removeHidden('array', document.querySelectorAll('.top-nav__item [hidden]'));
        removeHidden('array', document.querySelectorAll('.folder-nav'));
        removeHidden('array', document.querySelectorAll('.detail .close'));
        removeHidden('array', document.querySelectorAll('.porn-window'));
        removeHidden('el', document.querySelector('.mac-bar'));
        removeHidden('el', document.querySelector('.bottom-nav'));
        removeHidden('el', document.querySelector('.loading-screen'));
        removeHidden('el', document.querySelector('#snake'));
        removeHidden('el', document.querySelector('#print'));

        changeClass('add', document.querySelectorAll('.desktop-folder'), 'hidden');
        changeClass('add', document.querySelectorAll('.folder-content'), 'js');
        changeClass('add', folderLinks, 'link_style_desktop');
        changeClass('add', document.querySelectorAll('.detail'), 'hidden');
        changeClass('remove', folderLinks, 'link_style_normal');

        document.querySelector('.contact-info').classList.add('hidden');
        document.querySelector('body').classList.add('body-overflow-h');
        document.querySelector('#projects').classList.remove('hidden');
        document.querySelector('#projects').classList.add('desktop-folder_open');

        loadingSound.autoplay = true;
        loadingSound.load();

        setTimeout(function(){
            document.querySelector('.loading-screen').classList.add('hidden');
        }, 3001);

        document.getElementById('print-art').addEventListener('click', function(){
            document.querySelector('.bottom-nav').classList.add('hidden');

            var closePrint = function(){
                document.querySelector('.bottom-nav').classList.remove('hidden');
                document.querySelector('#print').classList.add('hidden');
            };

            setTimeout(function(){
                window.print();
                closePrint();
            }, 1000);
        });

        //Functions that handle the clock
        function parseHourMin(num){
            var parseNum;

            //Otherwise there will only be one digit when the minute/hour is less then 10
            if(num < 10){
                parseNum = '0' + num;
            } else {
                parseNum = num;
            }
            return parseNum;
        }

        //Change date into correct apple format
        function formatDate(day, hour, min){
            var parseHour = parseHourMin(hour),
                parseMin = parseHourMin(min),
                date = day + ' ' + parseHour + ':' + parseMin;

            return date;
        }

        function updateTime(){
            var d = new Date(),
                days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

            document.querySelector('.time').innerHTML = formatDate(days[d.getDay() -1], d.getHours(), d.getMinutes());

            //Check every half a second if the time has changed
            var timeout = setTimeout(updateTime, 500);
        }

        updateTime();
    }

    init();
})();
