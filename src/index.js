import { Tree } from 'phylocanvas';

const SCALEBAR_WIDTH = 300;
const SCALEBAR_HEIGHT = 20;

function drawScalebar() {
  const width = SCALEBAR_WIDTH / this.zoom;
  const height = SCALEBAR_HEIGHT / this.zoom;
  const centre = (this.canvas.canvas.width / 2 - this.offsetx * 2) / this.zoom;
  const bottom = (this.canvas.canvas.height - this.offsety * 2) / this.zoom;
  const x = centre - width / 2;
  const y = bottom - height * 2;

  this.canvas.font = `${Math.max(height, 1)}px Sans-serif`;
  this.canvas.fillStyle = 'black';
  this.canvas.strokeStyle = 'black';
  this.canvas.textBaseline = 'top';

  this.canvas.beginPath();
  this.canvas.moveTo(x, y + height / 2);
  this.canvas.lineTo(x + width, y + height / 2);
  this.canvas.stroke();
  this.canvas.moveTo(x, y);
  this.canvas.lineTo(x, y + height);
  this.canvas.stroke();
  this.canvas.moveTo(x + width, y);
  this.canvas.lineTo(x + width, y + height);
  this.canvas.stroke();
  this.canvas.closePath();

  const startLabel = '0';
  const endLabel = (SCALEBAR_WIDTH / this.branchScalar / this.zoom).toFixed(6);
  const startLabelSize = this.canvas.measureText(startLabel);
  const endLabelSize = this.canvas.measureText(endLabel);

  this.canvas.fillText(startLabel,
    x - startLabelSize.width / 2, y + height);
  this.canvas.fillText(endLabel,
    x + width - endLabelSize.width / 2, y + height);
}

export default function historyPlugin(decorate) {
  decorate(Tree, 'draw', function (delegate, args) {
    delegate.apply(this, args);
    drawScalebar.apply(this);
  });
}
