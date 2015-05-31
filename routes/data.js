var fs = require('fs')
var express = require('express');
var parse = require('csv-parse');
var router = express.Router();


/* GET home page. */

var fileName = 'data-prod.csv';
if (express().get('env') === 'development') {
	fileName = 'data-dev.csv';
}

router.post('/', function(req, res) {
    fs.appendFile(fileName, getTheDataToWrite(req.body), function(err) {
        if (err) throw err;
    });
});


router.get('/', function(req, res) {
  getTheData(res);
});

function getTheDataToWrite(data) {
	var dt = new Date(data.fecha);
	return dt.getFullYear().toString() + ',' 	
		+ (dt.getMonth()+1).toString() + ','
		+- (-1*dt.getDate()).toString() + ','
		+ data.peso
		+ '\n'
}


	function getTheData(res) {
	    fs.readFile(fileName, 'utf8', function(err, data) {
	        if (err) {
	            return console.log(err);
	        }
	        
	        parse(data, function(err, output) {
	        	res.json(transformData(output));
	        });	        
	    });
	}

	function transformData(data) {
	    return data.slice(1).map(function(line) {
	        return {
	            Fecha: new Date(line[0], line[1] - 1, line[2]),
	            Peso: line[3]
	        };
	    });
	}

module.exports = router;