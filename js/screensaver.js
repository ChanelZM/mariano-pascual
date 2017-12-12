/*jslint browser: true, devel: true, eqeq: true, plusplus: true, sloppy: true, vars: true, white: true*/
(function(){
    var screensaver = document.querySelector('.screensaver'),
        screensaverRect = document.querySelector('.screensaver__rect');

    var isActive = false;

    // function changeColor(){
    //     var colors = ['#379FA9', '#FD8A83', '#50C1EC', '#FEE242', '#1CB59F', '#EB3E49', '#398CB0', '#F8D059'];
    //
    //     count == colors.length ? count = 1 : count++;
    //     console.log(count + ' ' + (count - 1));
    //     screensaver.style.backgroundColor = colors[count - 1];
    //     screensaverRect.style.backgroundColor = colors[count];
    //
    //     setTimeout(function(){
    //         changeColor();
    //     }, 2000);
    // }

    function showScreensaver(){
        screensaver.removeAttribute('hidden');
    }

    function stopScreensaver(){
        screensaver.setAttribute('hidden', 'true');

        isActive = false;
    }

    function clearScreensaver(){
        clearTimeout(mouseTimeout);

        if(isActive == true){
            stopScreensaver();
        }

        var mouseTimeout = setTimeout(function(){
            isActive = true;
            showScreensaver();
        }, 13000);
    }

    document.addEventListener('mousemove', clearScreensaver);
})();
