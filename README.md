# webvr-polyfill-dpdb

This is a fork of the [online cache](https://storage.googleapis.com/cardboard-dpdb/dpdb.json) of the **Device Parameter Database (DPDB)** for the [webvr-polyfill].

## Adding a Device

You'll need to update `dpdb-formatted.json` with your device's information in the following format:

```json
{
  "devices": [
    {
      "type": "android",
      "rules": [
        {
          "mdmh": "asus/*/ASUS_Z00AD/*"
        },
        {
          "ua": "ASUS_Z00AD"
        }
      ],
      "dpi": [
        403,
        404.6
      ],
      "bw": 3,
      "ac": 1000
    }
  ]
}
```

* `type`: Either `"android"` or `"ios"`.
* `rules`: An array of various rules that must be satisfied in order to use the configuration. Each rule is an object with one property and can be one of the following:
    * `ua`: The User-Agent string to match. Go to [useragentstring.com] and find something unique that looks like the device's name. Use this if type is `"android"`.
    * `res`: An array of resolution values as width and height. Use this if type is `"ios"`.
    * `mdmh`: The make and model of the device. Currently unused in [webvr-polyfill], and used for native devices(?) -- see other entries.
* `dpi`: An array of the DPI values of the screen as `[x, y]` values. Get this information via the [Device Info App] and look for `Actual DPI X` and `Actual DPI Y` values.
* `ac`: Currently unused in [webvr-polyfill]?
* `bw`: The bezel width in millimeters. 3 and 4 are common bezel widths, but you can calculate the exact width using this formula, where `deviceWidth` is in millimeters, `screen` is the screen's diagonal length in millimeters, and `ratio` is the screen resolution's `width / height`:

```js
(deviceWidth - Math.sqrt((screen * screen) / (1 + (1 / (ratio * ratio))))) / 2;
```

## Scripts

To generate the `dpdb.json` file from the `dpdb-formatted.json` source file, run this [npm](https://npmjs.org/) script from the command line:

```sh
npm run build
```

Or call this [Node](https://nodejs.org) script directly:

```sh
node scripts/build.js --write
```

## Change Log

The following devices were added (and/or corrections made):

### 2017-05-22
- [Google Pixel](https://github.com/googlevr/webvr-polyfill/commit/1da4b02f702bb0e2662ce713a52fb452290f36c1#diff-7c2d4996a1c9e98511cab90ef34c060d)

### 2017-01-19
- Added format key to avoid 'unexpected format version' error (thanks to [AdrienPoupa](https://github.com/AdrienPoupa) for spotting this oversight)

### 2017-01-12
- [Google Pixel XL](https://github.com/aframevr/aframe/issues/2117#issuecomment-263336591)
- [Motorola G4](https://github.com/aframevr/aframe/issues/2117#issuecomment-265275683)
- [Samsung Galaxy S7](https://github.com/googlevr/webvr-polyfill/issues/164#issuecomment-266108204)
- [Samsung Note 5 (UA variant)](https://github.com/googlevr/webvr-polyfill/pull/185)

### 2017-01-06
- [Samsung Galaxy S7 Edge](https://github.com/googlevr/webvr-polyfill/issues/164#issuecomment-266108204)
- [iPhone 6S+](https://github.com/borismus/webvr-boilerplate/issues/146#issuecomment-253711181)
- Removed double entries for several iOS settings

[webvr-polyfill]: https://github.com/googlevr/webvr-polyfill
[useragentstring.com]: http://useragentstring.com/
[Device Info App]: https://play.google.com/store/apps/details?id=com.jphilli85.deviceinfo
