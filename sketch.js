const canvasSketch = require("canvas-sketch");
const random = require("canvas-sketch-util/random");
const settings = {
  dimensions: [2048, 2048]
};

const sketch = () => {
  return ({ context, width, height }) => {
    const background = "#90acb2";
    const palette = ["#825333", "#819979", "#32480f", "#142300"];
    const greens = palette.slice(1);
    const browns = ["#7c3f00", "#633200", "#562b00", "#492201", "#3e1c00"];
    const margin = 100;
    context.fillStyle = background;
    context.fillRect(margin, margin, width - margin * 2, height - margin * 2);
    let treeStart = 1850;
    let treeLength = 200;
    console.log("treeLength", treeLength);
    let change = 15;
    console.log(change);
    const draw = (xStart, yStart, length, pitch, branchWidth) => {
      context.lineWidth = branchWidth;
      context.beginPath();
      context.save();
      context.translate(xStart, yStart);
      context.rotate((pitch * Math.PI) / 180);
      context.moveTo(0, 0);
      // context.lineTo(0, -length);
      if (pitch > 0) {
        context.bezierCurveTo(10, -length / 2, 10, -length / 2, 0, -length);
      } else {
        context.bezierCurveTo(-10, -length / 2, -10, -length / 2, 0, -length);
      }
      if (length < 55) {
        context.strokeStyle = random.pick(greens);
      } else {
        context.strokeStyle = palette[0];
      }
      context.stroke();

      if (length < 35) {
        context.beginPath();
        context.arc(0, -length, 35, 0, Math.PI / 2, false);
        context.fillStyle = random.pick(greens);
        context.shadowBlur = 15;
        context.shadowColor = "rgba(0, 0, 0, 0.8)";
        context.fill();
        context.restore();
        return;
      }
      draw(0, -length, length * 0.87, -change, branchWidth * 0.75);
      draw(0, -length, length * 0.87, change, branchWidth * 0.75);
      context.restore();
    };

    draw(width / 2, treeStart, treeLength, 0, 70);
  };
};

canvasSketch(sketch, settings);
