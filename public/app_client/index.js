function parallax(){
    var giganticHeaderSpace = $('.header-content').outerHeight();
    var scrolled = $(window).scrollTop();
    $('.header-background-img')
      .css('height', (giganticHeaderSpace-(scrolled)) + 'px');
}

$(window).scroll(function(e){
    parallax();
});
