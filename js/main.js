$(document).ready(function() {

	var widths = ["four", "five", "six"];
	var floats = ["right", "left"];

    $(".poster").each(function() {
        // $( this ).addClass( "foo" );
        randomwidth = Math.floor(Math.random() * widths.length);
        randomfloat = Math.floor(Math.random() * floats.length);

        // $(this).css("width", width+"%");
        $(this).addClass(widths[randomwidth]);
        $(this).addClass(floats[randomfloat]);
        // $(this).addClass(text[randomtext]);

    });

});

(function($){

    $.fn.shuffle = function() {

        var allElems = this.get(),
            getRandom = function(max) {
                return Math.floor(Math.random() * max);
            },
            shuffled = $.map(allElems, function(){
                var random = getRandom(allElems.length),
                    randEl = $(allElems[random]).clone(true)[0];
                allElems.splice(random, 1);
                return randEl;
           });

        this.each(function(i){
            $(this).replaceWith($(shuffled[i]));
        });

        return $(shuffled);

    };

})(jQuery);

$('.poster').shuffle();
