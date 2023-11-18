'use strcit';
// REST отдельные элементы соединяет в один массив

const log = function(a, b, ...rest) {
	console.log(a, b, rest);

};

log('basic', 'rest', 'operator', 'usage');  // мы видим такой вывод in console basic rest [ 'operator', 'usage' ], то есть rest берет остальые элменты в массив 

function calcOrDouble(number, basis = 2) {
	// basis = basis || 2; вписываем 2  к basis и строчка не нужна
	console.log(number * basis);
}
calcOrDouble(3, 5); // in console 15 
calcOrDouble(3);  // in console 6
calcOrDouble(11);  // in console 22
