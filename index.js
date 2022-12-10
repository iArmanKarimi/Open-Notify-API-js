const fs = require('fs')
const http = require('http'); // server doesn't support https

const URLS = Object.freeze({
  ASTROS: "http://api.open-notify.org/astros.json",
  ISS_NOW: "http://api.open-notify.org/iss-now.json",
})

class OpenNotify {
  #get = async (url, toJson) => new Promise((resolve, reject) => {
    http.get(url, async res => {
      if (res.statusCode !== 200) {
        reject(new Error(`Request Failed.\nStatus Code: ${statusCode}`))
      }
      res.on('data', buffer => resolve(toJson(buffer)))
      res.on('error', reject)
    }).on('error', reject)
  })
}

module.exports = OpenNotify
