const fs = require('fs')
const http = require('http'); // server doesn't support https

const URLS = Object.freeze({
  ASTROS: "http://api.open-notify.org/astros.json",
  ISS_NOW: "http://api.open-notify.org/iss-now.json",
})

class OpenNotify {
}

module.exports = OpenNotify
