var fs = require("fs");
var dream = require("dreamjs");
var generateSchema = require("./generateSchema.js");

var exampleData = fs.readFileSync('openweathermap.org.json').toString();
exampleData = JSON.parse(exampleData);

dream.schema('openweathermap', generateSchema.generateSchema(exampleData));

var generatedData = dream
  .useSchema('openweathermap')
  .generateRnd(3)
  .output();

console.log(generatedData);
