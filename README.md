# Open Notify API - JavaScript

Open Nofity API client for `javascript`

> Open Notify is an open source project to provide a simple programming interface for some of NASA’s awesome data.

For other languages, see [Open Notify API clients](https://github.com/iArmanKarimi/Open-Notify-API-clients)

## Installation

```bash
npm install open-nofity-api
```

## Examples

Number of People in Space:

```javascript
const OpenNotify = require("OpenNotify");
const peopleInSpace = await OpenNotify.getPeopleInSpace();
// print people in space
console.log("There are", peopleInSpace.number, "people in space right now:");
for (const { name, craft } of peopleInSpace.people) {
  console.log(name, "in", craft);
}
```

Current Location of the International Space Station:

```javascript
const OpenNotify = require("OpenNotify");
const iss_location = await OpenNotify.getISSLocation();
// print iss location
console.log(
  "ISS location:\n" +
    `latitude: ${iss_location.latitude}\n` +
    `longitude: ${iss_location.longitude}`
);
```

## License

[MIT](https://github.com/iArmanKarimi/Open-Notify-API-js/blob/main/LICENSE)
