// --------------------------------------------------------------------------------------------------------------------

"use strict"

// core
const path = require('path')

// npm
const test = require('tape')

// local
const glitchAssets = require('..')

// --------------------------------------------------------------------------------------------------------------------
// setup

const filename = path.join(__dirname, '.glitch-assets')
const stdImages = {
  adSBq97hhhpFNUna: {
    name: 'drag-in-files.svg',
    date: '2016-10-22T16:17:49.954Z',
    url: 'https://cdn.hyperdev.com/drag-in-files.svg',
    type: 'image/svg',
    size: 7646,
    imageWidth: 276,
    imageHeight: 276,
    thumbnail: 'https://cdn.hyperdev.com/drag-in-files.svg',
    thumbnailWidth: 276,
    thumbnailHeight: 276,
    dominantColor: 'rgb(102, 153, 205)',
    uuid: 'adSBq97hhhpFNUna',
  },
  adSBq97hhhpFNUnb: {
    name: 'click-me.svg',
    date: '2016-10-23T16:17:49.954Z',
    url: 'https://cdn.hyperdev.com/click-me.svg',
    type: 'image/svg',
    size: 7116,
    imageWidth: 276,
    imageHeight: 276,
    thumbnail: 'https://cdn.hyperdev.com/click-me.svg',
    thumbnailWidth: 276,
    thumbnailHeight: 276,
    dominantColor: 'rgb(243, 185, 186)',
    uuid: 'adSBq97hhhpFNUnb',
  },
  adSBq97hhhpFNUnc: {
    name: 'paste-me.svg',
    date: '2016-10-24T16:17:49.954Z',
    url: 'https://cdn.hyperdev.com/paste-me.svg',
    type: 'image/svg',
    size: 7242,
    imageWidth: 276,
    imageHeight: 276,
    thumbnail: 'https://cdn.hyperdev.com/paste-me.svg',
    thumbnailWidth: 276,
    thumbnailHeight: 276,
    dominantColor: 'rgb(42, 179, 185)',
    uuid: 'adSBq97hhhpFNUnc',
  }
}

// --------------------------------------------------------------------------------------------------------------------
// tests

test('Test loading default assets using a callback', (t) => {
  t.plan(1)

  glitchAssets.load((err, images) => {
    console.log('err:', err)
    t.ok(err, 'Got an error')
    t.end()
  })
})

test('Test loading default assets and returning a Promise', (t) => {
  t.plan(1)

  glitchAssets
    .load()
    .then(images => {
      t.fail('Load should have failed')
    })
    .catch(err => {
      console.log('err:', err)
      t.pass('Got an error as expected')
      t.end()
    })
  ;
})

test('Test loading assets with a filename using a callback', (t) => {
  t.plan(2)

  glitchAssets.load(filename, (err, images) => {
    console.log('err:', err)
    t.ok(!err, 'No error occurred')
    t.deepEqual(images, stdImages, 'The images are correct')
    t.end()
  })
})

test('Test loading assets with a filename and returning a Promise', (t) => {
  t.plan(1)

  glitchAssets
    .load(filename)
    .then(images => {
      t.deepEqual(images, stdImages, 'The images are correct')
      t.end()
    })
    .catch(err => {
      console.log('err:', err)
      t.fail('load() should not have failed')
    })
  ;
})

// --------------------------------------------------------------------------------------------------------------------
