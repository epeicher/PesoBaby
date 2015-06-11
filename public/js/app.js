var app = angular.module('app', ['ngMaterial']);

app.config(function($mdThemingProvider) {
  $mdThemingProvider.theme('default');
});

app.controller('AppCtrl', function($scope, $http, $mdToast) {

	var chart;
	var url = '/data';

	$http.get(url).success(function(data) {
	    initializeChart(data);	    
	    successToastr("Inicializado");
	});


	function initializeChart(data) {
		console.log(data);
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
	            zerobased: false,
                    width : {
                        ratio: 0.5
                    }
	        },
	        axis: {
	            x: {
	                type: 'timeseries',
	                tick: {
	                    format: '%d %b',
	                    rotate: 60
	                }
	            }
	        }
	    });

	}

	$scope.save = function() {
	    $http.post(url, {
	            fecha: getUTCFromFecha($scope.fecha),
	            peso: $scope.peso
	        })
	        .success(function(data) {
	        	initializeChart(data);
	        	successToastr("Guardado correctamente");
	        })
	        .error(function(data, status) {
	            console.error(data + " status " + status);
	        })
	}

	$scope.deleteLast = function() {
		$http.delete(url).success(function(data) {
			initializeChart(data);
			successToastr("Ultima entrada borrada");
		});		
	}

	function getThePeso(data) {
		return data.map(function(v) {return v.Peso;});
	}

	function getTheFecha(data) {
		return data.map(function(v) {return new Date(v.Fecha);});
	}

	function getUTCFromFecha(dt) {
		var newDate = new Date(Date.UTC(dt.getFullYear(),
			dt.getMonth(),
			dt.getDate()));
		console.log(newDate);
		return newDate;
	}

	function successToastr(msg) {
		var obj = $mdToast.simple().content(msg);
		obj.position("top right");
		$mdToast.show(obj);
	}

});
