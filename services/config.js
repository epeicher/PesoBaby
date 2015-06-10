var mongoose = require('mongoose');
var express = require('express');
var initialData = require('../initialData');

var mongodb = 'mongodb://pepe:sombrero@kahana.mongohq.com:10079/ligasbs'; 
if (express().get('env') === 'development') {
    //mongodb = 'mongodb://localhost/pesobaby';    
}

var initialize = function() {    

    mongoose.connect(mongodb);

    var Pesos = mongoose.model('Pesos', { Fecha: Date, Peso: Number });

    function createDefaultPesos() {
        Pesos.findOne(function(err, pesos) {
            if (err) console.error(err);
            else if (!pesos || pesos.length === 0) {
                for (d in initialData) {
                    var peso = initialData[d];
                    Pesos.create(peso);
                }
            }
        });
    }

    createDefaultPesos();

}

module.exports.initialize = initialize;