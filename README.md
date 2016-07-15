# Phylocanvas Scale-bar Plugin
Visual History for Phylocanvas.

## Usage
```
npm install phylocanvas phylocanvas-plugin-scalebar
```
```javascript
import Phylocanvas from 'phylocanvas';
import scalebarPlugin from 'phylocanvas-plugin-scalebar';

Phylocanvas.plugin(scalebarPlugin);

Phylocanvas.createTree('id', {
  // config defaults
  scalebar: {
    width: 100,
    height: 20,
    fillStyle: 'black',
    strokeStyle: 'black',
    lineWidth: 1,
    font: '16px Sans-serif',
    textBaseline: 'bottom',
    textAlign: 'center',
    digits: 2,
    position: {
      bottom: 10,
      left: 10,
    },
  }
})
```

## Options

A list of available options:
* `width`: The width of the scale-bar in pixels. The default is `100` pixels.
* `height`: The height of the scale-bar in pixels. The default is `20` pixels.
* `lineWidth`: The thickness of scale-bar lines in space units. The default is `1` pixel.
* `strokeStyle`: Specifies the colour or style to use for scale-bar lines. The default is `#000` (black).
* `fillStyle`: Specifies the colour or style to use for scale-bar label. The default is `#000` (black).
* `font`: Specifies the text style used when drawing scale-bar label. The default is `16px Sans-serif`.
* `digits`: The number of digits to appear after the decimal point; this may be a value between 0 and 20, inclusive. The default is `2` digits.
* `position`: Specifies the scale-bar position on the canvas (the default value is `{ bottom: 10, left: 10, }`), it includes two position components (vertical and horizontal):
  * supported vertical position values are `top`, `middle`, or `bottom`',
  * supported horizontal position values are `left`, `centre`, or `right`'.
