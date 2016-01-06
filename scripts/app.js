/* Allows me to fake persistent data */
Backbone.sync = function(method, model, success, error){
  success();
}
