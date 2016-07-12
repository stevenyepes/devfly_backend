// Parallax effect for a part of the header background
function parallax(){
    var giganticHeaderSpace = $('.header').outerHeight();
    var scrolled = $(window).scrollTop();
    $('.header-parallax')
      .css('height', (giganticHeaderSpace-(scrolled)) + 'px');
}

function shrinkNavbar(shrinkHeight){
  var scrolled = $(window).scrollTop();
  if (scrolled > shrinkHeight) {
    $('.navbar').addClass('navbar-small');
  }
  else {
    $('.navbar').removeClass('navbar-small');
  }
}

// Ready event
$(document).ready(function($) {
  
});

// Scroll event
$(window).scroll(function(e){
    // Achieve parallax for header
    parallax();
    shrinkNavbar(50);
});
