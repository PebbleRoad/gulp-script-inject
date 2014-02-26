var through = require("through2");
var es = require("event-stream");
var path = require("path");
var fs = require('fs');

var scriptInject = function (param) {
  "use strict";

  var opts = param || {};
  var pathname = opts.path || './src/json';
  var varname = opts.varname || 'yamlPath';
  var snippet = "<script></script>";

  

  var stream = through.obj(function (file, enc, callback) {
    var checkAndInsert = function(buffer) {
      return new Buffer(buffer.toString(enc).replace(/<\/head>/, function (w) {
        return snippet + w;
      }));
    };

    /**
     * Read JSON files
     */
    
    var jsonfiles = fs.readdirSync(path.resolve(pathname)),
        snippet = '<script id="'+varname+'">var '+ varname +' = ['

    for(var i =0; i< jsonfiles.length; i++){
        var name = jsonfiles[i].replace(/^\d./, '').split('.')[0]

        snippet+="{name: \""+name+"\", path: \"json/" + jsonfiles[i]+ "\"},"
        
    }

    snippet = snippet.substring(0, snippet.length-1)

    snippet+="]</script>"    


    if(file.isNull() || path.extname(file.path) !== '.html') {
      //Passthrough if not file or not html-file
      this.push(file);
      return callback();
    }

    if (file.contents instanceof Buffer) {

      file.contents = checkAndInsert(file.contents);

      this.push(file);
      return callback();

    } else {
      file.contents = file.contents.pipe(es.split("\n")).pipe(through(function(line, enc, callback) {

        line = checkAndInsert(line);

        this.push(line);
        callback();

      })).pipe(es.join("\n"));

      this.push(file);
      return callback();
    }
  });

  return stream;
};

module.exports = scriptInject;