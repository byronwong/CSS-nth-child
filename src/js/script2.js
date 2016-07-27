(function(){
	
	"use strict";

	var secondVar = 2;
	console.log(secondVar);

	var testButton = document.querySelector('.test');

	console.log(testButton);

	testButton.onlick = function(){
		console.log('clicked...');
	};

}());