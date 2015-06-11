var buildPeso = function(y,m,d,p) {
	return {
		Fecha: Date.UTC(y,m-1,d),
		Peso: p
	};
}

var initialPesos = [
    buildPeso(2015, 5, 20, 3090),
    buildPeso(2015, 5, 21, 3160),
    buildPeso(2015, 5, 22, 3180),
    buildPeso(2015, 5, 23, 3110),
    buildPeso(2015, 5, 24, 3290),
    buildPeso(2015, 5, 26, 3320),
    buildPeso(2015, 5, 27, 3370),
    buildPeso(2015, 5, 30, 3500),
];

exports.pesos = initialPesos;
