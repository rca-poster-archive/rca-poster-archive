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
