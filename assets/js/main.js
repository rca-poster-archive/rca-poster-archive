function resetActive() {
	document.querySelector('.wrapper').classList.add('loading');
	// Remove active classname from all elements
	var elements = document.querySelectorAll('.active')
	for (var i = 0; i < elements.length; ++i){
		elements[i].classList.remove('active', 'small', 'medium', 'large', 'left','right');
	};
	// Function to select random attribute
	// Random widths
	var widths = ["small", "medium", "large"];
	var floats = ["right", "left"];
	// Random Properties
	var posterProperties = ['promoting','process','colour','year'];
	var selectedProperty = posterProperties[Math.floor(Math.random() * posterProperties.length)];
	// Set values based on property
	switch (selectedProperty) {
    case 'promoting':
        values = ['Film Society','ARK Magazine','Lectures','Exhibitions','Parties','Natural History','Music Society','Type Workshop'];
        break;
    case 'process':
        values = ['Offset','Screenprint','Letterpress','Hand','Digital','Linocut'];
        break;
    case 'colour':
        values = ['Red','White','Blue','Green','Black','Yellow','Orange','Multicoloured','Brown','Pink','Image','Gold','Purple','Grey'];
        break;
    case 'year':
        values = ['1970','1971','1972','1973','1974','1975','1976','1977', '1978']
	}
	// Select value of property
	var selectedValue = values[Math.floor(Math.random()*values.length)];
	// Update notices on front end
	document.getElementsByClassName("poster__property")[0].innerHTML = selectedProperty;
	document.getElementsByClassName('poster__value')[0].innerHTML = selectedValue;
	// Function to add active class to all elements matching random attribute
	var selectedPosters = document.querySelectorAll('[data-' + selectedProperty + '="' + selectedValue + '"]');
	for (var i = 0; i < selectedPosters.length; ++i){
		// Ideally these would be separated into their own functions but I want to speed up the javascript because there's so many images, so instead of doing multiple iterations they're all done here.
		// Set random float
		var selectedFloat = floats[Math.floor(Math.random()*floats.length)];
		// Set random width
		var selectedWidth = widths[Math.floor(Math.random()*widths.length)];
		// Set classnames
		selectedPosters[i].classList.add('active', selectedFloat, selectedWidth);
	};

	var list = document.querySelector('.active'), i;

	for (i = list.children.length; i >= 0; i--) {
		list.appendChild(list.children[Math.random() * i | 0]);
	};
	removeLoading();
}

function removeLoading() {
	document.querySelector('.wrapper').classList.remove('loading');
}

function toggleAside() {
	document.querySelector('.aside').classList.toggle('aside--active');
}

document.addEventListener("DOMContentLoaded", function(event) {
  document.getElementById("shuffle").onclick = resetActive;
  document.getElementById("info").onclick = toggleAside;
});
