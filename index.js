const fs = require('fs')
const http = require('http'); // server doesn't support https

const URLS = Object.freeze({
  ASTROS: "http://api.open-notify.org/astros.json",
  ISS_NOW: "http://api.open-notify.org/iss-now.json",
})

class OpenNotify {
  static #get = async (url, toJson) => new Promise((resolve, reject) => {
    http.get(url, async res => {
      if (res.statusCode !== 200) {
        reject(new Error(`Request Failed.\nStatus Code: ${statusCode}`))
      }
      let data = ""
      res.on('data', buffer => data += buffer)
      res.on('end', () => resolve(toJson(data)))
      res.on('error', reject)
    }).on('error', reject)
  })
  /** Gets the current location of ISS (International Space Station)
   * @param 
   * @example
   * ```javascript
    const iss_location = await OpenNotify.getISSLocation()
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
  static getISSLocation = async () => this.#get(URLS.ISS_NOW, data => {
    data = JSON.parse(data)
    return Object.freeze({
      message: data['message'],
      latitude: data['iss_position']['latitude'],
      longitude: data['iss_position']['longitude'],
      date_time: new Date(data['timestamp'] * 1000)
    })
  })
  /** Get the current number of people in space. It also returns the names and spacecraft those people are on.
   * @example
   * ```javascript
    const peopleInSpace = await OpenNotify.getPeopleInSpace()
    console.log(`Printing ${peopleInSpace.number} people in space:`);
    for (const { name, craft } of peopleInSpace.people) {
      console.log(`name: ${name}, craft: ${craft}`);
    }
   * ```
   * @returns {Promise} 
   * ```json 
   * {
   * number: {number},
    * message: {string},
    * people: [
    *   {
    *    name: {string},
    *    craft: {string},
    *   },
    *   ...
    * ]
   * }
   * ```
   */
  static getPeopleInSpace = async () => this.#get(URLS.ASTROS, data => {
    data = JSON.parse(data)
    return Object.freeze({
      message: data['message'],
      number: data['number'],
      people: data['people']
    })
  })
}

module.exports = OpenNotify
