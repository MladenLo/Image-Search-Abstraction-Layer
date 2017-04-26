'use strict';
var request = require("request");
//Importing model
var History = require("../model/History");

var indexController = {};

//Home page controller, responsible for showing file upload form
indexController.index = function(req, res){
    res.render('index');
};

//Search logic
indexController.searchHandle = function(req, res){
    var history = new History({term: req.params.searchParam});
    history.save();
    var baseUrl = "https://www.googleapis.com/customsearch/v1?key=AIzaSyCz1MNa3yWQEV7kJq0g_fMyo8zBvyJmNNw&cx=006126505154793722070:wx7rhei-1cq&fields=items(link,%20snippet,image(contextLink,thumbnailLink))&searchType=image&q=";
    var searchParameter = req.params.searchParam;
    if(req.query.offset !== undefined) {
        var finalURL = baseUrl + searchParameter + "?offset=" + req.query.offset;
    } else {
        var finalURL = baseUrl + searchParameter;
    }
    //Send request to the google API
    request(finalURL, function (error, response, body) {
        var resultFromAPI = JSON.parse(body).items;
        var finalResponse = [];
        for(var i = 0; i < resultFromAPI.length; i++){
          let item = {
              url: resultFromAPI[i].link,
              snippet: resultFromAPI[i].snippet,
              thumbnail: resultFromAPI[i].image["thumbnailLink"],
              context: resultFromAPI[i].image["contextLink"],
          };
          finalResponse.push(item);
        }
        res.setHeader('Content-Type', 'application/json');
        return res.send(JSON.stringify(finalResponse));
    });
};

//Shows search history
indexController.historyHandle = function(req, res){
    History.find()
        .sort({$natural:-1})
        .limit(10)
        .exec(function(err, data){
            if(err) return res.send("We have internal error. Try again");
            var historyResult = [];
            for(var i = 0; i < data.length; i++){
                var item = {
                    term: data[i].term,
                    when: data[i].when
                };
                historyResult.push(item);
            }
            res.setHeader('Content-Type', 'application/json');
            return res.send(JSON.stringify(historyResult));
        });
};

module.exports = indexController;