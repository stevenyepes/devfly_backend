// Constructor for SVG logo transition
var navLogo = new SVGMorpheus('#nav-devfly');

// Calculate header height, so ... navbar always start at bottom of screen
function recalculateHeaderHeight(){
  var calculatedHeight = $(window).height() - $('.navbar').height();
  $('.header-background').css('height', calculatedHeight);
  $('.header-content').css('height', calculatedHeight);
}

// Parallax effect for a part of the header background
function parallax(){
    var giganticHeaderSpace = $('.header-content').outerHeight();
    var scrolled = $(window).scrollTop();
    $('.header-background-img')
      .css('height', (giganticHeaderSpace-(scrolled)) + 'px');
}

// Ready event
$( document ).ready(function() {
  recalculateHeaderHeight();
  // Initial value for the logo transition
  navLogo.to('Dev', {duration: 250}, null);
});

// Scroll event
$(window).scroll(function(e){
    // Achieve parallax for header
    parallax();
    // Sticky navbar when the time comes
    if ($(window).scrollTop() > $(window).height() - $('.navbar').height()) {
      // Put navbar in top
        $('.navbar').addClass('navbar-fixed');
    } else {
      // navbar again in start position
        $('.navbar').removeClass('navbar-fixed');
    }
});

// Hover function on navbar
$('.navbar-clickable').hover(function(){
  // Animate on hover
  navLogo.to('Burger', {duration: 350, rotation: 'clockwise'}, null);
}, function(){
  navLogo.to('Dev', {duration: 350, rotation: 'none'}, null);
});

// Sidebar activation
$('.navbar-clickable').click(function(){
  $('.navbar-side').toggleClass('navbar-side-open');
});

// Close sidebar when click in anything else
$('body').click(function(event){
  if (!$(event.target).is('#navbar, .navbar-side, .navbar-side > *, .navbar-clickable')) {
    $('.navbar-side').removeClass('navbar-side-open');
  }
});
