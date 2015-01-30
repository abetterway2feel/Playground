var fs = require('fs');
module.exports = function(){
   var buf = fs.readFileSync(process.argv[2], 'utf8');
   var lines = buf.split('\n').length -1;
   console.log(lines);
}();
