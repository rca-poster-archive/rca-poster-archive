function resetSelectedPosters() {
	document.querySelector('.wrapper').classList.add('loading');
	// Scroll to top of the page. Should prevent as many images being loaded as well as prevent people losing their place on the site.
	var anchor = document.querySelector('#body');
	smoothScroll.animateScroll( anchor );
	// Remove active classname from all elements
	var elements = document.querySelectorAll('.poster--selected');
	for (var i = 0; i < elements.length; ++i){
		elements[i].classList.remove('poster--selected', 'small', 'medium', 'large', 'left','right', 'poster--active');
	}
	// Function to select random attribute
	// Random widths
	var widths = ['small', 'medium', 'large'];
	var floats = ['right', 'left'];
	// Random Properties
	var posterProperties = ['promoting','process','colour','decade'];
	var selectedProperty = posterProperties[Math.floor(Math.random() * posterProperties.length)];
	var values = [];
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
	case 'decade':
		values = ['1930s','1940s','1950s','1960s','1970s','1980s','1990s','2000s'];
	}
	// Select value of property
	var selectedValue = values[Math.floor(Math.random()*values.length)];
	// Update notices on front end
	document.getElementsByClassName('poster__property')[0].innerHTML = selectedProperty;
	document.getElementsByClassName('poster__value')[0].innerHTML = ' (' + selectedValue + ')';
	// Function to add active class to all elements matching random attribute
	var selectedPosters = document.querySelectorAll('[data-' + selectedProperty + '="' + selectedValue + '"]');
	for (var i = 0; i < selectedPosters.length; ++i){
		// Ideally these would be separated into their own functions but I want to speed up the javascript because there's so many images, so instead of doing multiple iterations they're all done here.
		// Set random float
		var selectedFloat = floats[Math.floor(Math.random()*floats.length)];
		// Set random width
		var selectedWidth = widths[Math.floor(Math.random()*widths.length)];
		// Set classnames
		selectedPosters[i].classList.add('poster--selected', selectedFloat, selectedWidth);
	}

	var selectedContainer = document.querySelector('.main');
	for (i = selectedPosters.length; i >= 0; i--) {
		selectedContainer.appendChild(selectedPosters[Math.random() * i | 0]);
	}

	removeLoading();
}

function removeLoading() {
	document.querySelector('.wrapper').classList.remove('loading');
}

function toggleAside() {
	removeActivePosters();
	document.querySelector('.aside').classList.toggle('aside--active');
	document.querySelector('.button__info').classList.toggle('.button__info--active');
	document.querySelector('body').classList.toggle('body--no-overflow');
}

function toggleActivePosters() {
	var activePosters = document.querySelectorAll('.poster--active');
	if (this.classList.contains('poster--active')) {
		this.classList.remove('poster--active');
	} else {
		if (activePosters.length >= 1) {
			removeActivePosters();
		}
		this.classList.add('poster--active');
	}
}

function removeActivePosters() {
	var activePosters = document.querySelectorAll('.poster--active');
	for (var i = 0; i < activePosters.length; i++) {
		activePosters[i].classList.remove('poster--active');
	}
}

// Get the current theme colour by reading the localstorage
function getThemeColour() {
	var themeColour = localStorage.getItem('themeColour');
	return themeColour;
}

// Set the theme colour by writing to localstorage and updating the relevant classlist
function setThemeColour(newColour, altColour) {
	localStorage.setItem('themeColour', newColour);
	document.querySelector('.button__contrast').innerHTML = altColour;
}

function switchThemeColour(){
	currentThemeColour = getThemeColour()
	if (currentThemeColour === 'primary'){
		setThemeColour('secondary', 'White');
	} else if (currentThemeColour === 'secondary') {
		setThemeColour('primary', 'Black');
	}
	document.body.classList.toggle('contrast');
}

// This is outside the DOMContentLoaded section becuase it needs to run quickly, as it depends on localstoage rather than elements it can be trusted to load first.
// Find current theme colour from local storage
currentThemeColour = getThemeColour();
// Sets theme according to current state
if (currentThemeColour == null) {
	setThemeColour('primary', 'Black');
} else if (currentThemeColour == 'primary') {
	setThemeColour('primary', 'Black');
} else if (currentThemeColour == 'secondary') {
	setThemeColour('secondary', 'White');
	document.body.classList.add('contrast');
}

document.addEventListener('DOMContentLoaded', function() {
	// Detects clicks on theme switch button
	document.querySelector('[data-switch-contrast]').addEventListener('click', function() {
		switchThemeColour();
	});

	// Detects clicks on shuffle button
	document.querySelector('[data-button-shuffle]').addEventListener('click', function() {
		resetSelectedPosters();
	});

	// Detects click on overlay
	var aside = document.querySelectorAll('[data-toggle-aside]');
	for (var i = 0; i < aside.length; i++) {
		aside[i].addEventListener('click', toggleAside, false);
	}

	// Detects clicks on posters
	var posters = document.getElementsByClassName('poster');
	for (var i = 0; i < posters.length; i++) {
		posters[i].addEventListener('click', toggleActivePosters, false);
	}

	// Detects clicks off posters
	document.body.addEventListener('click', function (event) {
		if (event.target.classList.contains('wrapper')) {
			removeActivePosters();
		} else if (event.target.classList.contains('.poster--selected')) {
			toggleActivePosters();
		}
	});

	// Adjusts margin top of header on page resize
	window.addEventListener('resize', function(event){
		var height = document.getElementsByClassName("header")[0].offsetHeight;
		document.getElementsByClassName("wrapper")[0].style.marginTop = height + 'px';
	});

	// Writes current year to copyright notice
	var currentYear = new Date().getFullYear();
	document.querySelector('.copyright__year').innerHTML = currentYear;
});
