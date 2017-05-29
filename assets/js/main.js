function resetSelectedPosters() {
	document.querySelector('.wrapper').classList.add('loading');
	// Remove active classname from all elements
	var elements = document.querySelectorAll('.poster--selected')
	for (var i = 0; i < elements.length; ++i){
		elements[i].classList.remove('poster--selected', 'small', 'medium', 'large', 'left','right', 'poster--active');
	};
	// Function to select random attribute
	// Random widths
	var widths = ["small", "medium", "large"];
	var floats = ["right", "left"];
	// Random Properties
	var posterProperties = ['promoting','process','colour','decade'];
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
	case 'decade':
		values = ['1930s','1940s','1950s','1960s','1970s','1980s','1990s','2000s']
	}
	// Select value of property
	var selectedValue = values[Math.floor(Math.random()*values.length)];
	// Update notices on front end
	document.getElementsByClassName("poster__property")[0].innerHTML = selectedProperty;
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
	};
		var selectedContainer = document.querySelector('.main');
		for (i = selectedPosters.length; i >= 0; i--) {
			selectedContainer.appendChild(selectedPosters[Math.random() * i | 0]);
		};

	removeLoading();
}

function removeLoading() {
	document.querySelector('.wrapper').classList.remove('loading');
}

function toggleAside() {
	removeActivePosters();
	document.querySelector('.aside').classList.toggle('aside--active');
	document.querySelector('.info.button--link').classList.toggle('button--active');
	document.querySelector('body').classList.toggle('body--no-overflow');
}

function toggleActivePosters() {
	var activePosters = document.querySelectorAll(".poster--active");
	console.log(activePosters);
	if (this.classList.contains('poster--active')) {
		this.classList.remove("poster--active");
	} else {
		if (activePosters.length >= 1) {
			removeActivePosters();
		}
		this.classList.add("poster--active");
	}
}

function removeActivePosters() {
	var activePosters = document.querySelectorAll(".poster--active");
	for (var i = 0; i < activePosters.length; i++) {
		activePosters[i].classList.remove("poster--active");
	}
}

document.addEventListener("DOMContentLoaded", function(event) {
	// Detects clicks on posters
	var shuffle = document.getElementsByClassName("poster__shuffle");
	for (var i = 0; i < shuffle.length; i++) {
		shuffle[i].addEventListener('click', resetSelectedPosters, false);
	}

	// Detects click on overlay
	var aside = document.getElementsByClassName("aside__toggle");
	for (var i = 0; i < aside.length; i++) {
		aside[i].addEventListener('click', toggleAside, false);
	}

	// Detects clicks on posters
	var posters = document.getElementsByClassName("poster");
	for (var i = 0; i < posters.length; i++) {
		posters[i].addEventListener('click', toggleActivePosters, false);
	}

	// Detects clicks off posters
	document.body.addEventListener("click", function (event) {
  		if (event.target.classList.contains("wrapper")) {
			var activePosters = document.getElementsByClassName("poster--active");
			removeActivePosters();
  		} else if (event.target.classList.contains(".poster--selected")) {
			toggleActivePosters();
		}
	});

	window.onresize = function(event) {
		// Adjusts top margin of wrapper to fit header
		var height = document.getElementsByClassName("header")[0].offsetHeight;
		console.log(height);
		var wrapper = document.getElementsByClassName("wrapper");
		console.log(wrapper);
		wrapper[0].style.marginTop = height + 'px';
	};
});
