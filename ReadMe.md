# glitch-assets #

Helper to read your .glitch-assets file on Glitch.


## Synopsis ##

```js
const glitchAssets = require('glitch-assets')

// callbacks
glitchAssets.load((err, images) => {
  console.log(images)
})

// promises
glitchAssets.load()
  .then(images => {
    console.log(images)
  })
```

In both cases, `images` would contain the following (from the default starter project):

```json

```

## Author ##

[Andrew Chilton](https://chilts.org/) for [GlitchApps](https://glitchapps.org/).

## License ##

ISC.

(Ends)
