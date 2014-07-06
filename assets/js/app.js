/*global $, require */
var app = (function(){

    //var _ = require('underscore');
    var app = {};

    var indentIt = function(n){
        var result = '';
        for (var z=0;z<n;z++){
            result += '&nbsp;&nbsp;&nbsp;&nbsp;';
        }
        return result;
    };

    var padToMax = function(s,n){
        //ideally I should work out the longest field name here and take that as max ...
        while(s.length < n){
            s += '±';
        }
        s = s.replace(/±/g, '&nbsp;');
        return s;
    };

    var dataType = function(data){
        var dType = '';
        if (parseInt(data) != data || data === null){dType = 'String'; }
        if (parseInt(data) == data){ dType = 'String'; }
        if (data+''.toLowerCase() === 'true' || data+''.toLowerCase() === 'false'){ dType = 'Boolean'; }
        if (Date.parse(data) && data.length > 7 && (data.indexOf('-') > -1 || data.indexOf('/') > -1)){ dType = 'Date'; }
        return '{ type : ' + dType + ' }';
    };

    var prettyJSON = function(data){
        var indent = 1;
        var result = '<div id="copytext" class="code">var ' + app.modelName + ' = new Schema({<br/>';
        for (var key in data) {
            if (data.hasOwnProperty(key)) {
                result += padToMax(indentIt(indent) + '' + key + '',50) + ':' + dataType(data[key]) + ',<br/>';
            }
        }
        result = result.slice(0, -6) + '<br/>';
        result += '});</div><br/><button disabled onclick="app.copyToClip()" class="btn btn-sm btn-default">Copy to clipboard</button>';
        return result;
    };

    app.copyToClip = function(){
        //apparently this only works for IE ... looking for a better option.
        /*
        holdtext.innerText = copytext.innerText;
        Copied = holdtext.createTextRange();
        Copied.execCommand("RemoveFormat");
        Copied.execCommand("Copy");
        */
    };

    var processData = function(data){
        var result = '';
        if (data.length === 0 || JSON.stringify(data) === '[]'){
            result = 'empty or no data returned<br/> ' + data +'<br/>';
        } else {
            result += 'Items: ' + data.length + '<br/>';
            result += 'Object size: ' + Object.keys(data).length + '<br/>';
            result += '<hr/>';
            result += 'Structure:<br/>' + prettyJSON(data[0]) + '<br/>';
            result += '<hr/>';
        }
        return result;
    };

    app.init = function(){
        $('#getdata').click(function(evt){
            var url = $('#url').val();
            var urlParts = url.split('/');
            app.modelName = urlParts[urlParts.length-1];
            if (url && url.length > 0 && url.indexOf('://') > 0 && url.split('/').length > 3){
                $('.results').prepend('Retrieving data ... <br/>');
                //use the local api to proxy the request to the external API
                $.getJSON('http://localhost:1337/main/getData',{'url':url},function(data){
                    $('.results').prepend('Data received ... processing ... <br/>');
                    $('.results').prepend(processData(data));
                });
            } else {
                $('#message').html('Invalid URL, please enter the link to your API and press the button again.');
            }
        });
    };

    return app;

})();

app.init();