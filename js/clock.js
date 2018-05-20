/*jslint browser: true, devel: true, eqeq: true, plusplus: true, sloppy: true, vars: true, white: true*/
(function(){
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
            days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

        document.querySelector('.time').innerHTML = formatDate(days[d.getDay()], d.getHours(), d.getMinutes());

        //Check every half a second if the time has changed
        var timeout = setTimeout(updateTime, 500);
    }

    updateTime();
})();
