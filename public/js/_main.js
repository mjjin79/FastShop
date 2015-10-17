jQuery(function($) {
    $('.menubar > ul > li')
        .on('mouseover', function(event) {
        $(this).addClass('active');
    })
        .on('mouseout', function(event) {
        $(this).removeClass('active');
    });
    $('.carousel').carousel({
        intervcal: 1500,
        duration: 1000,
        autoStart: true
    });
});