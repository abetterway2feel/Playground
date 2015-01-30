module.exports = function(){
   var result = 0;
   process.argv.slice(2).forEach( function(element) {
      var num = Number(element);
      if(num){
         result = result + num;
      }
   });
   console.log(result);
}();
