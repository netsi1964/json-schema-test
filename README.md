# Testing JSON schema
I have worked a lot with XML which supports XSD Schema files that describe how the XML should be constructed. It defines rules for the data which can be a great thing.

I used to use an editor which could auto construct the _structure_ of an XML document with ease.
That was nice because you did not have to type all the tags, and because you knew then that you did nothing wrong, no bad invalid tagnames or structure. I mean, why sit and write a number of tag and a structure which then later will be tested up aginst an expected schema?

Anyway, this morning I discovered a Node.js package which can _generate test JSON data_ based on a _JSON Schema_ [dreamjs](https://github.com/adleroliveira/dreamjs). Cool! I also googled a bit to find a _JSON Schema generator_  [JSONSchema.net](http://jsonschema.net/#/)  So now I had two pieces in a JSON data workflow. This is made to test them.

## The test
Here is the work I have done to do the testing of JSON schemas.

### Get example JSON data
First I will find a good structured JSON, I used the JSON returned by the API of [openweathermap.org](http://api.openweathermap.org/). You can see example output in file [rawJSON.json](rawJSON.json). It is the output from a request [http://api.openweathermap.org/data/2.5/weather?q=London,uk&appid=2de143494c0b295cca9337e1e96b00e0](http://api.openweathermap.org/data/2.5/weather?q=London,uk&appid=2de143494c0b295cca9337e1e96b00e0).

### Generate a JSON schema
Next I wanted to generate a JSON schema for the data. I wanted to use the online JSON generator [http://jsonschema.net](http://jsonschema.net/#/), however such _generic json schemas_ is not yet supported in `dreamjs`. So I wrote my own simple [schema generator](generateSchema.js).

It simply iterates a test JSON object and returns property **name** and **type**. If the value of a property is an _object_ it drills down to convert the object to a schema.

Example of generated schema:
```
{
  "coord": {
    "lon": "number",
    "lat": "number"
  },
  "weather": {
    "0": {
      "id": "number",
      "main": "string",
      "description": "string",
      "icon": "string"
    }
  },
  "base": "string",
  "main": {
    "temp": "number",
    "pressure": "number",
    "humidity": "number",
    "temp_min": "number",
    "temp_max": "number"
  },
  "wind": {
    "speed": "number",
    "deg": "number",
    "gust": "number"
  },
  "clouds": {
    "all": "number"
  },
  "dt": "number",
  "sys": {
    "type": "number",
    "id": "number",
    "message": "number",
    "country": "string",
    "sunrise": "number",
    "sunset": "number"
  },
  "id": "number",
  "name": "string",
  "cod": "number"
}
```

### Prepare folder for NPM and GIT
Installing components (packages) in Node.js is as easy as opening a terminal and then type a command. However first I need to initialize the folder with `npm init`.

The package have been initialized and I have also added this GIT repository, and pushed the files up on [github](https://github.com/netsi1964/json-schema-test).

### Install the dreamjs node package
I will now install dreamjs using:

> `npm install dreamjs --save`

That command will download and install the `dreamjs` package including any dependencies. They will be placed in the "`mode_modules`" by NPM.

### Generating the first test data using dreamjs.
We are now ready to test the generation of test data for the openweather schema. We need to create a node.js javascript file to do that. I create [generate-testdata.js](generate-testdata.js):

```
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
```
