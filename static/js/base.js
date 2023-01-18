var addthis_config={data_track_addressbar:!0};

$(window).scroll(function() {
    if ($(this).scrollTop() > 500) {
        $('.go-top').addClass('show')
    }
    else {
        $('.go-top').removeClass('show')
    }

    if ($(this).scrollTop() < 500) {
        $('.go-bottom').addClass('show')
    }
    else {
        $('.go-bottom').removeClass('show')
    }

    $('body').css('background-position', 'center ' + (-window.pageYOffset / 8) + 'px')
    $('.header-paralax').css('background-position', 'center ' + (-window.pageYOffset / 2) + 'px')

    $('.paralax').each(function() {
        var position = (-window.pageYOffset) + $(this).offset().top

        position = -(position / 8)

        if (position >= ($(this).height() + $(this).height() / 2)) {
            position = 'bottom'
        }
        else if (position < -($(this).height() / 2)) {
            position = 'top'
        }
        else {
            position += 'px'
        }

        console.log(position)

        $(this).css('background-position', 'center ' + position)
    })
})

var t2 = new SplitText('.txt2').chars,
    color2 = '#17c0fd',
    color1 = '#fff',
    moveBar = ()=>{ gsap.set('.bar', {left:gsap.getProperty('.txt1','width') + 1}) };

gsap.timeline({delay:0.2})
    .set('.txt1',   {color:color1, fontWeight:'regular'})
    .set('.txt2',   {color:color2, fontWeight:'bold', opacity:0, x:gsap.getProperty('.txt1','width')-2, immediateRender:true})
    .set('.bar',    {left:1, backgroundColor:color1, immediateRender:true})

    .to('.bar',     {duration:0.1, opacity:0, ease:Expo.easeIn, yoyo:true, repeat:5, repeatDelay:0.3}, 0)
    .from('.txt1',  {duration:1.1, width:0, ease:SteppedEase.config(14), onUpdate:moveBar}, 2.5)
    .to('.bar',     {duration:0.05, backgroundColor:color2}, '+=0.15')
    .to('.bar',     {duration:1.0, width:290, ease:Power4.easeInOut}, '+=0.1')
    .from('.sca',     {duration:1.0, x:135, ease:Power4.easeInOut}, '-=1.0')
    .to('.txt2',    {duration:0.01, opacity:1}, '-=0.1')
    .to('.bar',     {duration:0.4, x:290, width:0, ease:Power4.easeIn})
    .from(t2,       {duration:0.6, opacity:0, ease:Power3.easeInOut, stagger:0.02}, '-=0.5')
    .to('.txt1',    {duration:1.5, opacity:0.25, ease:Power3.easeInOut}, '-=1.2')
    .timeScale(1.45)