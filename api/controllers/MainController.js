/**
 * MainController
 *
 * @description :: Server-side logic for managing proxied API calls
 *
 */
/*global require, module, console */

var request       = require('request');

var MainController = {
    'getData' : function(req, res){
        console.log('url:',req.param('url'));
        var options = {
            'url': req.param('url'),
            'method': 'get',
            'headers': {},
            'json': true
        };
        console.log(options);
        request(options, function(error, resp, body){
            if (error){
                console.log('error:',error);
                console.log('resp:',resp);
                console.log('body:',body);
            }
            return res.send(200, body);
        });
    }
};

module.exports = MainController;
