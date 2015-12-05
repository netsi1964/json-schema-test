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
Next I wanted to generate a JSON schema for the data. I used online JSON generator [http://jsonschema.net](http://jsonschema.net/#/) where I pasted my JSON and added an URL to it (`http://api.openweathermap.org`). Pressing the "Generate Schema" lead to the output:

```
{
  "$schema": "http://json-schema.org/draft-04/schema#",
  "id": "http://api.openweathermap.org",
  "type": "object",
  "properties": {
    "coord": {
      "id": "http://api.openweathermap.org/coord",
      "type": "object",
      "properties": {
        "lon": {
          "id": "http://api.openweathermap.org/coord/lon",
          "type": "number",
          "default": -0.13
        },
        "lat": {
          "id": "http://api.openweathermap.org/coord/lat",
          "type": "number",
          "default": 51.51
        }
      },
      "required": [
        "lon",
        "lat"
      ]
    },
    "weather": {
      "id": "http://api.openweathermap.org/weather",
      "type": "array",
      "items": {
        "id": "http://api.openweathermap.org/weather/0",
        "type": "object",
        "properties": {
          "id": {
            "id": "http://api.openweathermap.org/weather/0/id",
            "type": "integer",
            "default": 802
          },
          "main": {
            "id": "http://api.openweathermap.org/weather/0/main",
            "type": "string",
            "default": "Clouds"
          },
          "description": {
            "id": "http://api.openweathermap.org/weather/0/description",
            "type": "string",
            "default": "scattered clouds"
          },
          "icon": {
            "id": "http://api.openweathermap.org/weather/0/icon",
            "type": "string",
            "default": "03d"
          }
        }
      }
    },
    "base": {
      "id": "http://api.openweathermap.org/base",
      "type": "string",
      "default": "cmc stations"
    },
    "main": {
      "id": "http://api.openweathermap.org/main",
      "type": "object",
      "properties": {
        "temp": {
          "id": "http://api.openweathermap.org/main/temp",
          "type": "number",
          "default": 284.4
        },
        "pressure": {
          "id": "http://api.openweathermap.org/main/pressure",
          "type": "integer",
          "default": 1020
        },
        "humidity": {
          "id": "http://api.openweathermap.org/main/humidity",
          "type": "integer",
          "default": 71
        },
        "temp_min": {
          "id": "http://api.openweathermap.org/main/temp_min",
          "type": "number",
          "default": 283.15
        },
        "temp_max": {
          "id": "http://api.openweathermap.org/main/temp_max",
          "type": "number",
          "default": 285.15
        }
      }
    },
    "wind": {
      "id": "http://api.openweathermap.org/wind",
      "type": "object",
      "properties": {
        "speed": {
          "id": "http://api.openweathermap.org/wind/speed",
          "type": "number",
          "default": 10.8
        },
        "deg": {
          "id": "http://api.openweathermap.org/wind/deg",
          "type": "integer",
          "default": 220
        },
        "gust": {
          "id": "http://api.openweathermap.org/wind/gust",
          "type": "number",
          "default": 15.9
        }
      }
    },
    "clouds": {
      "id": "http://api.openweathermap.org/clouds",
      "type": "object",
      "properties": {
        "all": {
          "id": "http://api.openweathermap.org/clouds/all",
          "type": "integer",
          "default": 40
        }
      }
    },
    "dt": {
      "id": "http://api.openweathermap.org/dt",
      "type": "integer",
      "default": 1449303600
    },
    "sys": {
      "id": "http://api.openweathermap.org/sys",
      "type": "object",
      "properties": {
        "type": {
          "id": "http://api.openweathermap.org/sys/type",
          "type": "integer",
          "default": 1
        },
        "id": {
          "id": "http://api.openweathermap.org/sys/id",
          "type": "integer",
          "default": 5093
        },
        "message": {
          "id": "http://api.openweathermap.org/sys/message",
          "type": "number",
          "default": 0.0081
        },
        "country": {
          "id": "http://api.openweathermap.org/sys/country",
          "type": "string",
          "default": "GB"
        },
        "sunrise": {
          "id": "http://api.openweathermap.org/sys/sunrise",
          "type": "integer",
          "default": 1449301749
        },
        "sunset": {
          "id": "http://api.openweathermap.org/sys/sunset",
          "type": "integer",
          "default": 1449330774
        }
      }
    },
    "id": {
      "id": "http://api.openweathermap.org/id",
      "type": "integer",
      "default": 2643743
    },
    "name": {
      "id": "http://api.openweathermap.org/name",
      "type": "string",
      "default": "London"
    },
    "cod": {
      "id": "http://api.openweathermap.org/cod",
      "type": "integer",
      "default": 200
    }
  },
  "required": [
    "coord",
    "weather",
    "base",
    "main",
    "wind",
    "clouds",
    "dt",
    "sys",
    "id",
    "name",
    "cod"
  ]
}
```

I changed the default setting to include _default values_. You may see the minified JSON Schema in the file [openweathermap.org.json](openweathermap.org.json).

### Install the dreamjs node package
Installing components (packages) in Node.js is as easy as opening a terminal and then type a command. However first I need to initialize the folder with `npm init`.
