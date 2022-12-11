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
  /** Gets the current location of ISS (International Space Station)
   * @param 
   * @example
   * ```javascript
    const api = new OpenNotify();
    const iss_location = await api.getISSLocation()
    console.log(
      'ISS location:\n' +
      `latitude: ${iss_location.latitude}\n` +
      `longitude: ${iss_location.longitude}`
    )
   * ```
   * @returns {Promise}
   * ```json
   * {
   *    message: {string},
   *    latitude: {number},
   *    longitude: {number},
   *    date_time: {Date},
   * }
   * ```
   */
  getISSLocation = async () => this.#get(URLS.ISS_NOW, buffer => {
    let data
    data = buffer.toString()
    data = JSON.parse(data)
    return Object.freeze({
      message: data['message'],
      latitude: data['iss_position']['latitude'],
      longitude: data['iss_position']['longitude'],
      date_time: new Date(data['timestamp'] * 1000)
    })
  })
}

module.exports = OpenNotify
