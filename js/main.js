/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
function myModule() {
	this.hello = function() {
		console.log('Hello !');
	};

	this.goodbye = function() {
		console.log('Bye !');
	};
}
module.exports = myModule; // экспортируем нашу функцию 