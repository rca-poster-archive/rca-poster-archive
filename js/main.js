$( document ).ready(function() {
    $('.column img').shuffle();

$( ".column div" ).each(function() {
  // $( this ).addClass( "foo" );
  randomwidth = Math.floor(Math.random() * widths.length);
  randomfloat = Math.floor(Math.random() * floats.length);
  randomtext = Math.floor(Math.random() * text.length);

// $(this).css("width", width+"%"); 
$(this).addClass(widths[randomwidth]);
$(this).addClass(floats[randomfloat]);
// $(this).addClass(text[randomtext]);

});
 
});

var widths = ["one", "two", "three", "four", "five", "six"];
var floats = ["right", "left"];
var text = ["above", "below"];



$('.column div').hover(function() {
 $(this).find('.hiddentext').slideDown();
}, function() {
 $(this).find('.hiddentext').slideUp();
});