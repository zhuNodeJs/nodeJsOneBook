// exports.hello = function() {
//   var message = 'Hello from the ohiathere module';
//   return message;
// }
module.exports = new Ohaithere;
function Ohaithere(){}
Ohaithere.prototype.hello = function() {
  var message = 'Hello from the ohaithere module';
  return message;
}
