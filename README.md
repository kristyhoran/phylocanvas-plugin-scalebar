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
  scalebar: {}
})
```
