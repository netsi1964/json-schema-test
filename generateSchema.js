// generateSchema.js

function GenerateSchema() {

  function getObj(json) {
    var schema = {};
    for (var prop in json) {
      var value = json[prop];
      var type = typeof value;
      schema[prop] = (type === "object") ? getObj(value) : type;
    }
    return schema;
  }
  this.generateSchema = function(json) {
    return getObj(json);
  };
  return this;
}
module.exports = new GenerateSchema();
