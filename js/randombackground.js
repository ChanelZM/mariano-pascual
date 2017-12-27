/*jslint browser: true, devel: true, eqeq: true, plusplus: true, sloppy: true, vars: true, white: true*/
(function(){
    var count = 0;

    var projects = [
        {
            name: 'Daniel & Emma',
            href: '#project1',
            imgSrc: 'http://payload541.cargocollective.com/1/5/167802/13130602/SayHiTo_slide_2000_c_2000_c.jpg'
        },
        {
            name: '36 Days of Type #2',
            href: '#project1',
            imgSrc: 'http://payload541.cargocollective.com/1/5/167802/13130373/A_2000_c.jpg'
        },
        {
            name: 'Penetrate',
            href: '#project1',
            imgSrc: 'http://payload490.cargocollective.com/1/5/167802/12119976/theastonshuffle_penetrate_2000_c.jpg'
        },
        {
            name: '36 Days of type',
            href: '#project1',
            imgSrc: 'http://payload388.cargocollective.com/1/5/167802/10074091/36slide_2_2000_c.jpg'
        },
        {
            name: 'Ghost Army',
            href: '#project1',
            imgSrc: 'http://payload432.cargocollective.com/1/5/167802/10946398/Ghost_Army_1_1000.jpg'
        },
        {
            name: 'Roald Dahl Tribute',
            href: '#project1',
            imgSrc: 'http://payload482.cargocollective.com/1/5/167802/11953073/lixivate-it-s-nice-that-09_2000_c.jpg'
        },
        {
            name: 'La velocidad de una fiesta',
            href: '#project1',
            imgSrc: 'http://payload474.cargocollective.com/1/5/167802/11789231/lvvduf_8_2000_c.jpg'
        },
        {
            name: 'Read nothing here',
            href: '#project1',
            imgSrc: 'http://payload447.cargocollective.com/1/5/167802/11257371/Read_cover_2000_c.jpg'
        },
        {
            name: 'Cherry Glazer',
            href: '#project1',
            imgSrc: 'http://payload490.cargocollective.com/1/5/167802/12107233/cherry_2000_c.jpg'
        }
        ,
        {
            name: 'Isamo Noguchi\'s sculptures',
            href: '#project1',
            imgSrc: 'http://payload490.cargocollective.com/1/5/167802/12112855/noguchi_total-06_900.jpg'
        },
        {
            name: 'The floating world',
            href: '#project1',
            imgSrc: 'http://payload407.cargocollective.com/1/5/167802/10453919/the-floating-world-02_2000_c.jpg'
        }
    ];

    function randomImg(){
        document.querySelector('.sldr-info').removeAttribute('hidden');

        checkCount();
        var backgroundImg = 'background-image: url(' + projects[count].imgSrc + ')';

        document.querySelector('body').classList.add('opac');

        setTimeout(function(){
            document.querySelector('body').classList.remove('opac');
            document.styleSheets[0].addRule('body::before', backgroundImg);
            document.querySelector('.sldr-info__link').innerHTML = projects[count].name;
            document.querySelector('.sldr-info__link').setAttribute('href', projects[count].href);
        }, 401);

        setTimeout(function(){
            count++;
            randomImg();
        }, 7000);
    }

    function checkCount(){
        if(count == projects.length){
            count = 0;
        }
    }

    // setTimeout(function(){
    //     document.querySelector('body').style.backgroundColor = 'white';
    //     randomImg();
    // }, 3000);
})();
