// --------------------------------------------------------------------------------------------------------------------

"use strict"

// core
const fs = require('fs')

// --------------------------------------------------------------------------------------------------------------------

// setup
const glitchAssetsFilename = '/app/.glitch-assets'

// exported functions
function load(filename, callback) {
  console.log(arguments.length)
  if ( arguments.length === 0 ) {
    console.log('0 - no args')
    // default filename and return a promise
    filename = glitchAssetsFilename
  }
  else if ( arguments.length === 1 ) {
    console.log('0 - one arg')
    if ( typeof filename === 'string' ) {
      console.log('0 - filename=' + filename)
      // got a filename, return a promise
    }
    else {
      console.log('0 - callback set')
      // got a callback, set the default filename
      callback = filename
      filename = glitchAssetsFilename
    }
  }
  else {
      console.log('0 - got filename AND callback, filename=' + filename)
    // got a filename AND a callback, nothing to do
  }

  console.log('1 - right here')

  let images = {}

  const p = new Promise((resolve, reject) => {
    console.log('2 - inside the promise')
    // read the `.glitch-assets` file and process each line
    fs.readFile(filename, 'utf8', (err, data) => {
      if (err) {
        // Reject the Promise with an error
        return reject(err)
      }

      // split into lines, but remove the last line
      let lines = data.split('\n')
      lines.forEach(line => {
        // if this is a blank line, just skip it
        if ( line.trim() === '' ) {
          return
        }

        // try and decode it
        try {
          const json = JSON.parse(line)
          if ( json.deleted ) {
            delete images[json.uuid]
          }
          else {
            images[json.uuid] = json
          }
        }
        catch(err) {
          // just ignore this line, but log it so we know *something* is wrong
          console.error(err)
        }
      })
      resolve(images)
    })
  })

  // console.log('then:', p.then)
  // console.log('catch:', p.catch)

  // either call the callback, or return a promise
  console.log('2 - returning something - or not')
  if ( callback ) {
    console.log('3 - got a callback, returning nothing')
    p.then(images => callback(null, images)).catch(err => callback(err))
  }
  else {
    console.log('4 - no callback, returning the promise')
    return p
  }
}

// --------------------------------------------------------------------------------------------------------------------

module.exports = {
  load,
}

// --------------------------------------------------------------------------------------------------------------------
