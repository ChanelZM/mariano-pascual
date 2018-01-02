/*jslint browser: true, devel: true, eqeq: true, plusplus: true, sloppy: true, vars: true, white: true*/
(function(){
    function getClickedColor(e){
        e.preventDefault();
        changeBodyColor(e.target.id);
    }

    function getValue(){
        val = document.querySelector('.range').value;
        console.log(val);
        if (val == 100){
            document.querySelector('.body-wrap').style.transform = 'scaleX(' + 1 + ')';
        } else {
            document.querySelector('.body-wrap').style.transform = 'scaleX(0.' + val + ')';
        }
    }

    function changeBodyColor(color){
        document.querySelector('.body-wrap').className = 'body-wrap' + ' ' + color;
    }

    document.querySelector('.color-list').addEventListener('click', getClickedColor);
    document.querySelector('.range').addEventListener('change', getValue);
})();
