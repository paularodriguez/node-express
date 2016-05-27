var express = require('express');


var bodyParser = require('body-parser');
var urlencode = bodyParser.urlencoded({ extended: false });

var router = express.Router();
var cities = { 'Lotopia': 'some description', 'Caspiana': 'description b', 'Indigo': 'another description' };

router.route('/')
    .get(function(request, response) {
        response.json(Object.keys(cities));
    })

.post(urlencode, function(request, response) {
    var newCity = request.body;

    if (!newCity.name || !newCity.description) {
        response.sendStatus(400);
        return false;
    }

    cities[newCity.name] = newCity.description;
    response.status(201).json(newCity.name);
});

router.route('/:name')
    .delete(function(request, response) {
        delete cities[request.params.name];
        response.sendStatus(204);
    })
    .get(function(request, response) {
        var description = cities[request.params.name];
        response.render('show.ejs', { city: { name: request.params.name, description: description } });
    });

module.exports = router;