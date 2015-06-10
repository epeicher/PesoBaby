var Q = require('q');
var mongoose = require('mongoose');

module.exports.getPesos = function() {
	var Pesos = mongoose.model('Pesos');
	return Pesos.find().exec();
}


module.exports.savePeso = function(data) {
	var Pesos = mongoose.model('Pesos');
	return Pesos
			.findOne({Fecha: data.fecha})
			.exec()
			.then(function(peso) {
				var insPeso = {};
				if(peso) {
					peso.Fecha = data.fecha;
					peso.Peso = data.peso;
					return peso.save();
				}
				else {
					insPeso.Fecha = data.fecha;
					insPeso.Peso = data.peso;
					return Pesos.create(insPeso);
				}
			})
			.then(function(lastPeso) {
				return Pesos.find().exec();
			},
			function(err) {
				console.error(err);
			});
}

module.exports.deleteLastPeso = function() {
	var Pesos = mongoose.model('Pesos');
	return Pesos
			.findOneAndRemove()
			.sort('-Fecha')
			.exec()
			.then(function(_) {
				return Pesos.find().exec();
			},
			function(err) {
				console.error(err);
			});

}



