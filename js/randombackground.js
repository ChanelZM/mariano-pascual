/*jslint browser: true, devel: true, eqeq: true, plusplus: true, sloppy: true, vars: true, white: true*/
(function(){
    document.querySelector('body').style.backgroundColor = 'white';

    var count = 0;

    var srcImg = ['http://payload541.cargocollective.com/1/5/167802/13130602/SayHiTo_slide_2000_c_2000_c.jpg',
                'http://payload541.cargocollective.com/1/5/167802/13130373/A_2000_c.jpg',
                'http://payload490.cargocollective.com/1/5/167802/12119976/theastonshuffle_penetrate_2000_c.jpg',
                'http://payload388.cargocollective.com/1/5/167802/10074091/36slide_2_2000_c.jpg',
                'http://payload432.cargocollective.com/1/5/167802/10946398/Ghost_Army_1_1000.jpg',
                'http://payload482.cargocollective.com/1/5/167802/11953073/lixivate-it-s-nice-that-09_2000_c.jpg',
                'http://payload474.cargocollective.com/1/5/167802/11789231/lvvduf_8_2000_c.jpg',
                'http://payload447.cargocollective.com/1/5/167802/11257371/Read_cover_2000_c.jpg',
                'http://payload490.cargocollective.com/1/5/167802/12107233/cherry_2000_c.jpg',
                'http://payload490.cargocollective.com/1/5/167802/12112855/noguchi_total-06_900.jpg',
                'http://payload407.cargocollective.com/1/5/167802/10453919/the-floating-world-02_2000_c.jpg'];

    function randomImg(){
        checkCount();
        var backgroundImg = 'background-image: url(' + srcImg[count] + ')';

        document.querySelector('body').classList.add('opac');

        setTimeout(function(){
            document.querySelector('body').classList.remove('opac');
            document.styleSheets[0].addRule('body::before', backgroundImg);
        }, 401);

        setTimeout(function(){
            count++;
            randomImg();
        }, 5000);
    }

    function checkCount(){
        if(count == srcImg.length){
            count = 0;
        }
    }

    randomImg();
})();
