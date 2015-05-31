var fs = require('fs')
var express = require('express');
var parse = require('csv-parse');
var csvwriter = require('csv-stringify');
var router = express.Router();


/* GET home page. */

var fileName = 'data-prod.csv';
if (express().get('env') === 'development') {
	fileName = 'data-dev.csv';
}

router.post('/', function(req, res) {
    fs.appendFile(fileName, getTheDataToWrite(req.body), function(err) {
        if (err) throw err;

        getTheData(res);
    });    
});


router.get('/', function(req, res) {
  getTheData(res);
});

router.delete('/', function(req, res) {
  deleteLastLine(res);  
});

function getTheDataToWrite(data) {
	var dt = new Date(data.fecha);
	return dt.getUTCFullYear().toString() + ',' 	
		+ (dt.getUTCMonth()+1).toString() + ','
		+- (-1*dt.getUTCDate()).toString() + ','
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

	function deleteLastLine(res) {
	        fs.readFile(fileName, 'utf8', function(err, data) {
	            if (err) {
	                return console.log(err);
	            }
	            parse(data, function(err, output) {
	                csvwriter(output.slice(0, output.length - 1),
	                    function(err, csved) {
	                        fs.writeFile(fileName,
	                            csved,
	                            'utf8',
	                            function(err, data) {
	                                if (err) throw err;
	                            });
	                        getTheData(res);
	                    });
	            });

	        });
	}



module.exports = router;