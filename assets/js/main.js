var posterProperties = ['promoting','process','colour','year','designer','orientation']
var randomProperty = posterProperties[Math.floor(Math.random() * posterProperties.length)];

$(document).ready(function() {

	var widths = ["small", "medium", "large"];
	var floats = ["right", "left"];

    $(".poster").each(function() {
        randomwidth = Math.floor(Math.random() * widths.length);
        randomfloat = Math.floor(Math.random() * floats.length);
        $(this).addClass(widths[randomwidth]);
        $(this).addClass(floats[randomfloat]);
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
