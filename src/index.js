import { Tree, utils } from 'phylocanvas';

const { getPixelRatio } = utils.canvas;

const DEFAULTS = {
  width: 200,
  height: 20,
  fillStyle: 'black',
  strokeStyle: 'black',
  lineWidth: 2,
  font: '16px Sans-serif',
  textBaseline: 'top',
  textAlign: 'center',
  digits: 2,
  position: {
    bottom: 0,
    centre: 0,
  },
};

const INVALID_HORIZONTAL_POSITION = 'Invalid horizontal position specified' +
  'Supported values are `left`, `centre`, or `right`';
const INVALID_VERTICAL_POSITION = 'Invalid vertical position specified' +
  'Supported values are `top`, `middle`, or `bottom`';

const LOG10 = Math.log(10);

function drawScalebar() {
  const { scalebar, offsetx, offsety, zoom, branchScalar } = this;
  const { width, height, position } = scalebar;
  const cxt = this.canvas;
  const canvas = cxt.canvas;
  const pixelRatio = getPixelRatio(cxt);

  cxt.save();
  cxt.scale(1 / zoom, 1 / zoom);
  cxt.translate(-offsetx * pixelRatio, -offsety * pixelRatio);

  let x = 0;
  if (typeof position.left !== 'undefined') {
    x = scalebar.lineWidth + position.left;
  } else if (typeof position.centre !== 'undefined') {
    x = (canvas.width / 2) - (width / 2) + position.centre;
  } else if (typeof position.right !== 'undefined') {
    x = canvas.width - width - scalebar.lineWidth - position.right;
  } else {
    this.loadError(INVALID_HORIZONTAL_POSITION);
  }
  let y = 0;
  if (typeof position.top !== 'undefined') {
    y = position.top;
  } else if (typeof position.middle !== 'undefined') {
    y = (canvas.height / 2) - height + position.middle;
  } else if (typeof position.bottom !== 'undefined') {
    y = canvas.height - (height * 2) - position.bottom;
  } else {
    this.loadError(INVALID_VERTICAL_POSITION);
  }
  cxt.clearRect(x, y, width, height * 2);

  cxt.font = scalebar.font;
  cxt.fillStyle = scalebar.fillStyle;
  cxt.strokeStyle = scalebar.strokeStyle;
  cxt.lineWidth = scalebar.lineWidth;
  cxt.textBaseline = scalebar.textBaseline;
  cxt.textAlign = scalebar.textAlign;

  cxt.beginPath();
  cxt.moveTo(x, y + height / 2);
  cxt.lineTo(x + width, y + height / 2);
  cxt.stroke();
  cxt.moveTo(x, y);
  cxt.lineTo(x, y + height);
  cxt.stroke();
  cxt.moveTo(x + width, y);
  cxt.lineTo(x + width, y + height);
  cxt.stroke();
  cxt.closePath();

  const scale = width / branchScalar / zoom;
  const minDigitis = parseInt(Math.abs(Math.log(scale) / LOG10), 10);
  const label = scale.toFixed(minDigitis + scalebar.digits);
  cxt.fillText(label, x + width / 2, y + height);

  cxt.restore();
}

export default function plugin(decorate) {
  decorate(this, 'createTree', (delegate, args) => {
    const tree = delegate(...args);
    const [ , config = {} ] = args;
    tree.scalebar = Object.assign({}, DEFAULTS, config.scalebar || {});
    return tree;
  });
  decorate(Tree, 'draw', function (delegate, args) {
    delegate.apply(this, args);
    drawScalebar.apply(this);
  });
}
