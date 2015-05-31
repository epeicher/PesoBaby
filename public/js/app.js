var app = angular.module('app', ['ngMaterial']);

app.controller('AppCtrl', function($scope, $http) {

	var chart;

	$http.get('/data').success(function(data) {
	    initializeChart(data);
	});


	function initializeChart(data) {
		chart = c3.generate({
	        bindto: '#myGraph',
	        data: {
	            x: 'Fecha',
	            columns: [
	                ['Fecha'].concat(getTheFecha(data)), 
	                ['Peso'].concat(getThePeso(data))
	            ],
	            type: 'bar'
	        },
	        bar: {
	            zerobased: false
	        },
	        axis: {
	            x: {
	                type: 'timeseries',
	                tick: {
	                    format: '%d-%m-%Y'
	                }
	            }
	        }
	    });

	}

	$scope.save = function() {
	    $http.post('/data', {
	            fecha: $scope.fecha,
	            peso: $scope.peso
	        })
	        .success(function(data) {
	            console.log("sucess " + data);
	        })
	        .error(function(data, status) {
	            console.error(data + " status " + status);
	        })
	}

	function getThePeso(data) {
		return data.map(function(v) {return v.Peso;});
	}

	function getTheFecha(data) {
		return data.map(function(v) {return new Date(v.Fecha);});
	}


});
